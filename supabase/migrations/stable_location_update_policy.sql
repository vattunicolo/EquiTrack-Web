-- Allow trusted stable managers to update stable metadata through the normal
-- Supabase client. The EquiTrack-Web UI uses this for stable location edits.
-- Super admins and stable owners are already covered by earlier policies;
-- can_manage_users helpers are included here because they may manage stable setup.

drop policy if exists "stables_update_managed_stable" on public.stables;
create policy "stables_update_managed_stable"
on public.stables for update
to authenticated
using (public.can_manage_stable_users(id))
with check (public.can_manage_stable_users(id));

comment on policy "stables_update_managed_stable" on public.stables is
  'Allows super admins, stable owners, and can_manage_users helpers to update stable metadata such as location.';
