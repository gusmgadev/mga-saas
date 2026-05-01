-- Migration v3: Dynamic roles system
-- Replaces hardcoded role text with roles table and role_id FK

-- 1. Create roles table
create table if not exists public.roles (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  description text,
  is_default  boolean default false,
  created_at  timestamptz default now()
);

-- Only one role can be default
create unique index if not exists roles_is_default_true
  on public.roles (is_default)
  where is_default = true;

-- Seed initial roles
insert into public.roles (name, description, is_default) values
  ('Administrador', 'Acceso total al sistema', false),
  ('Usuario',       'Acceso limitado según permisos', true)
on conflict (name) do nothing;

-- 2. Drop old policies FIRST (they reference the role column)
drop policy if exists "usuario ve su propio perfil" on public.users;
drop policy if exists "admin ve todos" on public.users;
drop policy if exists "admin puede actualizar cualquier user" on public.users;
drop policy if exists "anyone can read permissions" on public.role_permissions;
drop policy if exists "admin can modify permissions" on public.role_permissions;

-- 3. Migrate users.role → users.role_id
alter table public.users add column if not exists role_id bigint;

-- Populate role_id from existing role text
update public.users set role_id = (
  select id from public.roles where name = 'Administrador'
) where users.role = 'administrador';

update public.users set role_id = (
  select id from public.roles where name = 'Usuario'
) where users.role = 'usuario' or users.role is null or users.role = '';

-- Make role_id NOT NULL after migration
alter table public.users alter column role_id set not null;
alter table public.users add constraint users_role_id_fk foreign key (role_id) references public.roles(id);

-- Drop old role column (policies already dropped)
alter table public.users drop column if exists role;

-- 4. Migrate role_permissions.role → role_permissions.role_id
alter table public.role_permissions add column if not exists role_id bigint;

-- Populate role_id from existing role text
update public.role_permissions set role_id = (
  select id from public.roles where name = 'Administrador'
) where role_permissions.role = 'administrador';

update public.role_permissions set role_id = (
  select id from public.roles where name = 'Usuario'
) where role_permissions.role = 'usuario';

-- Make role_id NOT NULL
alter table public.role_permissions alter column role_id set not null;
alter table public.role_permissions add constraint role_permissions_role_id_fk foreign key (role_id) references public.roles(id);

-- Update unique constraint
alter table public.role_permissions drop constraint if exists role_permissions_role_module_key;
alter table public.role_permissions add constraint role_permissions_role_id_module_key unique(role_id, module);

-- Drop old role column (policies already dropped)
alter table public.role_permissions drop column if exists role;

-- 5. Recreate RLS policies for users (using role_id)
create policy "usuario ve su propio perfil"
  on public.users for select
  using (auth.uid() = id);

create policy "admin ve todos"
  on public.users for select
  using (
    exists (
      select 1
      from public.users u
      join public.roles r on r.id = u.role_id
      where u.id = auth.uid() and r.name = 'Administrador'
    )
  );

create policy "admin puede actualizar cualquier user"
  on public.users for update
  using (
    exists (
      select 1
      from public.users u
      join public.roles r on r.id = u.role_id
      where u.id = auth.uid() and r.name = 'Administrador'
    )
  );

-- 6. Recreate RLS policies for role_permissions (using role_id)
create policy "anyone can read permissions"
  on public.role_permissions for select
  using (true);

create policy "admin can modify permissions"
  on public.role_permissions for all
  using (
    exists (
      select 1
      from public.users u
      join public.roles r on r.id = u.role_id
      where u.id = auth.uid() and r.name = 'Administrador'
    )
  );

-- 7. Update trigger for new users (assign default role)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare default_role_id bigint;
begin
  select id into default_role_id from public.roles where is_default = true limit 1;
  insert into public.users (id, email, name, role_id)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    coalesce(default_role_id, (select id from public.roles where name = 'Usuario' limit 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Seed permissions if not already present (using role_id)
insert into public.role_permissions (role_id, module, can_view, can_create, can_edit, can_delete)
select r.id, m.module, true, true, true, true
from public.roles r
cross join (values ('clientes'), ('servicios'), ('cobranzas'), ('admin')) as m(module)
where r.name = 'Administrador'
on conflict (role_id, module) do nothing;

insert into public.role_permissions (role_id, module, can_view, can_create, can_edit, can_delete)
select r.id, m.module, m.can_view, false, false, false
from public.roles r
cross join (values
  ('clientes',  true),
  ('servicios', true),
  ('cobranzas', false),
  ('admin',     false)
) as m(module, can_view)
where r.name = 'Usuario'
on conflict (role_id, module) do nothing;

-- 9. Add RLS policies for roles table
alter table public.roles enable row level security;

create policy "anyone can read roles"
  on public.roles for select
  using (true);

create policy "admin can manage roles"
  on public.roles for all
  using (
    exists (
      select 1
      from public.users u
      join public.roles r on r.id = u.role_id
      where u.id = auth.uid() and r.name = 'Administrador'
    )
  );
