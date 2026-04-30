# CONTEXT.md — MGA Informática SaaS

> **Cómo usar este archivo:**
> 1. Copiarlo a la raíz de cada proyecto nuevo
> 2. Reemplazar todos los valores entre `[ ]` con los datos reales
> 3. Al iniciar cada chat con Claude en VSCode, adjuntarlo con `@`
> 4. Al terminar cada sesión, actualizar "Funcionalidades implementadas" y "Pendientes"

---

## Descripción general

- **Proyecto:** MGA Informática SaaS
- **Cliente:** MGA Informática (Gustavo)
- **Rubro:** Servicios IT, desarrollo web, sistemas de gestión
- **Objetivo:** Landing page + plataforma SaaS multi-tenant para gestión empresarial
- **URL producción:** https://mgainformatica.com.ar
- **Fecha inicio:** 14/04/2026
- **Estado:** Etapa 1 (85% completada) — Reestructuración arquitectónica completada 30/04/2026

---

## Etapas del proyecto

El proyecto se desarrolla en etapas incrementales. Cada etapa tiene sus propios MVPs y entregables.

### Etapa 1 — Landing Page

**MVP 1 — Diseño y estructura base**
- ✅ Identidad visual: colores MGA (#2E5C8A, #6BA3D0, #A8D0E8), tipografía DM Sans + Poppins
- ✅ Landing page completa con 11 secciones
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Deploy inicial en Vercel (pendiente)

**MVP 2 — Formulario de contacto y WhatsApp**
- ✅ Formulario de contacto con validación frontend (React Hook Form)
- ✅ Envío de emails con Resend
- ✅ Botón/widget de WhatsApp integrado
- ✅ Mensajes de confirmación en español

### Etapa 2 — Sección Clientes administrable

- ⏳ Panel de administración para gestionar clientes/trabajos
- ⏳ Alta, edición y baja de clientes o trabajos realizados
- ⏳ Carga y eliminación de hasta 5 fotos por cliente/trabajo
- ⏳ Parámetro `MAX_CLIENTES` configurable en `lib/constants.ts`
- ✅ Sección visible públicamente en landing y `/clientes`

### Etapa 3 — Base de datos y acceso a app interna

- ✅ Conexión a Supabase (PostgreSQL)
- ✅ Login con email/password (NextAuth + Supabase Auth)
- ⏳ Registro de usuario con validación de email
- ✅ Protección de rutas privadas con `proxy.ts`
- ✅ Dashboard básico: muestra datos del usuario logueado

### Etapa 4 — App interna (a definir)

- Estructura, base de datos y funcionalidades a definir en sesión de relevamiento
- Esta etapa se planifica una vez que las Etapas 1-3 estén en producción y estables

---

## Estructura de la Landing Page

La landing sigue este orden de secciones de arriba hacia abajo:

```
Navbar
  └── Logo · Links de navegación · Botón CTA (acceso app interna)

Hero
  └── Imagen de fondo · Título principal · Subtítulo · Botones CTA · Carousel

ServicesBanner (marquee horizontal)
  └── Palabras clave animadas

Services (Servicios)
  └── 4 cards con imagen, icono, título, descripción

ZooLogic (Productos)
  └── Dragonfish, Lince, Pantera

Process (Proceso)
  └── Timeline horizontal 5 pasos

WhyUs (Por qué elegirnos)
  └── 4 diferenciales

Testimonials (Clientes)
  └── 3 filas de ticker con logos de clientes

Contact (Contacto)
  └── Formulario de contacto · WhatsApp · Email

Footer
  └── Logo · Links · Contacto · Redes · Copyright
```

### Página pública `/clientes`

- Se abre en página separada (no modal)
- Muestra todos los clientes (24 actualmente)
- Cada entrada: logo/iniciales, nombre, rubro, ubicación
- Vista de grilla responsive

---

## Parámetros configurables

Definidos en `lib/constants.ts`:

```typescript
// Brand
export const BRAND = { name, tagline, colors: { primary, secondary, light, dark, lightBg } };

// Contacto
export const CONTACT = { email, whatsapp };

// Servicios
export const SERVICES = [ { id, slug, title, description, icon, cardImage, fullDescription, features } ];

// Colores por sección
export const SECTION_COLORS = { hero, servicesBanner, services, zoologic, process, whyUs, testimonials, contact };
```

---

## Stack tecnológico

- **Framework:** Next.js 16.2.3 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** NextAuth.js v4 + Supabase Auth
- **Email:** Resend
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Formularios:** React Hook Form
- **Deploy:** Vercel (pendiente)
- **Fuente:** DM Sans + Poppins + Geist (Google Fonts)

---

## Branding y diseño

- **Color primario:** #2E5C8A — Azul Marino
- **Color secundario:** #6BA3D0 — Azul Claro
- **Color acento:** #A8D0E8 — Azul Gradiente
- **Fondo:** #FFFFFF (blanco)
- **Tipografía títulos:** Poppins
- **Tipografía cuerpo:** DM Sans
- **Estilo general:** Corporativo moderno con gradientes
- **Logo:** `public/images/logos/mga-logo.png` (fondo claro)
- **Logo blanco:** No existe
- **Logos ZooLogic:** `public/images/logos/{dragonfish,lince,pantera}-logo.png`

---

## Estructura de carpetas

### Esquema actual (arquitectura por capas)

```
mga-saas/
│
├── app/                          # RUTAS
│   ├── (public)/                 # Zona pública (sin login)
│   │   ├── page.tsx              # Landing principal
│   │   ├── clientes/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── servicios/[slug]/
│   │       └── page.tsx
│   ├── (auth)/                   # Zona autenticación
│   │   └── auth/
│   │       ├── signin/
│   │       │   ├── page.tsx
│   │       │   └── signin-form.tsx
│   │       └── error/
│   │           └── page.tsx
│   ├── (dashboard)/              # Zona privada (requiere sesión)
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       └── logout-button.tsx
│   └── api/                      # BACKEND
│       ├── auth/[...nextauth]/   # NextAuth handler
│       ├── contact/              # API pública - formulario
│       └── dashboard/health/     # API privada - health check
│
├── components/                   # COMPONENTES UI
│   ├── landing/                  # Solo landing (11 componentes)
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── services-banner.tsx
│   │   ├── services.tsx
│   │   ├── zoologic.tsx
│   │   ├── process.tsx
│   │   ├── why-us.tsx
│   │   ├── testimonials.tsx
│   │   ├── contact-form.tsx
│   │   ├── footer.tsx
│   │   └── curved-divider.tsx
│   ├── dashboard/                # App interna (vacío por ahora)
│   └── shared/                   # Compartidos entre zonas
│       └── logo.tsx
│
├── lib/                          # LÓGICA Y CONFIG
│   ├── supabase.ts               # Clientes Supabase
│   ├── auth.ts                   # NextAuth config
│   ├── constants.ts              # Brand, servicios, colores
│   └── clients.ts                # Datos de clientes (24)
│
├── services/                     # APIs EXTERNAS
│   ├── resend.ts                 # Envío de emails
│   └── supabase-admin.ts         # Cliente admin Supabase
│
├── hooks/                        # HOOKS CUSTOM (vacío por ahora)
│
├── types/                        # TIPOS TYPESCRIPT
│   ├── database.types.ts         # Tipos generados Supabase
│   └── index.ts                  # Tipos de dominio (Cliente, Profile, Tenant, Contact)
│
├── proxy.ts                      # PROTECCIÓN DE RUTAS
└── public/
    └── images/
        ├── logos/
        ├── hero/
        └── clientes/
```

### Las 4 reglas de esta arquitectura

1. **Grupos con paréntesis** — `(public)`, `(auth)`, `(dashboard)` son invisibles en la URL pero permiten layouts distintos por zona
2. **Componentes separados por zona** — `landing/` nunca importa de `dashboard/` y viceversa. Si lo usan los dos, va a `shared/`
3. **Carpeta `services/`** — toda la lógica de APIs externas vive acá. Los endpoints de Next.js solo llaman estas funciones, no tienen lógica propia
4. **Tipos centralizados** — todos los tipos TypeScript en `types/`. Nunca definir tipos inline en componentes

### Qué existe en este proyecto

- `app/(public)/` → ✅ existe
- `app/(public)/clientes/` → ✅ existe (página pública con 24 clientes)
- `app/(public)/servicios/[slug]/` → ✅ existe (4 servicios estáticos)
- `app/(auth)/auth/signin/` → ✅ existe (login con NextAuth + Supabase)
- `app/(auth)/auth/error/` → ✅ existe
- `app/(dashboard)/dashboard/` → ✅ existe (básico: muestra sesión + logout)
- `components/landing/` → ✅ existe (11 componentes)
- `components/landing/clientes-preview.tsx` → ⏳ pendiente (reemplazar testimonials.tsx)
- `components/dashboard/` → ✅ existe (vacío)
- `components/shared/` → ✅ existe (logo.tsx)
- `lib/constants.ts` → ✅ existe
- `lib/clients.ts` → ✅ existe (24 clientes hardcodeados)
- `lib/supabase.ts` → ✅ existe (client + server)
- `lib/auth.ts` → ✅ existe (NextAuth config)
- `services/resend.ts` → ✅ existe
- `services/supabase-admin.ts` → ✅ existe
- `hooks/` → ✅ existe (vacío)
- `types/database.types.ts` → ✅ existe
- `types/index.ts` → ✅ existe (tipos de dominio)
- `proxy.ts` → ✅ existe (protege /dashboard y /api/dashboard)

---

## Datos de contacto del proyecto

- **Teléfono:** +54 297 4036526
- **Email:** gustavo.mgainformatica@gmail.com
- **WhatsApp:** +542974036526
- **Dirección:** Comodoro Rivadavia, Chubut, Argentina
- **Redes:**
  - Instagram: instagram.com/mgainformatica.ok
  - Facebook: facebook.com/MGAInformatica.Gustavo
  - LinkedIn: No tiene

---

## Rutas y componentes existentes

### Rutas creadas

- `/` → landing principal (11 secciones)
- `/servicios/desarrollo-web` → página de servicio
- `/servicios/sistemas-gestion` → página de servicio
- `/servicios/soporte-tecnico` → página de servicio
- `/servicios/consultoria-it` → página de servicio
- `/clientes` → página pública con 24 clientes
- `/auth/signin` → login
- `/auth/error` → error de autenticación
- `/dashboard` → panel protegido (básico)
- `/api/contact` → POST para formulario
- `/api/auth/[...nextauth]` → NextAuth handler
- `/api/dashboard/health` → health check protegido
- `/robots.txt` → generado
- `/sitemap.xml` → generado

### Componentes landing (`components/landing/`)

- `navbar.tsx` → Barra de navegación sticky con logo, menú desplegable de servicios, responsive
- `hero.tsx` → Hero con carousel de 5 imágenes, orbs animados, CTA con brillo
- `services-banner.tsx` → Marquee horizontal con palabras clave animadas
- `services.tsx` → 4 cards de servicios con imagen, icono Lucide, hover effects
- `zoologic.tsx` → 3 productos ZooLogic (Dragonfish, Lince, Pantera) con logos
- `process.tsx` → Timeline horizontal 5 pasos con iconos y cards
- `why-us.tsx` → 4 diferenciales con numeración
- `testimonials.tsx` → 3 filas de ticker con 24 clientes (logos/iniciales)
- `contact-form.tsx` → Formulario con validación, envío a API, WhatsApp
- `footer.tsx` → Footer con links, contacto, redes sociales
- `curved-divider.tsx` → Separador SVG con gradiente animado y destello

### Componentes dashboard (`components/dashboard/`)

- Vacío — se crearán en Etapa 2

---

## Funcionalidades implementadas

### Etapa 1

- ✅ **MVP 1** — Landing completa con 11 secciones
- ✅ **MVP 1** — Diseño, tipografías y branding definidos
- ✅ **MVP 1** — Responsive (mobile, tablet, desktop)
- ⏳ **MVP 1** — Deploy inicial en Vercel
- ✅ **MVP 2** — Formulario de contacto con validación frontend
- ✅ **MVP 2** — Envío de emails con Resend
- ✅ **MVP 2** — Botón/widget de WhatsApp integrado
- ✅ SEO base (metadata, sitemap, robots)
- ✅ Arquitectura reestructurada con grupos (public), (auth), (dashboard)

### Etapa 2

- ✅ Página pública `/clientes` con grilla de trabajos
- ⏳ Panel de administración para cargar/editar/eliminar clientes o trabajos
- ⏳ Carga de hasta 5 fotos por entrada
- ⏳ Parámetro `MAX_CLIENTES` configurable en `lib/constants.ts`

### Etapa 3

- ✅ Conexión a Supabase real
- ✅ Login con NextAuth + Supabase Auth
- ⏳ Registro de usuario con validación
- ✅ Protección de rutas con `proxy.ts`
- ✅ Dashboard básico con datos del usuario logueado

### Etapa 4

- ⏳ A definir en sesión de relevamiento

---

## Pendientes y próximos pasos

### Crítico (antes de salir a producción)

1. Rate limiting en `/api/contact` (prevenir spam)
2. Validación backend con Zod en formulario de contacto
3. Deploy a Vercel y configurar dominio

### Próxima sesión

- Reestructuración arquitectónica completada. Listo para continuar desarrollo.

### Backlog

- Analytics (Google Analytics o Plausible)
- Dark mode toggle
- Tests (Jest + React Testing Library)
- CI/CD (GitHub Actions)
- Monitoreo errores (Sentry)
- RLS policies completas para `tenants` y `contacts`
- Verificar dominio de email en Resend

---

## Convenciones del proyecto

- **Idioma del código:** inglés (variables, funciones, tipos)
- **Idioma de la UI:** español
- **Mensajes de error:** siempre en español
- **Nombres de archivos:** kebab-case (ej: `contact-form.tsx`)
- **Componentes:** PascalCase (ej: `ContactForm`)
- **Variables:** camelCase (ej: `isLoading`)
- **Estilos:** solo Tailwind, sin CSS inline salvo excepciones (gradientes, colores brand)
- **Imports:** absolutos desde raíz con `@/` (ej: `@/components/landing/navbar`)
- **Comentarios:** en español

---

## Notas especiales del proyecto

- La sección de Clientes/Trabajos es administrable por el cliente final (sin necesidad de intervención técnica)
- `MAX_CLIENTES = 5` por defecto en landing; la página `/clientes` muestra todos sin límite
- Cada cliente/trabajo tiene: nombre (string), detalle (string), fotos (string[], máximo 5)
- El botón de acceso a la app interna está en el Navbar (Etapa 3 en adelante)
- 24 clientes hardcodeados en `lib/clients.ts` — migrar a Supabase en Etapa 2
- ZooLogic: Dragonfish (Color y Talle), Lince (Indumentaria), Pantera (Comercios)
- Colores MGA: primary #2E5C8A, secondary #6BA3D0, light #A8D0E8
- Next.js 16.2.3 con Turbopack
- Supabase project: wpbogwonvbcrcpkjxdvb
- Bug conocido: @supabase/supabase-js v2.103+ tiene incompatibilidad con tipos Database generados — workaround con `as any` en route.ts

---

**Última actualización:** 30/04/2026
**Actualizado por:** Reestructuración arquitectónica
