-- EquiTrack-Web racing horse performance history.
-- Adds professional racing summary fields and manually maintained start history.
-- No scraping or external registry connection is used; Super Admin enters/imports this data later.

alter table public.racing_horses
  add column if not exists career_starts integer,
  add column if not exists career_wins integer,
  add column if not exists career_places integer,
  add column if not exists career_show integer,
  add column if not exists career_earnings numeric,
  add column if not exists twelve_month_starts integer,
  add column if not exists twelve_month_wins integer,
  add column if not exists twelve_month_places integer,
  add column if not exists twelve_month_show integer,
  add column if not exists twelve_month_earnings numeric,
  add column if not exists year_starts integer,
  add column if not exists year_wins integer,
  add column if not exists year_places integer,
  add column if not exists year_show integer,
  add column if not exists year_earnings numeric,
  add column if not exists two_month_starts integer,
  add column if not exists two_month_wins integer,
  add column if not exists two_month_places integer,
  add column if not exists two_month_show integer,
  add column if not exists two_month_earnings numeric,
  add column if not exists career_record text,
  add column if not exists twelve_month_record text,
  add column if not exists year_record text,
  add column if not exists short_distance_record text,
  add column if not exists long_distance_record text,
  add column if not exists category_mc text,
  add column if not exists category_ms text,
  add column if not exists potential_mc text,
  add column if not exists potential_ms text,
  add column if not exists reclaim_allowed boolean,
  add column if not exists last_results_update date;

-- Individual starts/results for each central racing horse.
create table if not exists public.racing_horse_starts (
  id uuid primary key default gen_random_uuid(),
  racing_horse_id uuid not null references public.racing_horses(id) on delete cascade,
  race_date date,
  racetrack_code text,
  racetrack_name text,
  race_code text,
  driver_name text,
  placement text,
  kilometer_time text,
  distance integer,
  starters_info text,
  shoeing text,
  net_prize numeric,
  gross_prize numeric,
  race_notes text,
  video_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists racing_horse_starts_horse_id_idx on public.racing_horse_starts(racing_horse_id);
create index if not exists racing_horse_starts_race_date_idx on public.racing_horse_starts(race_date);
create index if not exists racing_horse_starts_racetrack_code_idx on public.racing_horse_starts(racetrack_code);

alter table public.racing_horses enable row level security;
alter table public.racing_horse_starts enable row level security;

-- Central racing data is readable by signed-in users, but only Super Admin can maintain it.
drop policy if exists "Authenticated users can read racing horses" on public.racing_horses;
create policy "Authenticated users can read racing horses"
on public.racing_horses
for select
to authenticated
using (true);

drop policy if exists "Super admin can manage racing horses" on public.racing_horses;
create policy "Super admin can manage racing horses"
on public.racing_horses
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Authenticated users can read racing horse starts" on public.racing_horse_starts;
create policy "Authenticated users can read racing horse starts"
on public.racing_horse_starts
for select
to authenticated
using (true);

drop policy if exists "Super admin can manage racing horse starts" on public.racing_horse_starts;
create policy "Super admin can manage racing horse starts"
on public.racing_horse_starts
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop trigger if exists set_racing_horse_starts_updated_at on public.racing_horse_starts;
create trigger set_racing_horse_starts_updated_at
before update on public.racing_horse_starts
for each row execute function public.set_updated_at();
