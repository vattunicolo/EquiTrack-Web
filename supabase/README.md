# EquiTrack-Web Supabase Schema

This folder prepares the future Supabase database for EquiTrack-Web.

The current web app still stores active app data in browser `localStorage`. This schema does not migrate horses, tasks, feed inventory, work logs, or calendar events yet.

## How To Run

1. Open the Supabase project dashboard.
2. Go to **SQL Editor**.
3. Open `supabase/schema.sql` from this repository.
4. Paste the full SQL into the SQL Editor.
5. Review it, then run it once.

Do not run this from the browser app. The browser app must only use the publishable key.

## Tables Created

- `profiles`: user profile metadata linked to `auth.users`.
- `stables`: stable workspaces.
- `stable_members`: user membership for each stable.
- `horses`: Horse Profile PRO fields.
- `tasks`: daily stable tasks.
- `work_logs`: work hour tracking.
- `feed_items`: Feed Inventory PRO 2.0 fields.
- `calendar_events`: Calendar PRO events and race details.

## Row Level Security

Row Level Security is enabled on every table.

The schema includes a helper function:

```sql
public.is_stable_member(stable_id uuid)
```

RLS policies are designed so:

- Users can read and update only their own profile.
- Users can read stables only when they are members.
- Users can manage stable data only when they are members of that stable.
- Stable membership management is intentionally limited for now.

Admin flows can be added later through a trusted server or Supabase Edge Function.

## Security Notes

Never put the Supabase `service_role` key in browser code.

The EquiTrack-Web browser app should only use the Supabase publishable key. The `service_role` key bypasses RLS and must stay only in trusted server-side code, such as Supabase Edge Functions or a private backend.

## Not Migrated Yet

This schema is preparation only.

The app still reads and writes:

- horses
- tasks
- work logs
- feed inventory
- calendar events
- backups

from local browser storage.

## Next Step

The next development step is to connect EquiTrack-Web reads and writes to these Supabase tables while preserving backup/import/export and offering a safe migration path from existing `localStorage` data.
