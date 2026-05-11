# EquiTrack-Web Admin Users

This document prepares the admin user management model. It does not move user creation into the browser.

## Roles

EquiTrack uses two role levels plus per-stable feature permissions:

- `profiles.role`: app-level role for a Supabase Auth user.
  - `user`: normal account.
  - `admin`: legacy app administrator.
  - `super_admin`: system owner role. This is the role intended for you.
- `stable_members.role`: role inside one stable.
  - `member`: regular stable user.
  - `owner`: owner/manager of that stable.
- `stable_members.can_*`: feature permissions for limited helper users.

Regular users can access only stables where they have a `stable_members` row. Stable data tables remain scoped by `stable_id` and RLS.

## Make Your Account Super Admin

Run this in the Supabase SQL Editor, replacing the email:

```sql
update public.profiles
set role = 'super_admin'
where email = 'your-email@example.com';
```

If your profile row does not exist yet, create it for the existing Auth user:

```sql
insert into public.profiles (id, email, role)
select id, email, 'super_admin'
from auth.users
where email = 'your-email@example.com'
on conflict (id) do update
set role = excluded.role,
    email = excluded.email;
```

## Make Your Account Stable Owner

For an existing stable and existing Auth user:

```sql
insert into public.stable_members (stable_id, user_id, role)
select
  '23639d7c-b423-42b1-8f34-f21f36989bed'::uuid,
  id,
  'owner'
from auth.users
where email = 'your-email@example.com'
on conflict (stable_id, user_id) do update
set role = excluded.role;
```

You can also set the stable owner field:

```sql
update public.stables
set owner_id = (
  select id from auth.users where email = 'your-email@example.com'
)
where id = '23639d7c-b423-42b1-8f34-f21f36989bed'::uuid;
```

## Future User Creation

Do not create users from frontend JavaScript.

Creating Supabase Auth users requires the Supabase Admin API. That API requires the `service_role` key, and the `service_role` key bypasses Row Level Security. It must never be placed in browser code, static files, GitHub Pages, or any public client bundle.

Future EquiTrack user creation should happen through one of these trusted flows:

- Supabase Edge Function using the service role key as a server-side secret.
- Private backend endpoint controlled by the app owner.
- Manual Supabase dashboard/SQL workflow.

The browser may later call a trusted Edge Function, but the browser must never receive or store the service role key.

## Planned User Management Flow

1. Super Admin creates the stable owner Auth account through a trusted Edge Function or manually in Supabase.
2. Super Admin creates a stable and assigns the owner to that stable.
3. Stable Owner creates limited helper users for their own stable through a trusted Edge Function.
4. Stable Owner chooses helper permissions in `stable_members`.
5. Helper Users can only access the stable features allowed by those permissions.

Stable owners cannot manage other stables. Limited members cannot manage users unless `can_manage_users = true`, and even then Auth user creation still requires the trusted server flow.

## Permission Columns

`supabase/migrations/role_permissions.sql` adds these columns to `stable_members`:

- `can_view_horses`
- `can_edit_horses`
- `can_view_tasks`
- `can_edit_tasks`
- `can_view_calendar`
- `can_edit_calendar`
- `can_view_feed`
- `can_edit_feed`
- `can_view_work_logs`
- `can_edit_work_logs`
- `can_manage_users`

Owners effectively have all permissions for their own stable. Super Admins can manage the whole system.

## Example Permission Setups

Task/calendar-only helper:

```sql
update public.stable_members
set can_view_tasks = true,
    can_edit_tasks = true,
    can_view_calendar = true,
    can_edit_calendar = true,
    can_view_horses = true
where stable_id = 'stable-id-here'
  and user_id = 'helper-user-id-here';
```

Feed manager:

```sql
update public.stable_members
set can_view_feed = true,
    can_edit_feed = true,
    can_view_horses = true
where stable_id = 'stable-id-here'
  and user_id = 'helper-user-id-here';
```

Work-hours user:

```sql
update public.stable_members
set can_view_work_logs = true,
    can_edit_work_logs = true,
    can_view_tasks = true
where stable_id = 'stable-id-here'
  and user_id = 'helper-user-id-here';
```

Read-only viewer:

```sql
update public.stable_members
set can_view_horses = true,
    can_view_tasks = true,
    can_view_calendar = true,
    can_view_feed = true,
    can_view_work_logs = true,
    can_edit_horses = false,
    can_edit_tasks = false,
    can_edit_calendar = false,
    can_edit_feed = false,
    can_edit_work_logs = false,
    can_manage_users = false
where stable_id = 'stable-id-here'
  and user_id = 'helper-user-id-here';
```

## What Users Can Access

Limited members can access:

- Their own profile.
- Stable metadata for stables where they are members.
- Only the feature tables allowed by their `stable_members.can_*` permissions.

Stable owners can:

- Manage all horses, tasks, work logs, feed items, and calendar events in their own stable.
- Read and manage membership rows for their stable.
- Profile metadata for users assigned to their stable, for a future member list.
- Assign helper permissions for their stable.

Super Admins can:

- Profile metadata.
- Stable metadata.
- Stable membership metadata.
- Create stables and assign owners through SQL or future trusted server tools.
- Manage the full system.

Stable owners and limited members cannot access other stables.

## Files

Run `supabase/migrations/admin_user_management.sql` in the Supabase SQL Editor to add the helper functions, role constraints, indexes, and RLS policies.

Then run `supabase/migrations/role_permissions.sql` to add permission columns and permission-aware RLS policies.
