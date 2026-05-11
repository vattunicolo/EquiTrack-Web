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

## Deploy `create-user`

These steps deploy the function to the Supabase project:

```text
fuojlxcexpnszepgipbv
```

### 1. Install Supabase CLI

Install the Supabase CLI using the official instructions for your operating system:

```text
https://supabase.com/docs/guides/cli
```

On Windows, the easiest options are usually npm or Scoop:

```bash
npm install -g supabase
```

or:

```bash
scoop install supabase
```

Check that it works:

```bash
supabase --version
```

### 2. Log In

```bash
supabase login
```

This opens a browser and connects the CLI to your Supabase account.

### 3. Link This Repository To The Project

From the repository root:

```bash
supabase link --project-ref fuojlxcexpnszepgipbv
```

### 4. Set Function Secrets

The service role key must come from the Supabase dashboard:

```text
Project Settings -> API -> Secret keys -> service_role key
```

Set the required function secrets:

```bash
supabase secrets set SUPABASE_URL="https://fuojlxcexpnszepgipbv.supabase.co"
supabase secrets set SERVICE_ROLE_KEY="PASTE_SERVICE_ROLE_KEY_HERE"
```

The function also accepts the older `SUPABASE_SERVICE_ROLE_KEY` name for compatibility:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="PASTE_SERVICE_ROLE_KEY_HERE"
```

The service role key must be stored only as a Supabase function secret. Do not place it in:

- `script.js`
- `index.html`
- GitHub Pages
- frontend environment variables
- any browser-accessible file

Never commit the service role key to this repository.

### 5. Deploy The Function

```bash
supabase functions deploy create-user
```

After deployment, the function URL is:

```text
https://fuojlxcexpnszepgipbv.functions.supabase.co/create-user
```

### 6. Test With curl

Use a real logged-in user access token as the bearer token. The caller must be allowed by the permission model below.

```bash
curl -X POST "https://fuojlxcexpnszepgipbv.functions.supabase.co/create-user" \
  -H "Authorization: Bearer USER_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "helper@example.com",
    "password": "temporary-secure-password",
    "full_name": "Stable Helper",
    "stable_id": "23639d7c-b423-42b1-8f34-f21f36989bed",
    "stable_role": "member",
    "permissions": {
      "can_view_horses": true,
      "can_edit_horses": false,
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
  }'
```

Expected success shape:

```json
{
  "ok": true,
  "user_id": "new-auth-user-id",
  "email": "helper@example.com",
  "stable_id": "23639d7c-b423-42b1-8f34-f21f36989bed",
  "stable_role": "member",
  "profile_role": "user"
}
```

If you get `401`, the bearer token is missing or invalid. If you get `403`, the logged-in caller does not have permission to create that kind of user.

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
- Can grant stable-scoped helper permissions, including `can_manage_users`.

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
