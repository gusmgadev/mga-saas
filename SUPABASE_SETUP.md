# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project" 
3. Set:
   - Database name: `mga-saas`
   - Password: (save this!)
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

## 3. Create Database Tables

Go to SQL Editor in Supabase console and run:

```sql
-- Create tenants table
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  domain VARCHAR,
  logo_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR,
  full_name VARCHAR,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Insert default tenant
INSERT INTO tenants (name, slug, domain)
VALUES ('MGA Informática', 'mga', 'localhost');
```

## 4. Enable Authentication

1. Go to Authentication → Providers
2. Enable "Email" provider (for credentials)
3. Configure email templates if needed

## 5. Test Connection

In your `.env.local`, ensure all Supabase variables are set, then run:
```bash
npm run dev
```

Check browser console for any Supabase connection errors.
