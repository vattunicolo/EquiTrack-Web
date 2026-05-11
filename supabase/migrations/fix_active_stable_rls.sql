-- EquiTrack-Web active stable RLS repair
-- Run this after role_permissions.sql.
--
-- Problem being fixed:
-- After the RBAC/admin migrations, active stable loading can fail if the
-- stable_members/stables/profile policies depend on helpers that query
-- stable_members again. This migration keeps access scoped, but makes the
-- bootstrap reads explicit and uses SECURITY DEFINER helpers to avoid recursive
-- RLS checks while evaluating policies.
--
-- This does not disable RLS and does not grant anonymous/public access.

-- App-level super admin helper. Used by policies and member-management checks.
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'super_admin'
  );
$$;

-- App admin includes legacy admin plus super_admin.
create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'super_admin')
  );
$$;

-- Basic stable membership check. This is intentionally SECURITY DEFINER so a
-- stables policy can test membership without recursively depending on the
-- stable_members select policy.
create or replace function public.is_stable_member(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
  );
$$;

-- Stable owner helper. Owners are represented either by stables.owner_id or a
-- stable_members row with role = owner. Super admins pass this check for all
-- stables.
create or replace function public.is_stable_owner(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_super_admin()
  or exists (
    select 1
    from public.stables s
    where s.id = target_stable_id
      and s.owner_id = auth.uid()
  )
  or exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
      and sm.role = 'owner'
  );
$$;

-- Permission helper for limited members. Owners and super admins have all
-- stable-scoped permissions. Limited helpers only get the checked permissions.
create or replace function public.has_stable_permission(target_stable_id uuid, permission text)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_super_admin()
  or public.is_stable_owner(target_stable_id)
  or exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
      and sm.role in ('member', 'viewer')
      and case permission
        when 'view_horses' then sm.can_view_horses
        when 'edit_horses' then sm.can_edit_horses
        when 'view_tasks' then sm.can_view_tasks
        when 'edit_tasks' then sm.can_edit_tasks
        when 'view_calendar' then sm.can_view_calendar
        when 'edit_calendar' then sm.can_edit_calendar
        when 'view_feed' then sm.can_view_feed
        when 'edit_feed' then sm.can_edit_feed
        when 'view_work_logs' then sm.can_view_work_logs
        when 'edit_work_logs' then sm.can_edit_work_logs
        when 'manage_users' then sm.can_manage_users
        else false
      end
  );
$$;

-- Owner/admin/member-manager check for stable membership management screens.
create or replace function public.can_manage_stable_users(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_super_admin()
  or public.is_stable_owner(target_stable_id)
  or exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
      and sm.can_manage_users = true
  );
$$;

create or replace function public.is_stable_owner_or_admin(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.is_app_admin() or public.is_stable_owner(target_stable_id);
$$;

-- Profile reads:
-- Users can always read their own profile role for app startup. Super admins
-- can read all profiles. Stable owners/managers can read profiles for members
-- of stables they manage.
drop policy if exists "profiles_select_admin_or_owned_stable_member" on public.profiles;
drop policy if exists "profiles_select_rbac_safe" on public.profiles;
create policy "profiles_select_rbac_safe"
on public.profiles for select
to authenticated
using (
  id = auth.uid()
  or public.is_super_admin()
  or exists (
    select 1
    from public.stable_members sm
    where sm.user_id = profiles.id
      and public.can_manage_stable_users(sm.stable_id)
  )
);

-- Stable reads:
-- Authenticated users can read only stables where they are a member. Super
-- admins can read all stable metadata. This is the query EquiTrack-Web uses
-- after reading the current user's stable_members row.
drop policy if exists "stables_select_member" on public.stables;
drop policy if exists "stables_select_super_admin" on public.stables;
drop policy if exists "stables_select_rbac_safe" on public.stables;
create policy "stables_select_rbac_safe"
on public.stables for select
to authenticated
using (
  public.is_super_admin()
  or public.is_stable_member(id)
);

-- Stable membership reads:
-- 1. A user can always read their own stable_members row. This is required for
--    active stable detection immediately after login.
-- 2. Stable owners, super admins, and can_manage_users helpers can read member
--    rows for the stable they manage.
drop policy if exists "stable_members_select_member" on public.stable_members;
drop policy if exists "stable_members_select_owner_or_admin" on public.stable_members;
drop policy if exists "stable_members_select_rbac" on public.stable_members;
drop policy if exists "stable_members_select_self" on public.stable_members;
drop policy if exists "stable_members_select_managed_stable" on public.stable_members;

create policy "stable_members_select_self"
on public.stable_members for select
to authenticated
using (user_id = auth.uid());

create policy "stable_members_select_managed_stable"
on public.stable_members for select
to authenticated
using (public.can_manage_stable_users(stable_id));

-- Keep management writes scoped to the active stable owner/admin/manager model.
drop policy if exists "stable_members_insert_rbac" on public.stable_members;
create policy "stable_members_insert_rbac"
on public.stable_members for insert
to authenticated
with check (public.can_manage_stable_users(stable_id));

drop policy if exists "stable_members_update_rbac" on public.stable_members;
create policy "stable_members_update_rbac"
on public.stable_members for update
to authenticated
using (public.can_manage_stable_users(stable_id))
with check (public.can_manage_stable_users(stable_id));

drop policy if exists "stable_members_delete_rbac" on public.stable_members;
create policy "stable_members_delete_rbac"
on public.stable_members for delete
to authenticated
using (public.can_manage_stable_users(stable_id));

grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.is_app_admin() to authenticated;
grant execute on function public.is_stable_member(uuid) to authenticated;
grant execute on function public.is_stable_owner(uuid) to authenticated;
grant execute on function public.has_stable_permission(uuid, text) to authenticated;
grant execute on function public.can_manage_stable_users(uuid) to authenticated;
grant execute on function public.is_stable_owner_or_admin(uuid) to authenticated;

comment on function public.is_stable_member(uuid) is 'RLS-safe helper for checking whether auth.uid() belongs to a stable without recursive policy lookups.';
comment on policy "stable_members_select_self" on public.stable_members is 'Allows active stable bootstrap by letting users read their own membership row.';
comment on policy "stables_select_rbac_safe" on public.stables is 'Allows users to read only stables they belong to; super admins can read all stable metadata.';
