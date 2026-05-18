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

interface CreateStableRequest {
  stable_name?: string;
  location_city?: string;
  location_country?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  owner_email?: string;
  owner_full_name?: string;
  owner_password?: string;
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

function optionalText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function optionalNumber(value: unknown) {
  if (value === null || value === undefined || value === '') return null;
  const numberValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error('Missing bearer token.');
  return match[1];
}

function serviceConfig() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Function is missing SUPABASE_URL or SERVICE_ROLE_KEY.');
  }
  return { supabaseUrl, serviceRoleKey };
}

function ownerPermissions() {
  return Object.fromEntries(permissionKeys.map((key) => [key, true])) as Record<PermissionKey, boolean>;
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
    // Never expose SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY in browser code.
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const token = getBearerToken(request);
    const { data: callerData, error: callerError } = await adminClient.auth.getUser(token);
    if (callerError || !callerData.user) {
      return jsonResponse(request, 401, { error: 'Authentication required.' });
    }

    const callerId = callerData.user.id;
    const { data: callerProfile, error: profileError } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', callerId)
      .maybeSingle();
    if (profileError) throw profileError;

    if (callerProfile?.role !== 'super_admin') {
      return jsonResponse(request, 403, { error: 'Only a super admin can create stables.' });
    }

    const body = (await request.json()) as CreateStableRequest;
    const stableName = requireText(body.stable_name, 'stable_name');
    const locationCity = optionalText(body.location_city);
    const locationCountry = optionalText(body.location_country);
    const latitude = optionalNumber(body.latitude);
    const longitude = optionalNumber(body.longitude);
    const ownerEmail = optionalText(body.owner_email).toLowerCase();
    const ownerFullName = optionalText(body.owner_full_name);
    const ownerPassword = optionalText(body.owner_password);
    const shouldCreateOwner = Boolean(ownerEmail || ownerFullName || ownerPassword);

    if (shouldCreateOwner && (!ownerEmail || !ownerPassword)) {
      return jsonResponse(request, 400, { error: 'owner_email and owner_password are required when creating an owner account.' });
    }

    let ownerId = '';
    if (shouldCreateOwner) {
      const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
        email: ownerEmail,
        password: ownerPassword,
        email_confirm: true,
        user_metadata: ownerFullName ? { full_name: ownerFullName } : undefined
      });
      if (createError || !authData.user) {
        return jsonResponse(request, 400, { error: createError?.message || 'Could not create owner user.' });
      }
      ownerId = authData.user.id;

      const { error: profileUpsertError } = await adminClient
        .from('profiles')
        .upsert({
          id: ownerId,
          email: ownerEmail,
          full_name: ownerFullName,
          role: 'user'
        }, { onConflict: 'id' });
      if (profileUpsertError) throw profileUpsertError;
    }

    const { data: stable, error: stableError } = await adminClient
      .from('stables')
      .insert({
        name: stableName,
        owner_id: ownerId || null,
        location_city: locationCity || null,
        location_country: locationCountry || null,
        latitude,
        longitude
      })
      .select('id, name, owner_id, location_city, location_country, latitude, longitude')
      .single();
    if (stableError || !stable) {
      throw stableError || new Error('Could not create stable.');
    }

    if (ownerId) {
      const { error: memberError } = await adminClient
        .from('stable_members')
        .upsert({
          stable_id: stable.id,
          user_id: ownerId,
          role: 'owner',
          ...ownerPermissions()
        }, { onConflict: 'stable_id,user_id' });
      if (memberError) throw memberError;
    }

    return jsonResponse(request, 201, {
      ok: true,
      stable_id: stable.id,
      stable_name: stable.name,
      location_city: stable.location_city || null,
      location_country: stable.location_country || null,
      latitude: stable.latitude ?? null,
      longitude: stable.longitude ?? null,
      owner_id: ownerId || null,
      owner_email: ownerId ? ownerEmail : null
    });
  } catch (error) {
    console.error('[create-stable] failed', error);
    return jsonResponse(request, 500, {
      error: error instanceof Error ? error.message : 'Unexpected function error.'
    });
  }
});
