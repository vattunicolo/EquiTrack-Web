-- Race Entry Planner foundation for EquiTrack-Web.
-- Run this in Supabase SQL Editor after the base schema and RBAC migrations.

create table if not exists public.race_entry_opportunities (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  local_id text,
  racetrack_name text not null,
  race_date date not null,
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint race_entry_opportunities_stable_local_id_unique unique (stable_id, local_id)
);

create table if not exists public.race_entry_plans (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  opportunity_id uuid references public.race_entry_opportunities(id) on delete cascade,
  horse_id uuid references public.horses(id) on delete set null,
  local_id text,
  driver text,
  trainer_contact text,
  notes text,
  status text not null default 'draft' check (status in ('draft', 'ready', 'sent')),
  email_subject text,
  email_body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint race_entry_plans_stable_local_id_unique unique (stable_id, local_id)
);

comment on table public.race_entry_opportunities is
  'Monthly race/racetrack opportunities available for horses in one stable.';
comment on table public.race_entry_plans is
  'Planned horse entries for race opportunities. Email drafts are mailto-only in the browser.';
comment on column public.race_entry_opportunities.stable_id is 'Scopes every race opportunity to one stable.';
comment on column public.race_entry_plans.stable_id is 'Scopes every planned entry to one stable.';
comment on column public.race_entry_plans.status is 'Draft, ready, or sent manually. EquiTrack does not send email automatically.';

create index if not exists race_entry_opportunities_stable_id_idx on public.race_entry_opportunities (stable_id);
create index if not exists race_entry_opportunities_race_date_idx on public.race_entry_opportunities (race_date);
create index if not exists race_entry_opportunities_entry_deadline_idx on public.race_entry_opportunities (entry_deadline);
create index if not exists race_entry_plans_stable_id_idx on public.race_entry_plans (stable_id);
create index if not exists race_entry_plans_opportunity_id_idx on public.race_entry_plans (opportunity_id);
create index if not exists race_entry_plans_horse_id_idx on public.race_entry_plans (horse_id);

alter table public.race_entry_opportunities enable row level security;
alter table public.race_entry_plans enable row level security;

-- Reading race entries requires either calendar or horse view access for the stable.
drop policy if exists "Members can read race opportunities" on public.race_entry_opportunities;
create policy "Members can read race opportunities"
on public.race_entry_opportunities
for select
to authenticated
using (
  public.has_stable_permission(stable_id, 'view_calendar')
  or public.has_stable_permission(stable_id, 'view_horses')
);

drop policy if exists "Members can read race plans" on public.race_entry_plans;
create policy "Members can read race plans"
on public.race_entry_plans
for select
to authenticated
using (
  public.has_stable_permission(stable_id, 'view_calendar')
  or public.has_stable_permission(stable_id, 'view_horses')
);

-- Managing race entries requires either calendar or horse edit access.
drop policy if exists "Members can insert race opportunities" on public.race_entry_opportunities;
create policy "Members can insert race opportunities"
on public.race_entry_opportunities
for insert
to authenticated
with check (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
);

drop policy if exists "Members can update race opportunities" on public.race_entry_opportunities;
create policy "Members can update race opportunities"
on public.race_entry_opportunities
for update
to authenticated
using (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
)
with check (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
);

drop policy if exists "Members can delete race opportunities" on public.race_entry_opportunities;
create policy "Members can delete race opportunities"
on public.race_entry_opportunities
for delete
to authenticated
using (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
);

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
  and (horse_id is null or exists (
    select 1 from public.horses h
    where h.id = horse_id
      and h.stable_id = race_entry_plans.stable_id
  ))
);

drop policy if exists "Members can delete race plans" on public.race_entry_plans;
create policy "Members can delete race plans"
on public.race_entry_plans
for delete
to authenticated
using (
  public.has_stable_permission(stable_id, 'edit_calendar')
  or public.has_stable_permission(stable_id, 'edit_horses')
);

drop trigger if exists set_race_entry_opportunities_updated_at on public.race_entry_opportunities;
create trigger set_race_entry_opportunities_updated_at
before update on public.race_entry_opportunities
for each row execute function public.set_updated_at();

drop trigger if exists set_race_entry_plans_updated_at on public.race_entry_plans;
create trigger set_race_entry_plans_updated_at
before update on public.race_entry_plans
for each row execute function public.set_updated_at();
