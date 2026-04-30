# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Set:
   - Database name: `mga-saas`
   - Password: (save this — needed for CLI migrations)
   - Region: (choose closest to your location)
4. Click "Create new project"

## 2. Get Your Credentials

Once project is created:
1. Go to Settings → API
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`
3. Add to `.env.local`

## 3. Database Structure

### Architecture

```
auth.users  (managed by Supabase Auth)
    │ 1:1
public.profiles     — extra user data (full_name, tenant_id)
    │ N:1
public.tenants      — organizations/clients
public.contacts     — contact form submissions
```

### Tables

**tenants** — Organizations or clients
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK, auto |
| name | VARCHAR | NOT NULL |
| slug | VARCHAR | UNIQUE NOT NULL |
| domain | VARCHAR | nullable |
| logo_url | VARCHAR | nullable |
| created_at | TIMESTAMP | default NOW() |

**profiles** — Extends `auth.users` (do NOT store passwords here)
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK, FK → auth.users.id |
| full_name | VARCHAR | nullable |
| tenant_id | UUID | FK → tenants.id |
| created_at | TIMESTAMP | default NOW() |

**contacts** — Contact form submissions
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK, auto |
| name | VARCHAR | NOT NULL |
| email | VARCHAR | NOT NULL |
| message | TEXT | NOT NULL |
| phone | VARCHAR | nullable |
| tenant_id | UUID | FK → tenants.id |
| created_at | TIMESTAMP | default NOW() |

### Notes
- Passwords are managed exclusively by Supabase Auth (`auth.users`)
- A trigger auto-creates a `profiles` row when a user registers
- Email is read from `auth.users` via `supabase.auth.getUser()`, not stored in `profiles`

## 4. Apply Migrations (CLI)

```bash
# Initialize Supabase locally (only once)
npx supabase init

# Link to your remote project
npx supabase link --project-ref wpbogwonvbcrcpkjxdvb

# Apply migrations
npx supabase db push
```

> Migrations are in `supabase/migrations/`. Each file is versioned and idempotent.

## 5. Enable Authentication

1. Go to Authentication → Providers
2. Enable **Email** provider
3. (Optional) Configure email templates for verification and password reset

## 6. Accessing User Data in Code

```ts
// Auth data (email, id) — from Supabase Auth
const { data: { user } } = await supabase.auth.getUser()

// Extra profile data — from profiles table
const { data: profile } = await supabase
  .from('profiles')
  .select('full_name, tenant_id')
  .eq('id', user.id)
  .single()
```

## 7. Test Connection

Ensure all Supabase variables are set in `.env.local`, then run:
```bash
npm run dev
```

Check the browser console for Supabase connection errors.
