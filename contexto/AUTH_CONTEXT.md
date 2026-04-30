# AUTH_CONTEXT.md — Sistema de Auth y Perfiles (MGA SaaS)

Adjuntá este archivo al inicio de cualquier chat relacionado con autenticación,
roles o permisos. Le da a la IA todo el contexto del sistema antes de implementar.

---

## Stack

- Next.js (App Router)
- NextAuth.js v5 — CredentialsProvider + JWT
- Supabase — Auth + PostgreSQL + RLS
- proxy.ts (Next.js 16+) — protección de rutas

---

## Roles

| Rol | Valor en DB | Quién lo asigna |
|---|---|---|
| Administrador | `'administrador'` | Manualmente en Supabase, o un Admin promueve a otro |
| Usuario | `'usuario'` | Default al registrarse — todos los nuevos usuarios |

> **Regla clave:** Solo un Administrador puede cambiar el rol de otro usuario.
> Un usuario nunca puede cambiar su propio rol.

---

## Tablas en Supabase

### users
Extiende `auth.users` de Supabase con datos del perfil.

```sql
create table public.users (
  id         uuid references auth.users(id) on delete cascade primary key,
  email      text not null,
  name       text,
  role       text not null default 'usuario',  -- 'administrador' | 'usuario'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

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
```

### role_permissions
Define qué módulos y acciones tiene permitidos cada rol.
Se edita desde el panel de admin — sin tocar código.

```sql
create table public.role_permissions (
  id         bigint generated always as identity primary key,
  role       text not null,
  module     text not null,   -- 'clientes' | 'servicios' | 'cobranzas' | 'admin'
  can_view   boolean default false,
  can_create boolean default false,
  can_edit   boolean default false,
  can_delete boolean default false,
  unique(role, module)
);

-- Administrador: acceso total
insert into public.role_permissions (role, module, can_view, can_create, can_edit, can_delete) values
  ('administrador', 'clientes',  true, true, true, true),
  ('administrador', 'servicios', true, true, true, true),
  ('administrador', 'cobranzas', true, true, true, true),
  ('administrador', 'admin',     true, true, true, true);

-- Usuario: acceso limitado
insert into public.role_permissions (role, module, can_view, can_create, can_edit, can_delete) values
  ('usuario', 'clientes',  true,  false, false, false),
  ('usuario', 'servicios', true,  false, false, false),
  ('usuario', 'cobranzas', false, false, false, false),
  ('usuario', 'admin',     false, false, false, false);
```

---

## Tipos TypeScript (types/auth.ts)

```ts
export type UserRole = 'administrador' | 'usuario'

export type UserProfile = {
  id: string
  email: string
  name: string | null
  role: UserRole
  created_at: string
}

export type RolePermission = {
  role: UserRole
  module: string
  can_view: boolean
  can_create: boolean
  can_edit: boolean
  can_delete: boolean
}

declare module 'next-auth' {
  interface Session {
    user: { id: string; email: string; name: string; role: UserRole }
  }
  interface JWT { role: UserRole }
}
```

---

## Flujo de sesión

```
1. Usuario ingresa email + password en /auth/signin
2. NextAuth valida contra Supabase Auth
3. Si válido → carga perfil desde tabla public.users
4. Guarda { id, email, name, role } en el JWT
5. proxy.ts intercepta cada request y verifica sesión + rol
6. Si ruta requiere admin y el user es usuario → redirige
7. En cada página: usePermissions('modulo') condiciona botones y secciones
```

---

## Rutas protegidas

| Ruta | Requiere |
|---|---|
| `/dashboard/*` | Sesión activa |
| `/dashboard/admin/*` | role === 'administrador' |
| `/api/dashboard/*` | Sesión activa |
| `/auth/signin` | Sin sesión (si hay sesión → redirige al dashboard) |
| `/auth/registro` | Sin sesión (si hay sesión → redirige al dashboard) |

---

## Archivos del sistema

| Archivo | Responsabilidad |
|---|---|
| `types/auth.ts` | Tipos TypeScript centralizados |
| `lib/auth.ts` | Configuración de NextAuth + CredentialsProvider |
| `lib/supabase.ts` | Cliente Supabase (anon key) |
| `services/supabase-admin.ts` | Cliente Supabase (service role) — solo en server |
| `proxy.ts` | Protección de rutas — intercepta cada request |
| `hooks/usePermissions.ts` | Hook cliente para leer permisos del rol |
| `app/auth/signin/page.tsx` | Página de login |
| `app/auth/registro/page.tsx` | Página de registro |
| `app/api/auth/registro/route.ts` | Endpoint de registro |
| `app/api/permissions/route.ts` | Endpoint de consulta de permisos |
| `app/dashboard/admin/usuarios/` | Panel gestión de usuarios (solo admin) |
| `app/api/admin/usuarios/[id]/route.ts` | Endpoint cambio de rol |
| `app/dashboard/admin/permisos/` | Panel gestión de permisos (solo admin) |
| `app/api/admin/permisos/route.ts` | Endpoint GET/PATCH de permisos |

---

## Orden de implementación

Seguir este orden evita errores de dependencias entre archivos.

| # | Tarea | Commit antes? |
|---|---|---|
| 1 | Crear tablas SQL en Supabase | — |
| 2 | Variables de entorno (.env.local + Vercel) | — |
| 3 | types/auth.ts | — |
| 4 | lib/auth.ts (NextAuth config) | — |
| 5 | proxy.ts | ✓ commit limpio |
| 6 | Página de Login | ✓ commit limpio |
| 7 | Página de Registro + endpoint | ✓ commit limpio |
| 8 | Botón de logout en el dashboard | ✓ commit limpio |
| 9 | hook usePermissions + endpoint | ✓ commit limpio |
| 10 | Panel admin/usuarios | ✓ commit limpio |
| 11 | Endpoint cambio de rol | ✓ commit limpio |
| 12 | Panel admin/permisos | ✓ commit limpio |
| 13 | Aplicar usePermissions en todos los módulos | ✓ commit limpio |
| 14 | Probar flujo completo en local | — |
| 15 | Deploy y probar en producción | — |

---

*MGA Informática | 2026 | Auth System Context v1.1*
