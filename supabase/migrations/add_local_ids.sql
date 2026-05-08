-- EquiTrack-Web manual local-to-cloud upload support
-- Run this in the Supabase SQL Editor before using duplicate-safe manual upload.
-- local_id stores each browser/localStorage record id so repeated uploads can upsert
-- into the same cloud rows for the active stable instead of creating duplicates.

alter table public.horses add column if not exists local_id text;
alter table public.tasks add column if not exists local_id text;
alter table public.work_logs add column if not exists local_id text;
alter table public.feed_items add column if not exists local_id text;
alter table public.calendar_events add column if not exists local_id text;

create unique index if not exists horses_stable_local_id_uidx
  on public.horses(stable_id, local_id);

create unique index if not exists tasks_stable_local_id_uidx
  on public.tasks(stable_id, local_id);

create unique index if not exists work_logs_stable_local_id_uidx
  on public.work_logs(stable_id, local_id);

create unique index if not exists feed_items_stable_local_id_uidx
  on public.feed_items(stable_id, local_id);

create unique index if not exists calendar_events_stable_local_id_uidx
  on public.calendar_events(stable_id, local_id);
