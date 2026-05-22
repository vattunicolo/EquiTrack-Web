-- Horse racing profile fields for Race Entry eligibility matching.
-- Existing identity fields already exist on public.horses:
-- registration_number, date_of_birth, and gender.
-- These nullable fields add racing-specific data without changing old horse records.

alter table public.horses
  add column if not exists country_of_origin text,
  add column if not exists total_earnings numeric,
  add column if not exists last_5_earnings numeric,
  add column if not exists racing_category text,
  add column if not exists trainer_name text,
  add column if not exists owner_name text,
  add column if not exists default_driver text,
  add column if not exists racing_notes text;

comment on column public.horses.country_of_origin is 'Horse country of origin for race condition review.';
comment on column public.horses.total_earnings is 'Total racing earnings used for race eligibility suggestions.';
comment on column public.horses.last_5_earnings is 'Earnings in the last five starts used for race eligibility suggestions.';
comment on column public.horses.racing_category is 'Racing category such as A, B, C, D, E, F, or G.';
comment on column public.horses.trainer_name is 'Default trainer/contact name for race entry planning.';
comment on column public.horses.owner_name is 'Racing owner name when different from stable profile owner.';
comment on column public.horses.default_driver is 'Default driver for race entry plans.';
comment on column public.horses.racing_notes is 'Free-form racing notes for the horse.';
