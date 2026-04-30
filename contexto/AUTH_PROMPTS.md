# AUTH_PROMPTS.md — Prompts de Auth y Perfiles (MGA SaaS)

Usá este archivo junto a AUTH_CONTEXT.md.
Adjuntalos los dos al inicio de cada chat de auth.
Seguí el orden del checklist en AUTH_CONTEXT.md.

---

## Cómo usar estos prompts

1. Abrís un **chat nuevo** por cada sección
2. Adjuntás `AUTH_CONTEXT.md` + el archivo específico indicado en `[Adjuntar: X]`
3. Copiás el prompt completo y lo pegás
4. Revisás el código antes de aplicarlo
5. Hacés commit antes de pasar al siguiente

---

## 1 — Tipos TypeScript

```
[Adjuntar: AUTH_CONTEXT.md]

Creá el archivo types/auth.ts con todos los tipos del sistema de auth
tal como están definidos en el contexto adjunto.

Incluir:
- UserRole
- UserProfile
- RolePermission
- Extensión del módulo 'next-auth' para Session y JWT
```

---

## 2 — Configurar NextAuth

```
[Adjuntar: AUTH_CONTEXT.md + lib/auth.ts + lib/supabase.ts]

Configurá NextAuth con Supabase Auth en lib/auth.ts.

ESPECIFICACIONES:
- Provider: CredentialsProvider con email + password
- En authorize():
    supabase.auth.signInWithPassword({ email, password })
    Si falla → throw new Error('Credenciales incorrectas')
    Si ok → cargar fila de public.users con el id del user
    Retornar { id, email, name, role } al token
- Callbacks:
    jwt: agregar user.role y user.name al token
    session: pasar token.role y token.name a session.user
- Session strategy: jwt
- Pages: signIn: '/auth/signin'
- Todos los mensajes de error en español
```

---

## 3 — proxy.ts (protección de rutas)

```
[Adjuntar: AUTH_CONTEXT.md + proxy.ts + lib/auth.ts]

Creá el proxy.ts para proteger rutas según sesión y rol.

LÓGICA:
- Si la ruta empieza con /dashboard y no hay sesión
    → redirect /auth/signin
- Si la ruta empieza con /dashboard/admin y role !== 'administrador'
    → redirect /dashboard con mensaje de error en query param
- Si la ruta es /auth/signin o /auth/registro y hay sesión
    → redirect /dashboard (ya está logueado)
- Para el resto: dejar pasar

RUTAS PROTEGIDAS:
- /dashboard/*       → requiere sesión
- /dashboard/admin/* → requiere role === 'administrador'
- /api/dashboard/*   → requiere sesión

Usar getToken de next-auth/jwt para leer el token.
El secret es process.env.NEXTAUTH_SECRET.
```

---

## 4 — Página de Login

```
[Adjuntar: AUTH_CONTEXT.md + app/auth/signin/page.tsx + lib/theme.ts]

Creá la página de login en app/auth/signin/page.tsx.

ESPECIFICACIONES:
- Layout centrado, fondo theme.colors.dark
- Card blanca con logo, título 'Iniciar sesión'
- Campos: email (type email) + password (type password)
- Botón: bg=theme.colors.primary, texto 'Entrar'
- Link: '¿Olvidaste tu contraseña?' (placeholder href='/auth/reset')
- Link: '¿No tenés cuenta? Registrate' → /auth/registro
- Validación React Hook Form + Zod:
    email: requerido, formato válido
    password: requerido, mínimo 6 caracteres
- Al enviar: signIn('credentials', { email, password, redirect: false })
    Si error → mostrar mensaje en rojo debajo del form
    Si ok → router.push('/dashboard')
- Spinner en el botón mientras procesa
- Todo en español
- Usar use client + React Hook Form + Zod + NextAuth signIn
```

---

## 5 — Página de Registro + Endpoint

```
[Adjuntar: AUTH_CONTEXT.md + app/auth/registro/page.tsx + app/api/auth/registro/route.ts + lib/supabase.ts]

Creá el registro de usuarios en dos partes.

PÁGINA /auth/registro:
- Misma estética que el login
- Campos: nombre completo, email, password, confirmar password
- Validación Zod:
    nombre: requerido, mínimo 3 chars
    email: formato válido
    password: mínimo 8 chars
    confirmar: debe coincidir con password
- POST a /api/auth/registro con los datos
    Si ok → redirigir a /auth/signin con mensaje de éxito
    Si error → mostrar mensaje en rojo

ENDPOINT /api/auth/registro:
- Recibe { name, email, password }
- supabase.auth.signUp({ email, password })
- Si ok → insertar en public.users { id, email, name, role: 'usuario' }
- Responder 200 con { ok: true }
- Si email duplicado → responder 409 con mensaje en español
- Usar supabaseAdmin (service role key) para insertar en users
```

---

## 6 — Botón de Logout

```
[Adjuntar: AUTH_CONTEXT.md + components/dashboard/header.tsx]

Agregá el botón de cerrar sesión en el header del dashboard.

ESPECIFICACIONES:
- Usar signOut de NextAuth: signOut({ callbackUrl: '/auth/signin' })
- Botón pequeño con ícono Lucide LogOut
- Confirmar con AlertDialog antes de ejecutar:
    Título: '¿Cerrar sesión?'
    Descripción: 'Se cerrará tu sesión actual.'
    Botones: Cancelar / Cerrar sesión
- Usar use client + NextAuth signOut
```

---

## 7 — Hook usePermissions

```
[Adjuntar: AUTH_CONTEXT.md + hooks/usePermissions.ts + lib/supabase.ts]

Creá el hook usePermissions y su endpoint en dos partes.

HOOK hooks/usePermissions.ts:
- Recibe module: string (ej: 'clientes')
- Usa useSession de NextAuth para obtener session.user.role
- Hace fetch a /api/permissions?role=X&module=Y
- Retorna: { canView, canCreate, canEdit, canDelete, loading }

ENDPOINT /api/permissions/route.ts:
- Recibe query params: role, module
- Consulta tabla role_permissions en Supabase
- Retorna { can_view, can_create, can_edit, can_delete }
- Requiere sesión activa (sino 401)

USO EN COMPONENTES:
const { canCreate, canEdit, canDelete } = usePermissions('clientes')
- canCreate false → no mostrar botón 'Agregar'
- canEdit false   → no mostrar botón 'Editar'
- canDelete false → no mostrar botón 'Eliminar'
```

---

## 8 — Aplicar usePermissions en módulos existentes

```
[Adjuntar: AUTH_CONTEXT.md + hooks/usePermissions.ts + app/dashboard/clientes/ + app/dashboard/servicios/]

Aplicá el hook usePermissions en todos los módulos del dashboard.

Para cada módulo:
- Importar usePermissions
- Llamar con el nombre del módulo: usePermissions('clientes'), usePermissions('servicios'), etc.
- Condicionar con canView, canCreate, canEdit, canDelete:
    Si canView es false → mostrar mensaje 'Sin acceso a este módulo'
    Si canCreate es false → ocultar botón 'Nuevo' o 'Agregar'
    Si canEdit es false → ocultar botón 'Editar' en cada fila
    Si canDelete es false → ocultar botón 'Eliminar' en cada fila
- Mostrar loading spinner mientras carga el hook

Módulos a actualizar: clientes, servicios
(agregar más según los módulos que existan en el proyecto)
```

---

## 9 — Panel Admin: Gestión de Usuarios

```
[Adjuntar: AUTH_CONTEXT.md + app/dashboard/admin/usuarios/page.tsx + lib/supabase.ts]

Creá la página de gestión de usuarios para el Administrador.

PÁGINA /dashboard/admin/usuarios:
- Tabla con columnas: Nombre, Email, Rol, Creado, Acciones
- Filtro por rol: Todos / Administrador / Usuario
- Búsqueda por nombre o email
- Columna Acciones: dropdown con opciones:
    'Cambiar a Administrador' (si es usuario)
    'Cambiar a Usuario' (si es administrador)
    Separador
    'Ver detalles'
- Al cambiar rol: PATCH /api/admin/usuarios/[id]
    Confirmar con AlertDialog antes de ejecutar
    Mostrar toast de éxito/error
- No puede cambiar su propio rol
- Paginación: 20 usuarios por página
- Solo accesible si session.user.role === 'administrador'
```

---

## 10 — Endpoint: Cambio de Rol

```
[Adjuntar: AUTH_CONTEXT.md + app/api/admin/usuarios/[id]/route.ts + lib/supabase.ts]

Creá el endpoint PATCH para cambiar el rol de un usuario.

ESPECIFICACIONES:
- Verifica sesión activa
- Verifica que session.user.role === 'administrador'
- No permite que el admin cambie su propio rol
- Recibe body: { role: 'administrador' | 'usuario' }
- Valida con Zod que role sea uno de los dos valores
- Actualiza public.users SET role = ? WHERE id = ?
- Responde 200 con { ok: true, newRole: role }
- Errores:
    401 si no hay sesión
    403 si no es admin o intenta cambiar su propio rol
    400 si el role es inválido
    404 si el usuario no existe
- Todos los mensajes en español
```

---

## 11 — Panel Admin: Gestión de Permisos

```
[Adjuntar: AUTH_CONTEXT.md + app/dashboard/admin/permisos/page.tsx + lib/supabase.ts]

Creá la página de configuración de permisos por rol.

PÁGINA /dashboard/admin/permisos:
- Tabs: Administrador / Usuario
- Tabla editable con filas por módulo:
    Columnas: Módulo, Ver, Crear, Editar, Eliminar
    Cada celda: toggle switch (on/off)
- Al cambiar un switch: PATCH /api/admin/permisos
    Body: { role, module, action, value }
    Sin confirmar — cambio instantáneo con toast
- El rol 'administrador' tiene todos los permisos fijos (no editables)
    Mostrar los switches como checked + disabled
- Solo editable el perfil 'usuario'
- Botón 'Restaurar permisos por defecto' con AlertDialog de confirmación
- Cargar datos desde /api/admin/permisos?role=usuario

ENDPOINT /api/admin/permisos/route.ts:
- GET: devuelve todos los permisos del rol indicado en query param
- PATCH: actualiza un permiso específico
    Verifica que quien llama sea admin
    No permite editar permisos del rol administrador
```

---

## Prompts de verificación

### Probar el flujo completo

```
[Adjuntar: AUTH_CONTEXT.md]

Describí cómo probar el sistema de auth completo en local.
Incluir:
- Cómo crear el primer usuario administrador en Supabase
- Cómo probar login correcto e incorrecto
- Cómo verificar que /dashboard sin sesión redirige al login
- Cómo verificar que /dashboard/admin sin rol admin redirige al dashboard
- Cómo probar el cambio de rol entre usuarios
- Cómo verificar que los permisos condicionan la UI correctamente
```

### Si algo del sistema de auth no funciona

```
[Adjuntar: AUTH_CONTEXT.md + archivo con el error]

Tengo este error en el sistema de auth:
[PEGÁ EL ERROR ACÁ]

El archivo donde ocurre es: [ruta/al/archivo.ts]

Teniendo en cuenta el contexto del sistema adjunto,
analizá la causa y proponé la solución.
```

---

*MGA Informática | 2026 | Auth Prompts v1.1*
