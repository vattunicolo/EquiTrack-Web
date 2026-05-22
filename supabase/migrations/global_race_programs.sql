-- Global race program system for EquiTrack-Web.
-- Run this after the base schema, RBAC migrations, and race_entry_planner.sql.

create table if not exists public.race_programs (
  id uuid primary key default gen_random_uuid(),
  title text,
  racetrack_name text,
  location_city text,
  location_country text,
  program_month text,
  source_file_name text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.race_program_races (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.race_programs(id) on delete cascade,
  race_date date,
  race_number text,
  race_name text,
  race_class text,
  distance text,
  start_method text,
  prize_info text,
  eligibility_notes text,
  entry_deadline date,
  contact_email text,
  notes text,
  imported_local_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint race_program_races_program_import_unique unique (program_id, imported_local_id)
);

alter table public.race_entry_plans
add column if not exists race_program_race_id uuid references public.race_program_races(id) on delete set null;

comment on table public.race_programs is
  'Global race programs created by Super Admin and visible to all authenticated stables when published.';
comment on table public.race_program_races is
  'Races belonging to a global race program. Stable-specific plans reference these rows.';
comment on column public.race_entry_plans.race_program_race_id is
  'Optional reference to a shared/global race. Stable-specific plans remain scoped by stable_id.';

create index if not exists race_programs_status_idx on public.race_programs (status);
create index if not exists race_programs_created_by_idx on public.race_programs (created_by);
create index if not exists race_program_races_program_id_idx on public.race_program_races (program_id);
create index if not exists race_program_races_race_date_idx on public.race_program_races (race_date);
create index if not exists race_program_races_entry_deadline_idx on public.race_program_races (entry_deadline);
create index if not exists race_entry_plans_program_race_idx on public.race_entry_plans (race_program_race_id);

alter table public.race_programs enable row level security;
alter table public.race_program_races enable row level security;

drop policy if exists "Authenticated users can read published race programs" on public.race_programs;
create policy "Authenticated users can read published race programs"
on public.race_programs
for select
to authenticated
using (
  status = 'published'
  or public.is_super_admin()
);

drop policy if exists "Super admin can insert race programs" on public.race_programs;
create policy "Super admin can insert race programs"
on public.race_programs
for insert
to authenticated
with check (public.is_super_admin());

drop policy if exists "Super admin can update race programs" on public.race_programs;
create policy "Super admin can update race programs"
on public.race_programs
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Super admin can delete race programs" on public.race_programs;
create policy "Super admin can delete race programs"
on public.race_programs
for delete
to authenticated
using (public.is_super_admin());

drop policy if exists "Authenticated users can read published program races" on public.race_program_races;
create policy "Authenticated users can read published program races"
on public.race_program_races
for select
to authenticated
using (
  exists (
    select 1
    from public.race_programs rp
    where rp.id = race_program_races.program_id
      and (rp.status = 'published' or public.is_super_admin())
  )
);

drop policy if exists "Super admin can insert program races" on public.race_program_races;
create policy "Super admin can insert program races"
on public.race_program_races
for insert
to authenticated
with check (public.is_super_admin());

drop policy if exists "Super admin can update program races" on public.race_program_races;
create policy "Super admin can update program races"
on public.race_program_races
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Super admin can delete program races" on public.race_program_races;
create policy "Super admin can delete program races"
on public.race_program_races
for delete
to authenticated
using (public.is_super_admin());

-- Refresh race_entry_plans policies so stable plans can point either to an old
-- stable-specific race_entry_opportunity or to a published global race.
drop policy if exists "Members can insert race plans" on public.race_entry_plans;
create policy "Members can insert race plans"
on public.race_entry_plans
for insert
to authenticated
with check (
  (public.has_stable_permission(stable_id, 'edit_calendar') or public.has_stable_permission(stable_id, 'edit_horses'))
  and (opportunity_id is null or exists (
    select 1 from public.race_entry_opportunities reo
    where reo.id = opportunity_id
      and reo.stable_id = race_entry_plans.stable_id
  ))
  and (race_program_race_id is null or exists (
    select 1
    from public.race_program_races rpr
    join public.race_programs rp on rp.id = rpr.program_id
    where rpr.id = race_program_race_id
      and rp.status = 'published'
  ))
  and (horse_id is null or exists (
    select 1 from public.horses h
    where h.id = horse_id
      and h.stable_id = race_entry_plans.stable_id
  ))
);

drop policy if exists "Members can update race plans" on public.race_entry_plans;
create policy "Members can update race plans"
on public.race_entry_plans
for update
to authenticated
using (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
)
with check (
  (public.has_stable_permission(stable_id, 'edit_calendar') or public.has_stable_permission(stable_id, 'edit_horses'))
  and (opportunity_id is null or exists (
    select 1 from public.race_entry_opportunities reo
    where reo.id = opportunity_id
      and reo.stable_id = race_entry_plans.stable_id
  ))
  and (race_program_race_id is null or exists (
    select 1
    from public.race_program_races rpr
    join public.race_programs rp on rp.id = rpr.program_id
    where rpr.id = race_program_race_id
      and rp.status = 'published'
  ))
  and (horse_id is null or exists (
    select 1 from public.horses h
    where h.id = horse_id
      and h.stable_id = race_entry_plans.stable_id
  ))
);

drop trigger if exists set_race_programs_updated_at on public.race_programs;
create trigger set_race_programs_updated_at
before update on public.race_programs
for each row execute function public.set_updated_at();

drop trigger if exists set_race_program_races_updated_at on public.race_program_races;
create trigger set_race_program_races_updated_at
before update on public.race_program_races
for each row execute function public.set_updated_at();
