-- Create users table (extends auth.users)
create table if not exists public.users (
  id         uuid references auth.users(id) on delete cascade primary key,
  email      text not null,
  name       text,
  role       text not null default 'usuario',  -- 'administrador' | 'usuario'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

-- Policies for users
create policy "usuario ve su propio perfil"
  on public.users for select
  using (auth.uid() = id);

create policy "admin ve todos"
  on public.users for select
  using (exists (
    select 1 from public.users where id = auth.uid() and role = 'administrador'
  ));

create policy "admin puede actualizar cualquier user"
  on public.users for update
  using (exists (
    select 1 from public.users where id = auth.uid() and role = 'administrador'
  ));

-- Trigger to create user profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    'usuario'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create role_permissions table
create table if not exists public.role_permissions (
  id         bigint generated always as identity primary key,
  role       text not null,
  module     text not null,
  can_view   boolean default false,
  can_create boolean default false,
  can_edit   boolean default false,
  can_delete boolean default false,
  unique(role, module)
);

alter table public.role_permissions enable row level security;

-- Everyone can read permissions (needed for client-side checks)
create policy "anyone can read permissions"
  on public.role_permissions for select
  using (true);

-- Only admins can modify permissions
create policy "admin can modify permissions"
  on public.role_permissions for all
  using (exists (
    select 1 from public.users where id = auth.uid() and role = 'administrador'
  ));

-- Seed permissions
-- Administrator: full access
insert into public.role_permissions (role, module, can_view, can_create, can_edit, can_delete) values
  ('administrador', 'clientes',  true, true, true, true),
  ('administrador', 'servicios', true, true, true, true),
  ('administrador', 'cobranzas', true, true, true, true),
  ('administrador', 'admin',     true, true, true, true)
on conflict (role, module) do nothing;

-- Usuario: limited access
insert into public.role_permissions (role, module, can_view, can_create, can_edit, can_delete) values
  ('usuario', 'clientes',  true,  false, false, false),
  ('usuario', 'servicios', true,  false, false, false),
  ('usuario', 'cobranzas', false, false, false, false),
  ('usuario', 'admin',     false, false, false, false)
on conflict (role, module) do nothing;
