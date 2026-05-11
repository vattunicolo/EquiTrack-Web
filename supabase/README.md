# EquiTrack-Web Supabase Schema

This folder prepares the future Supabase database for EquiTrack-Web.

The current web app still stores active app data in browser `localStorage`. This schema does not migrate horses, tasks, feed inventory, work logs, or calendar events yet.

## How To Run

1. Open the Supabase project dashboard.
2. Go to **SQL Editor**.
3. Open `supabase/schema.sql` from this repository.
4. Paste the full SQL into the SQL Editor.
5. Review it, then run it once.

For duplicate-safe manual local-to-cloud upload, also run:

```text
supabase/migrations/add_local_ids.sql
```

That migration adds `local_id` columns and unique `(stable_id, local_id)` indexes so repeated manual uploads update the same cloud rows instead of creating duplicates.

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

## Admin User Management

Admin and stable-owner preparation lives in:

- `supabase/migrations/admin_user_management.sql`
- `supabase/migrations/role_permissions.sql`
- `supabase/admin-users.md`

This prepares role checks, stable-scoped permission columns, and safe policies for future admin/member screens. It does not create Auth users from the browser. Future user creation must use a trusted server flow such as a Supabase Edge Function.

## Manual Upload Preparation

The app can prepare and manually upload local browser data to Supabase after login, but it does not enable automatic sync yet.

The browser app still reads and writes active app data from local storage:

- horses
- tasks
- work logs
- feed inventory
- calendar events
- backups

from local browser storage.

Manual upload copies local data to the active stable. It does not delete local data and does not replace browser data with cloud data.

## Next Step

The next development step is to connect EquiTrack-Web reads and writes to these Supabase tables while preserving backup/import/export and keeping cloud sync explicit and safe.
