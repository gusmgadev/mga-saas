# BIBLIOTECA-NAVBAR.md
5 Templates con Sistema de Diseño — Prompts listos para Cursor

Gustavo — MGA Informática | 2026

---

## Cómo usar este archivo

Adjuntalo con `@BIBLIOTECA-NAVBAR.md` junto a `@lib/theme.ts` antes de pedir el navbar en Cursor.
Elegí el template según la tabla de abajo, copiá el prompt correspondiente y pegalo en el Agent.

---

## Variables globales — lib/theme.ts

Estas son las claves del theme que usa el navbar. Configurarlas una sola vez antes de arrancar.

```ts
// lib/theme.ts — sección navbar y base
export const theme = {
  colors: {
    primary:    "[COLOR PRINCIPAL]",
    secondary:  "[COLOR SECUNDARIO]",
    accent:     "[COLOR ACENTO]",
    background: "#FFFFFF",
    dark:       "[COLOR OSCURO]",
    text:       "#1A1A1A",
    textMuted:  "#666666",
    border:     "#E8E8E8",
  },
  fonts: {
    primary:   "[FUENTE TITULOS]",
    secondary: "[FUENTE CUERPO]",
  },
  shadows: {
    nav: "0 2px 8px rgba(0,0,0,0.06)",
  },
  transitions: { fast:"0.15s ease", normal:"0.25s ease" },
  breakpoints: { mobile:"640px" },
  navbar: {
    height:       "64px",
    heightMobile: "56px",
    cta: { text:"[TEXTO CTA]", href:"[DESTINO CTA]" }
  },
  contact: { phone:"[TELEFONO]", email:"[EMAIL]" },
  logo: {
    path:      "/images/logos/logo.png",
    pathWhite: "/images/logos/logo-white.png",
    width:     160,
    height:    40
  },
}
```

---

## Resumen — Cuándo usar cada template

| Template | Estilo | Logo | Ideal para |
|---|---|---|---|
| **1 — Clásico** | Limpio, minimalista | Cualquier formato | SaaS, portfolio, servicios |
| **2 — Glassmorphism** | Moderno, tech | Versión blanca obligatoria | Startups, apps, hero oscuro |
| **3 — Badge** | Corporativo, oscuro | Cualquier formato | Tech, industrial, empresa |
| **4 — Dos filas** | Profesional, completo | Cualquier formato | Negocios locales, servicios |
| **5 — Centrado** | Editorial, premium | Logo horizontal | Restaurantes, moda, premium |

---

## Template 1 — Clásico limpio

Logo izquierda · Links centro · CTA derecha · Active pill redondeado

```
PROMPT PARA CURSOR — Navbar Template 1

@components/landing/navbar.tsx @lib/theme.ts

Crea el navbar Template 1 - Clásico limpio.
Importa los valores desde lib/theme.ts.

MENU_ITEMS: ["Servicios","ZooLogic","Proceso","Clientes"]

ESPECIFICACIONES:
- Logo: Next/Image path=theme.logo.path
  width=theme.logo.width height=theme.logo.height
- Links: pill bg=theme.colors.primary en active
  usePathname() para detectar ruta activa
- Hover: bg #F5F5F5 transition=theme.transitions.fast
- CTA: pill relleno bg=theme.colors.primary
  texto=theme.navbar.cta.text href=theme.navbar.cta.href
- Sticky: al scroll agrega box-shadow=theme.shadows.nav
- Mobile (<640px): ícono Lucide Menu/X → dropdown abajo
  fondo blanco, links en columna, padding generoso
- Usa use client + usePathname + useState
```

---

## Template 2 — Flotante glassmorphism

Navbar flotante · Fondo translúcido · Blur · Requiere hero oscuro

```
PROMPT PARA CURSOR — Navbar Template 2

@components/landing/navbar.tsx @lib/theme.ts

Crea el navbar Template 2 - Flotante glassmorphism.
Importa los valores desde lib/theme.ts.

MENU_ITEMS: ["Servicios","ZooLogic","Proceso","Clientes"]

ESPECIFICACIONES:
- Navbar flotante border-radius 99px, sticky top-4, mx-auto
- Fondo: rgba(255,255,255,0.08) + backdrop-filter blur(12px)
  border: 0.5px solid rgba(255,255,255,0.15)
- Scroll (scrollY>20): opacity 0.15, blur 16px con transición
- Logo: Next/Image path=theme.logo.pathWhite
- Active: bg rgba(255,255,255,0.18) color blanco
  usePathname() para detectar ruta activa
- Links inactivos: rgba(255,255,255,0.70), hover blanco
- CTA: bg blanco, color=theme.colors.dark, fw 600, pill
- Mobile: hamburguesa blanca → dropdown rgba(15,26,53,0.95)
- Usa use client + usePathname + useState + useEffect

NOTA: Requiere hero con fondo oscuro. No funciona sobre fondos blancos.
```

---

## Template 3 — Logo en badge de color

Fondo negro · Logo en badge color · Active con underline animado

```
PROMPT PARA CURSOR — Navbar Template 3

@components/landing/navbar.tsx @lib/theme.ts

Crea el navbar Template 3 - Logo en badge de color.
Importa los valores desde lib/theme.ts.

MENU_ITEMS: ["Servicios","ZooLogic","Proceso","Clientes"]

ESPECIFICACIONES:
- Fondo navbar: #0A0A0A
- Logo en badge: bg=theme.colors.primary, radius 8px
  padding 6px 14px, flex align-items center gap-2
  Next/Image dentro, height=theme.logo.height
- Links: color rgba(255,255,255,0.60)
  hover: blanco, transition=theme.transitions.fast
  active: color=theme.colors.secondary
  + border-bottom 2px solid theme.colors.secondary
  usePathname() para detectar ruta activa
- CTA: border 1px solid rgba(255,255,255,0.25)
  color blanco, bg transparent, hover rgba(255,255,255,0.08)
- Sticky: al scroll sombra 0 2px 12px rgba(0,0,0,0.4)
- Mobile: hamburguesa blanca → dropdown bg #111111
- Usa use client + usePathname + useState
```

---

## Template 4 — Dos filas con datos de contacto

Barra superior con teléfono y email · Barra principal con logo y CTA

```
PROMPT PARA CURSOR — Navbar Template 4

@components/landing/navbar.tsx @lib/theme.ts

Crea el navbar Template 4 - Dos filas con contacto.
Importa los valores desde lib/theme.ts.

MENU_ITEMS: ["Servicios","ZooLogic","Proceso","Clientes"]

ESPECIFICACIONES:
- Barra top: bg=theme.colors.dark, padding 5px 32px
  justify-end, mostrar theme.contact.phone y theme.contact.email
  color rgba(255,255,255,0.60), font-size xs
  Mobile (<640px): display none
- Barra principal: bg=theme.colors.background
  height=theme.navbar.height
  border-bottom 2px solid theme.colors.border
- Logo: Next/Image path=theme.logo.path
- Links: active bg=theme.colors.primary color blanco radius sm
  hover bg #F5F5F5 radius sm
  usePathname() para detectar ruta activa
- CTA: bg=theme.colors.primary color blanco radius sm
- Sticky: al scroll ocultar top bar con slide-up, agregar shadow
- Mobile: hamburguesa → dropdown blanco, links en columna
- Usa use client + usePathname + useState + useEffect
```

---

## Template 5 — Logo centrado elegante

Logo centrado · Links debajo en uppercase · Active con subrayado

```
PROMPT PARA CURSOR — Navbar Template 5

@components/landing/navbar.tsx @lib/theme.ts

Crea el navbar Template 5 - Logo centrado elegante.
Importa los valores desde lib/theme.ts.

MENU_ITEMS: ["Servicios","ZooLogic","Proceso","Clientes","Contacto"]

ESPECIFICACIONES:
- Barra top: bg #F9F9F7, border-bottom 0.5px solid border
  justify-end, theme.contact.phone y theme.contact.email
  font-size xs, color #888. Mobile: display none
- Barra principal: flex-col align-items center gap-3
  bg=theme.colors.background, border-bottom 0.5px solid border
- Logo: Next/Image centrado, formato horizontal
- Links: font-size xs, letter-spacing 1.5px, text-transform uppercase
  color #666, padding 4px 16px
  active: color=theme.colors.primary
  ::after bottom -4px height 1.5px bg=theme.colors.primary
  transition width 0.2s ease
  usePathname() para detectar ruta activa
- Sticky: ocultar barra top al scroll
  logo + links fijos centrados, border-bottom sutil
- Mobile: logo centrado + hamburguesa derecha
  dropdown centrado, links uppercase en columna
- Usa use client + usePathname + useState + useEffect

NOTA: Requiere logo horizontal. Si el logo es cuadrado o vertical, usar Templates 1, 3 o 4.
```

---

*MGA Informática | 2026 | Biblioteca de Navbar v1.1*
