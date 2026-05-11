# EquiTrack-Web Supabase Edge Functions

This folder contains trusted server-side functions for EquiTrack-Web.

The browser app must never contain the Supabase `service_role` key. User creation uses Supabase Admin APIs, so it must happen here or in another trusted server environment.

## `create-user`

Path:

```text
supabase/functions/create-user/index.ts
```

Purpose:

- Create Supabase Auth users without public signup.
- Create/update the matching `profiles` row.
- Add the user to a stable through `stable_members`.
- Apply stable role and permission columns.
- Assign `stables.owner_id` when a Super Admin creates a stable owner.

## Deploy

From a machine with the Supabase CLI configured:

```bash
supabase functions deploy create-user
```

Set required secrets in Supabase:

```bash
supabase secrets set SUPABASE_URL="https://your-project.supabase.co"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

`SUPABASE_SERVICE_ROLE_KEY` must be stored only as a Supabase function secret. Do not place it in:

- `script.js`
- `index.html`
- GitHub Pages
- frontend environment variables
- any browser-accessible file

## Caller Authentication

The function requires:

```http
Authorization: Bearer <logged-in-user-access-token>
```

The function verifies the caller with `auth.getUser(token)` and then checks database roles.

## Permission Model

Super Admin:

- `profiles.role = 'super_admin'`
- Can create stable owners and helper users.
- Can create system-level `admin` or `super_admin` accounts when no `stable_id` is supplied.

Stable Owner / permitted manager:

- Must belong to the target stable.
- Must be `stable_members.role = 'owner'` or have `can_manage_users = true`.
- Can create helper users only for their own stable.
- Cannot create `owner`, `admin`, or `super_admin` users.
- Cannot assign users to another stable.

Helper users:

- Are stored as `stable_members.role = 'member'`.
- Feature access is controlled by:
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

## Example Request

```json
{
  "email": "helper@example.com",
  "password": "temporary-secure-password",
  "full_name": "Stable Helper",
  "stable_id": "23639d7c-b423-42b1-8f34-f21f36989bed",
  "stable_role": "member",
  "permissions": {
    "can_view_horses": true,
    "can_view_tasks": true,
    "can_edit_tasks": true,
    "can_view_calendar": true,
    "can_edit_calendar": false,
    "can_view_feed": false,
    "can_edit_feed": false,
    "can_view_work_logs": true,
    "can_edit_work_logs": true,
    "can_manage_users": false
  }
}
```

## CORS

The function allows:

- `https://aequitrack.com`
- `https://www.aequitrack.com`
- local development origins on `localhost` and `127.0.0.1`

## Frontend Status

The current frontend only shows an Admin/User Management placeholder. It does not call this function yet and does not create users from browser code.
