-- EquiTrack-Web Supabase schema
-- This prepares the database for future synced app data.
-- The current web app still stores active data in localStorage.

create extension if not exists pgcrypto;

-- Profiles mirror Supabase Auth users and store app-level user metadata.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stables are the top-level workspace for horses, tasks, feed, work logs, and events.
create table if not exists public.stables (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stable members connect users to stables. Later, admins can create stables and assign users here.
create table if not exists public.stable_members (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique (stable_id, user_id)
);

-- Horses supports Horse Profile PRO fields.
create table if not exists public.horses (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  name text not null,
  nickname text,
  owner text,
  breed text,
  date_of_birth text,
  gender text,
  color text,
  registration_number text,
  feeding_notes text,
  care_notes text,
  shoeing_notes text,
  vaccination_notes text,
  deworming_notes text,
  vet_notes text,
  general_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tasks stores daily stable work and optional horse assignment.
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  status text not null default 'open',
  horse_id uuid references public.horses(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Work logs store staff work-hour entries and optional horse assignment.
create table if not exists public.work_logs (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  horse_id uuid references public.horses(id) on delete set null,
  description text,
  hours numeric,
  work_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Feed items supports Feed Inventory PRO 2.0 fields.
create table if not exists public.feed_items (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  name text not null,
  category text,
  current_amount numeric not null default 0,
  unit text,
  daily_usage numeric not null default 0,
  low_stock_threshold numeric not null default 0,
  supplier text,
  purchase_date date,
  expiry_date date,
  storage_location text,
  cost numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Calendar events supports Calendar PRO, including race-specific fields.
create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  date date not null,
  time text,
  name text not null,
  event_type text,
  location text,
  horse_ids uuid[] not null default '{}',
  handler text,
  notes text,
  race_number text,
  start_number text,
  driver text,
  placement text,
  race_result text,
  prize text,
  post_race_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Common indexes for membership and stable-scoped data lookups.
create index if not exists stable_members_stable_id_idx on public.stable_members(stable_id);
create index if not exists stable_members_user_id_idx on public.stable_members(user_id);
create index if not exists horses_stable_id_idx on public.horses(stable_id);
create index if not exists tasks_stable_id_idx on public.tasks(stable_id);
create index if not exists work_logs_stable_id_idx on public.work_logs(stable_id);
create index if not exists feed_items_stable_id_idx on public.feed_items(stable_id);
create index if not exists calendar_events_stable_id_idx on public.calendar_events(stable_id);

-- updated_at trigger helper.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_stables_updated_at on public.stables;
create trigger set_stables_updated_at
before update on public.stables
for each row execute function public.set_updated_at();

drop trigger if exists set_horses_updated_at on public.horses;
create trigger set_horses_updated_at
before update on public.horses
for each row execute function public.set_updated_at();

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

drop trigger if exists set_work_logs_updated_at on public.work_logs;
create trigger set_work_logs_updated_at
before update on public.work_logs
for each row execute function public.set_updated_at();

drop trigger if exists set_feed_items_updated_at on public.feed_items;
create trigger set_feed_items_updated_at
before update on public.feed_items
for each row execute function public.set_updated_at();

drop trigger if exists set_calendar_events_updated_at on public.calendar_events;
create trigger set_calendar_events_updated_at
before update on public.calendar_events
for each row execute function public.set_updated_at();

-- RLS helper: true when the current authenticated user belongs to a stable.
create or replace function public.is_stable_member(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.stable_members sm
    where sm.stable_id = target_stable_id
      and sm.user_id = auth.uid()
  );
$$;

-- Enable Row Level Security on all app tables.
alter table public.profiles enable row level security;
alter table public.stables enable row level security;
alter table public.stable_members enable row level security;
alter table public.horses enable row level security;
alter table public.tasks enable row level security;
alter table public.work_logs enable row level security;
alter table public.feed_items enable row level security;
alter table public.calendar_events enable row level security;

-- Profiles: users can read and update only their own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Stables: users can read stables where they are members.
-- Inserts are limited to owner_id = current user for now; later admin/server flows can create stables.
drop policy if exists "stables_select_member" on public.stables;
create policy "stables_select_member"
on public.stables for select
to authenticated
using (public.is_stable_member(id));

drop policy if exists "stables_insert_owner" on public.stables;
create policy "stables_insert_owner"
on public.stables for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "stables_update_member" on public.stables;
create policy "stables_update_member"
on public.stables for update
to authenticated
using (public.is_stable_member(id))
with check (public.is_stable_member(id));

-- Stable members: users can read memberships for stables they belong to.
-- Membership creation/management should later be handled by a trusted admin flow.
drop policy if exists "stable_members_select_member" on public.stable_members;
create policy "stable_members_select_member"
on public.stable_members for select
to authenticated
using (public.is_stable_member(stable_id) or user_id = auth.uid());

-- Horses: stable members can manage horse profiles in their stable.
drop policy if exists "horses_select_member" on public.horses;
create policy "horses_select_member"
on public.horses for select
to authenticated
using (public.is_stable_member(stable_id));

drop policy if exists "horses_insert_member" on public.horses;
create policy "horses_insert_member"
on public.horses for insert
to authenticated
with check (public.is_stable_member(stable_id));

drop policy if exists "horses_update_member" on public.horses;
create policy "horses_update_member"
on public.horses for update
to authenticated
using (public.is_stable_member(stable_id))
with check (public.is_stable_member(stable_id));

drop policy if exists "horses_delete_member" on public.horses;
create policy "horses_delete_member"
on public.horses for delete
to authenticated
using (public.is_stable_member(stable_id));

-- Tasks: stable members can manage tasks in their stable.
drop policy if exists "tasks_select_member" on public.tasks;
create policy "tasks_select_member"
on public.tasks for select
to authenticated
using (public.is_stable_member(stable_id));

drop policy if exists "tasks_insert_member" on public.tasks;
create policy "tasks_insert_member"
on public.tasks for insert
to authenticated
with check (public.is_stable_member(stable_id));

drop policy if exists "tasks_update_member" on public.tasks;
create policy "tasks_update_member"
on public.tasks for update
to authenticated
using (public.is_stable_member(stable_id))
with check (public.is_stable_member(stable_id));

drop policy if exists "tasks_delete_member" on public.tasks;
create policy "tasks_delete_member"
on public.tasks for delete
to authenticated
using (public.is_stable_member(stable_id));

-- Work logs: stable members can manage work logs in their stable.
drop policy if exists "work_logs_select_member" on public.work_logs;
create policy "work_logs_select_member"
on public.work_logs for select
to authenticated
using (public.is_stable_member(stable_id));

drop policy if exists "work_logs_insert_member" on public.work_logs;
create policy "work_logs_insert_member"
on public.work_logs for insert
to authenticated
with check (public.is_stable_member(stable_id));

drop policy if exists "work_logs_update_member" on public.work_logs;
create policy "work_logs_update_member"
on public.work_logs for update
to authenticated
using (public.is_stable_member(stable_id))
with check (public.is_stable_member(stable_id));

drop policy if exists "work_logs_delete_member" on public.work_logs;
create policy "work_logs_delete_member"
on public.work_logs for delete
to authenticated
using (public.is_stable_member(stable_id));

-- Feed items: stable members can manage feed inventory in their stable.
drop policy if exists "feed_items_select_member" on public.feed_items;
create policy "feed_items_select_member"
on public.feed_items for select
to authenticated
using (public.is_stable_member(stable_id));

drop policy if exists "feed_items_insert_member" on public.feed_items;
create policy "feed_items_insert_member"
on public.feed_items for insert
to authenticated
with check (public.is_stable_member(stable_id));

drop policy if exists "feed_items_update_member" on public.feed_items;
create policy "feed_items_update_member"
on public.feed_items for update
to authenticated
using (public.is_stable_member(stable_id))
with check (public.is_stable_member(stable_id));

drop policy if exists "feed_items_delete_member" on public.feed_items;
create policy "feed_items_delete_member"
on public.feed_items for delete
to authenticated
using (public.is_stable_member(stable_id));

-- Calendar events: stable members can manage events in their stable.
drop policy if exists "calendar_events_select_member" on public.calendar_events;
create policy "calendar_events_select_member"
on public.calendar_events for select
to authenticated
using (public.is_stable_member(stable_id));

drop policy if exists "calendar_events_insert_member" on public.calendar_events;
create policy "calendar_events_insert_member"
on public.calendar_events for insert
to authenticated
with check (public.is_stable_member(stable_id));

drop policy if exists "calendar_events_update_member" on public.calendar_events;
create policy "calendar_events_update_member"
on public.calendar_events for update
to authenticated
using (public.is_stable_member(stable_id))
with check (public.is_stable_member(stable_id));

drop policy if exists "calendar_events_delete_member" on public.calendar_events;
create policy "calendar_events_delete_member"
on public.calendar_events for delete
to authenticated
using (public.is_stable_member(stable_id));
