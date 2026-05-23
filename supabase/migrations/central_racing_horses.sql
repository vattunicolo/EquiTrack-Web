-- Central Racing Horse Registry.
-- Super Admin manages shared racing data. Stable horses can link to these
-- records so eligibility suggestions use one maintained source of racing facts.

create table if not exists public.racing_horses (
  id uuid primary key default gen_random_uuid(),
  registration_number text unique,
  horse_name text not null,
  birth_date date,
  birth_year integer,
  gender text,
  country_of_origin text,
  total_earnings numeric default 0,
  last_5_earnings numeric,
  racing_category text,
  trainer_name text,
  owner_name text,
  default_driver text,
  notes text,
  last_results_update date,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.horses
  add column if not exists racing_horse_id uuid references public.racing_horses(id);

create index if not exists racing_horses_name_idx
  on public.racing_horses(horse_name);

create index if not exists horses_racing_horse_id_idx
  on public.horses(racing_horse_id);

alter table public.racing_horses enable row level security;

-- Authenticated stable users can read the shared registry. Public/anonymous
-- users cannot access racing horse records.
drop policy if exists "racing_horses_select_authenticated" on public.racing_horses;
create policy "racing_horses_select_authenticated"
on public.racing_horses for select
to authenticated
using (true);

-- Only Super Admin can maintain official/shared racing data.
drop policy if exists "racing_horses_insert_super_admin" on public.racing_horses;
create policy "racing_horses_insert_super_admin"
on public.racing_horses for insert
to authenticated
with check (public.is_super_admin());

drop policy if exists "racing_horses_update_super_admin" on public.racing_horses;
create policy "racing_horses_update_super_admin"
on public.racing_horses for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "racing_horses_delete_super_admin" on public.racing_horses;
create policy "racing_horses_delete_super_admin"
on public.racing_horses for delete
to authenticated
using (public.is_super_admin());

drop trigger if exists set_racing_horses_updated_at on public.racing_horses;
create trigger set_racing_horses_updated_at
before update on public.racing_horses
for each row execute function public.set_updated_at();

comment on table public.racing_horses is 'Shared racing horse registry maintained by Super Admin.';
comment on column public.horses.racing_horse_id is 'Optional link from a stable horse to the central racing horse registry.';
