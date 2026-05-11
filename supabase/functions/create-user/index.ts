import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type PermissionKey =
  | 'can_view_horses'
  | 'can_edit_horses'
  | 'can_view_tasks'
  | 'can_edit_tasks'
  | 'can_view_calendar'
  | 'can_edit_calendar'
  | 'can_view_feed'
  | 'can_edit_feed'
  | 'can_view_work_logs'
  | 'can_edit_work_logs'
  | 'can_manage_users';

type StableRole = 'owner' | 'member' | 'viewer';
type ProfileRole = 'user' | 'admin' | 'super_admin';

interface CreateUserRequest {
  email?: string;
  password?: string;
  full_name?: string;
  stable_id?: string;
  stable_role?: StableRole;
  profile_role?: ProfileRole;
  permissions?: Partial<Record<PermissionKey, boolean>>;
}

const permissionKeys: PermissionKey[] = [
  'can_view_horses',
  'can_edit_horses',
  'can_view_tasks',
  'can_edit_tasks',
  'can_view_calendar',
  'can_edit_calendar',
  'can_view_feed',
  'can_edit_feed',
  'can_view_work_logs',
  'can_edit_work_logs',
  'can_manage_users'
];

const allowedOrigins = new Set([
  'https://aequitrack.com',
  'https://www.aequitrack.com',
  'http://localhost:4173',
  'http://localhost:5173',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:5173'
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  const allowOrigin = allowedOrigins.has(origin) ? origin : 'https://aequitrack.com';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin'
  };
}

function jsonResponse(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json'
    }
  });
}

function requireText(value: unknown, field: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} is required.`);
  }
  return value.trim();
}

function normalizeStableRole(value: unknown): StableRole {
  if (value === undefined || value === null || value === '') return 'member';
  if (value === 'owner' || value === 'member' || value === 'viewer') return value;
  throw new Error('stable_role must be owner, member, or viewer.');
}

function normalizeProfileRole(value: unknown): ProfileRole {
  if (value === undefined || value === null || value === '') return 'user';
  if (value === 'user' || value === 'admin' || value === 'super_admin') return value;
  throw new Error('profile_role must be user, admin, or super_admin.');
}

function normalizePermissions(role: StableRole, permissions: CreateUserRequest['permissions']) {
  const normalized = Object.fromEntries(permissionKeys.map((key) => [key, false])) as Record<PermissionKey, boolean>;

  if (role === 'owner') {
    permissionKeys.forEach((key) => {
      normalized[key] = true;
    });
    return normalized;
  }

  if (role === 'viewer') {
    normalized.can_view_horses = true;
    normalized.can_view_tasks = true;
    normalized.can_view_calendar = true;
    return normalized;
  }

  if (permissions && typeof permissions === 'object') {
    permissionKeys.forEach((key) => {
      normalized[key] = permissions[key] === true;
    });
  }

  return normalized;
}

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error('Missing bearer token.');
  return match[1];
}

function serviceConfig() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Function is missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  }
  return { supabaseUrl, serviceRoleKey };
}

serve(async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(request) });
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, 405, { error: 'Method not allowed.' });
  }

  try {
    const { supabaseUrl, serviceRoleKey } = serviceConfig();

    // The service role key is used only inside this trusted Edge Function.
    // Never expose SUPABASE_SERVICE_ROLE_KEY in browser code.
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const token = getBearerToken(request);
    const { data: callerData, error: callerError } = await adminClient.auth.getUser(token);
    if (callerError || !callerData.user) {
      return jsonResponse(request, 401, { error: 'Authentication required.' });
    }

    const callerId = callerData.user.id;
    const body = (await request.json()) as CreateUserRequest;
    const email = requireText(body.email, 'email').toLowerCase();
    const password = requireText(body.password, 'password');
    const fullName = typeof body.full_name === 'string' ? body.full_name.trim() : '';
    const stableRole = normalizeStableRole(body.stable_role);
    const profileRole = normalizeProfileRole(body.profile_role);
    const stableId = typeof body.stable_id === 'string' && body.stable_id.trim() ? body.stable_id.trim() : '';
    const permissions = normalizePermissions(stableRole, body.permissions);
    const systemLevelAdmin = !stableId && (profileRole === 'admin' || profileRole === 'super_admin');

    if (!stableId && !systemLevelAdmin) {
      return jsonResponse(request, 400, { error: 'stable_id is required unless a super admin is creating a system-level admin.' });
    }

    const { data: callerProfile, error: profileError } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', callerId)
      .maybeSingle();
    if (profileError) throw profileError;

    const callerIsSuperAdmin = callerProfile?.role === 'super_admin';

    if ((profileRole === 'admin' || profileRole === 'super_admin' || stableRole === 'owner') && !callerIsSuperAdmin) {
      return jsonResponse(request, 403, { error: 'Only a super admin can create admins or stable owners.' });
    }

    if (!callerIsSuperAdmin) {
      if (!stableId) {
        return jsonResponse(request, 403, { error: 'Stable owners can create helper users only for their own stable.' });
      }

      const { data: callerMembership, error: membershipError } = await adminClient
        .from('stable_members')
        .select('role, can_manage_users')
        .eq('stable_id', stableId)
        .eq('user_id', callerId)
        .maybeSingle();
      if (membershipError) throw membershipError;

      const callerCanManageStable = callerMembership?.role === 'owner' || callerMembership?.can_manage_users === true;
      if (!callerCanManageStable) {
        return jsonResponse(request, 403, { error: 'You do not have permission to create users for this stable.' });
      }
      if (stableRole === 'owner' || profileRole !== 'user' || permissions.can_manage_users) {
        return jsonResponse(request, 403, { error: 'Stable owners can create helper users only.' });
      }
    }

    const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: fullName ? { full_name: fullName } : undefined
    });

    if (createError || !authData.user) {
      return jsonResponse(request, 400, { error: createError?.message || 'Could not create user.' });
    }

    const newUserId = authData.user.id;
    const { error: profileUpsertError } = await adminClient
      .from('profiles')
      .upsert({
        id: newUserId,
        email,
        full_name: fullName,
        role: profileRole
      }, { onConflict: 'id' });
    if (profileUpsertError) throw profileUpsertError;

    if (stableId) {
      const storedStableRole = stableRole === 'owner' ? 'owner' : 'member';
      const { error: memberUpsertError } = await adminClient
        .from('stable_members')
        .upsert({
          stable_id: stableId,
          user_id: newUserId,
          role: storedStableRole,
          ...permissions
        }, { onConflict: 'stable_id,user_id' });
      if (memberUpsertError) throw memberUpsertError;

      if (callerIsSuperAdmin && stableRole === 'owner') {
        const { error: stableOwnerError } = await adminClient
          .from('stables')
          .update({ owner_id: newUserId })
          .eq('id', stableId);
        if (stableOwnerError) throw stableOwnerError;
      }
    }

    return jsonResponse(request, 201, {
      ok: true,
      user_id: newUserId,
      email,
      stable_id: stableId || null,
      stable_role: stableId ? stableRole : null,
      profile_role: profileRole
    });
  } catch (error) {
    console.error('[create-user] failed', error);
    return jsonResponse(request, 500, {
      error: error instanceof Error ? error.message : 'Unexpected function error.'
    });
  }
});
