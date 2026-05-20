-- Horse Health & Care History for EquiTrack-Web.
-- Run this in the Supabase SQL Editor after the base EquiTrack schema and RBAC migrations.

create table if not exists public.horse_care_history (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  local_id text,
  care_date date not null,
  care_type text not null,
  title text,
  notes text,
  next_due_date date,
  cost numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint horse_care_history_stable_local_id_unique unique (stable_id, local_id)
);

comment on table public.horse_care_history is
  'Health and care records for each horse, including shoeing, vaccinations, vet visits, medication, injuries, dental care and other notes.';
comment on column public.horse_care_history.stable_id is 'Scopes every care record to one stable.';
comment on column public.horse_care_history.horse_id is 'The horse this care record belongs to.';
comment on column public.horse_care_history.local_id is 'Local browser id used for duplicate-safe local-to-cloud migration/upserts.';
comment on column public.horse_care_history.next_due_date is 'Optional next due date used for in-app care alerts.';

create index if not exists horse_care_history_stable_id_idx on public.horse_care_history (stable_id);
create index if not exists horse_care_history_horse_id_idx on public.horse_care_history (horse_id);
create index if not exists horse_care_history_care_date_idx on public.horse_care_history (care_date);
create index if not exists horse_care_history_next_due_date_idx on public.horse_care_history (next_due_date);

alter table public.horse_care_history enable row level security;

drop policy if exists "Members can read horse care history" on public.horse_care_history;
create policy "Members can read horse care history"
on public.horse_care_history
for select
to authenticated
using (public.has_stable_permission(stable_id, 'view_horses'));

drop policy if exists "Members can insert horse care history" on public.horse_care_history;
create policy "Members can insert horse care history"
on public.horse_care_history
for insert
to authenticated
with check (
  public.has_stable_permission(stable_id, 'edit_horses')
  and exists (
    select 1 from public.horses h
    where h.id = horse_id
      and h.stable_id = horse_care_history.stable_id
  )
);

drop policy if exists "Members can update horse care history" on public.horse_care_history;
create policy "Members can update horse care history"
on public.horse_care_history
for update
to authenticated
using (public.has_stable_permission(stable_id, 'edit_horses'))
with check (
  public.has_stable_permission(stable_id, 'edit_horses')
  and exists (
    select 1 from public.horses h
    where h.id = horse_id
      and h.stable_id = horse_care_history.stable_id
  )
);

drop policy if exists "Members can delete horse care history" on public.horse_care_history;
create policy "Members can delete horse care history"
on public.horse_care_history
for delete
to authenticated
using (public.has_stable_permission(stable_id, 'edit_horses'));

-- Reuse the shared updated_at trigger helper from the base schema.
drop trigger if exists set_horse_care_history_updated_at on public.horse_care_history;
create trigger set_horse_care_history_updated_at
before update on public.horse_care_history
for each row execute function public.set_updated_at();
