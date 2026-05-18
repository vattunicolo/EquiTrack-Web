-- Add optional location fields for stables.
-- Existing stables continue to work because all fields are nullable.
-- EquiTrack-Web can use these fields for weather-based turnout suggestions.

alter table public.stables
  add column if not exists location_city text,
  add column if not exists location_country text,
  add column if not exists latitude numeric,
  add column if not exists longitude numeric;

comment on column public.stables.location_city is 'Optional stable city used for display and weather lookup.';
comment on column public.stables.location_country is 'Optional stable country used for display and weather lookup.';
comment on column public.stables.latitude is 'Optional stable latitude for weather lookup.';
comment on column public.stables.longitude is 'Optional stable longitude for weather lookup.';
