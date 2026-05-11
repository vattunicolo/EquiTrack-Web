-- EquiTrack-Web admin user management foundation
-- Run this in the Supabase SQL Editor after the base schema.
--
-- Security model:
-- - Browser code must only use the Supabase publishable key.
-- - Never put the service_role key in browser code. The service_role key bypasses RLS.
-- - Creating Supabase Auth users requires Supabase Admin APIs, which require service_role.
-- - Future user creation must happen in a trusted environment, such as a Supabase
--   Edge Function or private backend, not directly from frontend JavaScript.

-- profiles.role identifies app-level admins.
-- Current supported roles:
-- - user: normal account
-- - admin: app administrator, allowed to inspect membership metadata through RLS
alter table public.profiles
  alter column role set default 'user';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('user', 'admin'))
      not valid;
  end if;
end $$;

-- stable_members.role identifies the user's role inside one stable.
-- Current supported roles:
-- - member: regular stable user
-- - owner: stable owner, allowed to inspect members for their stable
alter table public.stable_members
  alter column role set default 'member';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'stable_members_role_check'
      and conrelid = 'public.stable_members'::regclass
  ) then
    alter table public.stable_members
      add constraint stable_members_role_check
      check (role in ('member', 'owner'))
      not valid;
  end if;
end $$;

-- True when the current authenticated user has profiles.role = admin.
-- SECURITY DEFINER is used so RLS on profiles does not prevent this boolean check.
create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

-- True when the current authenticated user owns the target stable.
-- Stable ownership can be represented either by stables.owner_id or by
-- stable_members.role = owner for that stable.
create or replace function public.is_stable_owner(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
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

-- True when the current authenticated user can manage membership metadata
-- for a stable. App admins and stable owners pass this check.
create or replace function public.is_stable_owner_or_admin(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_app_admin() or public.is_stable_owner(target_stable_id);
$$;

-- Helpful indexes for future admin/member screens.
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists stable_members_stable_role_idx on public.stable_members(stable_id, role);

-- Profiles:
-- App admins can read profile metadata. Stable owners can read profiles for
-- users who are members of stables they own. This supports a future member list
-- without exposing profile data to unrelated users.
drop policy if exists "profiles_select_admin_or_owned_stable_member" on public.profiles;
create policy "profiles_select_admin_or_owned_stable_member"
on public.profiles for select
to authenticated
using (
  public.is_app_admin()
  or exists (
    select 1
    from public.stable_members sm
    where sm.user_id = profiles.id
      and public.is_stable_owner(sm.stable_id)
  )
);

-- Stable members:
-- The base schema already allows users to read their own membership and members
-- of stables they belong to. This explicit owner/admin policy prepares the
-- future admin UI and keeps reads scoped by stable_id.
drop policy if exists "stable_members_select_owner_or_admin" on public.stable_members;
create policy "stable_members_select_owner_or_admin"
on public.stable_members for select
to authenticated
using (public.is_stable_owner_or_admin(stable_id));

-- Stables:
-- App admins can read stable metadata. Stable data tables remain protected by
-- stable membership policies; this does not grant access to horse/task/feed data.
drop policy if exists "stables_select_admin" on public.stables;
create policy "stables_select_admin"
on public.stables for select
to authenticated
using (public.is_app_admin());

comment on column public.profiles.role is 'App-level role. Use admin for trusted administrators; regular browser users remain user.';
comment on column public.stable_members.role is 'Stable-level role. Use owner for stable owners and member for regular users.';
comment on function public.is_app_admin() is 'Returns true when auth.uid() has profiles.role = admin.';
comment on function public.is_stable_owner(uuid) is 'Returns true when auth.uid() owns the target stable by stables.owner_id or stable_members.role = owner.';
comment on function public.is_stable_owner_or_admin(uuid) is 'Returns true for app admins or owners of the target stable.';
