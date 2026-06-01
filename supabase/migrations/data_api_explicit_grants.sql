-- Future-proof Supabase Data API access for browser clients.
--
-- Supabase projects created after the Data API default-grant change need
-- explicit database grants in addition to RLS policies. These grants only make
-- the tables reachable through PostgREST/supabase-js for authenticated users;
-- row-level security remains the access-control layer for stable scoping,
-- owner/admin permissions, and super_admin-only management.
--
-- Anonymous users only receive schema usage so public app pages can still load
-- without table access. No table write access is granted to anon.

grant usage on schema public to anon, authenticated;

do $$
declare
  app_table text;
  authenticated_rw_tables text[] := array[
    'profiles',
    'stables',
    'stable_members',
    'horses',
    'tasks',
    'work_logs',
    'feed_items',
    'calendar_events',
    'horse_care_history',
    'race_entry_opportunities',
    'race_entry_plans',
    'race_programs',
    'race_program_races',
    'racing_horses',
    'racing_horse_starts'
  ];
begin
  foreach app_table in array authenticated_rw_tables loop
    if to_regclass('public.' || quote_ident(app_table)) is not null then
      execute format(
        'grant select, insert, update, delete on table public.%I to authenticated',
        app_table
      );
    end if;
  end loop;
end
$$;

-- EquiTrack currently uses UUID primary keys, but this keeps any present or
-- future sequence-backed columns reachable to authenticated browser clients.
grant usage, select on all sequences in schema public to authenticated;
