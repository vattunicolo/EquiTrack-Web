-- EquiTrack-Web role-based access control foundation
-- Run this in the Supabase SQL Editor after:
-- 1. supabase/schema.sql
-- 2. supabase/migrations/admin_user_management.sql
--
-- Security model:
-- - Browser code must only use the Supabase publishable key.
-- - Never put the service_role key in browser code. The service_role key bypasses RLS.
-- - Creating Supabase Auth users requires the Supabase Admin API and therefore
--   must happen later through a Supabase Edge Function or trusted server.
-- - No public signup is required or enabled by this migration.

-- User model:
-- - Super Admin: app-level role in profiles.role = 'super_admin'. Can manage
--   the whole system, create stables, assign owners, and inspect data.
-- - Stable Owner: stable_members.role = 'owner' or stables.owner_id = auth.uid().
--   Can manage their own stable and future helper users for that stable.
-- - Limited Member / Helper User: stable_members.role = 'member'. Access is
--   controlled by the boolean permission columns below.

-- Expand app-level roles. The previous admin foundation used 'admin'; this
-- migration keeps it as a legacy trusted admin role while adding 'super_admin'.
alter table public.profiles
  alter column role set default 'user';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin', 'super_admin'));

-- Per-stable helper permissions. Owners effectively have all permissions through
-- helper functions below, even if these columns are false on their membership row.
alter table public.stable_members add column if not exists can_view_horses boolean not null default true;
alter table public.stable_members add column if not exists can_edit_horses boolean not null default false;
alter table public.stable_members add column if not exists can_view_tasks boolean not null default true;
alter table public.stable_members add column if not exists can_edit_tasks boolean not null default false;
alter table public.stable_members add column if not exists can_view_calendar boolean not null default true;
alter table public.stable_members add column if not exists can_edit_calendar boolean not null default false;
alter table public.stable_members add column if not exists can_view_feed boolean not null default false;
alter table public.stable_members add column if not exists can_edit_feed boolean not null default false;
alter table public.stable_members add column if not exists can_view_work_logs boolean not null default false;
alter table public.stable_members add column if not exists can_edit_work_logs boolean not null default false;
alter table public.stable_members add column if not exists can_manage_users boolean not null default false;

create index if not exists stable_members_user_stable_idx
  on public.stable_members(user_id, stable_id);

-- Super Admin helper. This is the future "only I manage the whole system" role.
create or replace function public.is_super_admin()
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
      and p.role = 'super_admin'
  );
$$;

-- Keep the previous helper name, but make it include the new super_admin role.
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
      and p.role in ('admin', 'super_admin')
  );
$$;

-- Stable owners have all permissions for their own stable. Ownership can be
-- represented by stables.owner_id or stable_members.role = 'owner'.
create or replace function public.is_stable_owner(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
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

-- Permission helper for limited members. Supported permission names:
-- view_horses, edit_horses, view_tasks, edit_tasks, view_calendar, edit_calendar,
-- view_feed, edit_feed, view_work_logs, edit_work_logs, manage_users.
create or replace function public.has_stable_permission(target_stable_id uuid, permission text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_super_admin()
  or public.is_stable_owner(target_stable_id)
  or exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
      and sm.role = 'member'
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

-- Future user-management screens should use this check before showing member
-- controls. Creating Auth users still requires a trusted Edge Function/server.
create or replace function public.can_manage_stable_users(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_super_admin()
  or public.is_stable_owner(target_stable_id)
  or public.has_stable_permission(target_stable_id, 'manage_users');
$$;

create or replace function public.is_stable_owner_or_admin(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_app_admin() or public.is_stable_owner(target_stable_id);
$$;

-- Stables: members can read their assigned stable; super admins can read and
-- manage all stable metadata. Stable owners can update their own stable.
drop policy if exists "stables_update_member" on public.stables;
drop policy if exists "stables_insert_owner" on public.stables;
drop policy if exists "stables_select_admin" on public.stables;

drop policy if exists "stables_select_super_admin" on public.stables;
create policy "stables_select_super_admin"
on public.stables for select
to authenticated
using (public.is_super_admin());

drop policy if exists "stables_insert_super_admin" on public.stables;
create policy "stables_insert_super_admin"
on public.stables for insert
to authenticated
with check (public.is_super_admin());

drop policy if exists "stables_update_owner_or_super_admin" on public.stables;
create policy "stables_update_owner_or_super_admin"
on public.stables for update
to authenticated
using (public.is_super_admin() or public.is_stable_owner(id))
with check (public.is_super_admin() or public.is_stable_owner(id));

drop policy if exists "stables_delete_super_admin" on public.stables;
create policy "stables_delete_super_admin"
on public.stables for delete
to authenticated
using (public.is_super_admin());

-- Stable members: owners/admins can inspect and manage members for their stable.
-- Super admins can manage all memberships. A limited member can only read their
-- own membership unless they have can_manage_users.
drop policy if exists "stable_members_select_member" on public.stable_members;
drop policy if exists "stable_members_select_owner_or_admin" on public.stable_members;

drop policy if exists "stable_members_select_rbac" on public.stable_members;
create policy "stable_members_select_rbac"
on public.stable_members for select
to authenticated
using (
  user_id = auth.uid()
  or public.can_manage_stable_users(stable_id)
);

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

-- Replace broad "any member can manage everything" policies with
-- permission-aware policies. Existing policy names are dropped if present.
drop policy if exists "horses_select_member" on public.horses;
drop policy if exists "horses_insert_member" on public.horses;
drop policy if exists "horses_update_member" on public.horses;
drop policy if exists "horses_delete_member" on public.horses;
drop policy if exists "horses_select_permission" on public.horses;
drop policy if exists "horses_insert_permission" on public.horses;
drop policy if exists "horses_update_permission" on public.horses;
drop policy if exists "horses_delete_permission" on public.horses;

create policy "horses_select_permission"
on public.horses for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_horses'));

create policy "horses_insert_permission"
on public.horses for insert
to authenticated
with check (public.has_stable_permission(stable_id, 'edit_horses'));

create policy "horses_update_permission"
on public.horses for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_horses'))
with check (public.has_stable_permission(stable_id, 'edit_horses'));

create policy "horses_delete_permission"
on public.horses for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_horses'));

drop policy if exists "tasks_select_member" on public.tasks;
drop policy if exists "tasks_insert_member" on public.tasks;
drop policy if exists "tasks_update_member" on public.tasks;
drop policy if exists "tasks_delete_member" on public.tasks;
drop policy if exists "tasks_select_permission" on public.tasks;
drop policy if exists "tasks_insert_permission" on public.tasks;
drop policy if exists "tasks_update_permission" on public.tasks;
drop policy if exists "tasks_delete_permission" on public.tasks;

create policy "tasks_select_permission"
on public.tasks for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_tasks'));

create policy "tasks_insert_permission"
on public.tasks for insert
to authenticated
with check (public.has_stable_permission(stable_id, 'edit_tasks'));

create policy "tasks_update_permission"
on public.tasks for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_tasks'))
with check (public.has_stable_permission(stable_id, 'edit_tasks'));

create policy "tasks_delete_permission"
on public.tasks for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_tasks'));

drop policy if exists "calendar_events_select_member" on public.calendar_events;
drop policy if exists "calendar_events_insert_member" on public.calendar_events;
drop policy if exists "calendar_events_update_member" on public.calendar_events;
drop policy if exists "calendar_events_delete_member" on public.calendar_events;
drop policy if exists "calendar_events_select_permission" on public.calendar_events;
drop policy if exists "calendar_events_insert_permission" on public.calendar_events;
drop policy if exists "calendar_events_update_permission" on public.calendar_events;
drop policy if exists "calendar_events_delete_permission" on public.calendar_events;

create policy "calendar_events_select_permission"
on public.calendar_events for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_calendar'));

create policy "calendar_events_insert_permission"
on public.calendar_events for insert
to authenticated
with check (public.has_stable_permission(stable_id, 'edit_calendar'));

create policy "calendar_events_update_permission"
on public.calendar_events for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_calendar'))
with check (public.has_stable_permission(stable_id, 'edit_calendar'));

create policy "calendar_events_delete_permission"
on public.calendar_events for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_calendar'));

drop policy if exists "feed_items_select_member" on public.feed_items;
drop policy if exists "feed_items_insert_member" on public.feed_items;
drop policy if exists "feed_items_update_member" on public.feed_items;
drop policy if exists "feed_items_delete_member" on public.feed_items;
drop policy if exists "feed_items_select_permission" on public.feed_items;
drop policy if exists "feed_items_insert_permission" on public.feed_items;
drop policy if exists "feed_items_update_permission" on public.feed_items;
drop policy if exists "feed_items_delete_permission" on public.feed_items;

create policy "feed_items_select_permission"
on public.feed_items for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_feed'));

create policy "feed_items_insert_permission"
on public.feed_items for insert
to authenticated
with check (public.has_stable_permission(stable_id, 'edit_feed'));

create policy "feed_items_update_permission"
on public.feed_items for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_feed'))
with check (public.has_stable_permission(stable_id, 'edit_feed'));

create policy "feed_items_delete_permission"
on public.feed_items for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_feed'));

drop policy if exists "work_logs_select_member" on public.work_logs;
drop policy if exists "work_logs_insert_member" on public.work_logs;
drop policy if exists "work_logs_update_member" on public.work_logs;
drop policy if exists "work_logs_delete_member" on public.work_logs;
drop policy if exists "work_logs_select_permission" on public.work_logs;
drop policy if exists "work_logs_insert_permission" on public.work_logs;
drop policy if exists "work_logs_update_permission" on public.work_logs;
drop policy if exists "work_logs_delete_permission" on public.work_logs;

create policy "work_logs_select_permission"
on public.work_logs for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_work_logs'));

create policy "work_logs_insert_permission"
on public.work_logs for insert
to authenticated
with check (public.has_stable_permission(stable_id, 'edit_work_logs'));

create policy "work_logs_update_permission"
on public.work_logs for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_work_logs'))
with check (public.has_stable_permission(stable_id, 'edit_work_logs'));

create policy "work_logs_delete_permission"
on public.work_logs for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_work_logs'));

comment on column public.stable_members.can_view_horses is 'Limited member can view horse profiles in this stable.';
comment on column public.stable_members.can_edit_horses is 'Limited member can add, edit, and delete horse profiles in this stable.';
comment on column public.stable_members.can_view_tasks is 'Limited member can view tasks in this stable.';
comment on column public.stable_members.can_edit_tasks is 'Limited member can add, edit, delete, and complete tasks in this stable.';
comment on column public.stable_members.can_view_calendar is 'Limited member can view calendar events in this stable.';
comment on column public.stable_members.can_edit_calendar is 'Limited member can add, edit, and delete calendar events in this stable.';
comment on column public.stable_members.can_view_feed is 'Limited member can view feed inventory in this stable.';
comment on column public.stable_members.can_edit_feed is 'Limited member can add, edit, and delete feed inventory in this stable.';
comment on column public.stable_members.can_view_work_logs is 'Limited member can view work logs in this stable.';
comment on column public.stable_members.can_edit_work_logs is 'Limited member can add, edit, and delete work logs in this stable.';
comment on column public.stable_members.can_manage_users is 'Limited member can manage stable membership metadata, but Auth user creation still requires a trusted server.';
comment on function public.is_super_admin() is 'Returns true for profiles.role = super_admin.';
comment on function public.has_stable_permission(uuid, text) is 'Checks stable-scoped RBAC permissions for the current user.';
comment on function public.can_manage_stable_users(uuid) is 'Returns true for super admins, stable owners, or members with can_manage_users.';
