# EquiTrack-Web Admin Users

This document prepares the admin user management model. It does not move user creation into the browser.

## Roles

EquiTrack uses two role levels:

- `profiles.role`: app-level role for a Supabase Auth user.
  - `user`: normal account.
  - `admin`: app administrator.
- `stable_members.role`: role inside one stable.
  - `member`: regular stable user.
  - `owner`: owner/manager of that stable.

Regular users can access only stables where they have a `stable_members` row. Stable data tables remain scoped by `stable_id` and RLS.

## Make Your Account Admin

Run this in the Supabase SQL Editor, replacing the email:

```sql
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

If your profile row does not exist yet, create it for the existing Auth user:

```sql
insert into public.profiles (id, email, role)
select id, email, 'admin'
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

## What Users Can Access

Regular stable members can access:

- Their own profile.
- Stable metadata for stables where they are members.
- Horses, tasks, work logs, feed items, and calendar events for their assigned stable.

Stable owners can additionally read:

- Membership rows for their stable.
- Profile metadata for users assigned to their stable, for a future member list.

App admins can additionally read:

- Profile metadata.
- Stable metadata.
- Stable membership metadata.

The migration does not grant app admins automatic access to every stable's horse/task/feed/calendar data. Those tables still depend on stable membership policies.

## Files

Run `supabase/migrations/admin_user_management.sql` in the Supabase SQL Editor to add the helper functions, role constraints, indexes, and RLS policies.
