# BIBLIOTECA-HERO.md
3 Templates con Sistema de Diseño — Prompts listos para Cursor

Gustavo — MGA Informática | 2026

---

## Cómo usar este archivo

Adjuntalo con `@BIBLIOTECA-HERO.md` junto a `@lib/theme.ts` antes de pedir el hero en Cursor.
Elegí el template según la tabla de abajo, copiá el prompt correspondiente y pegalo en el Agent.

---

## Variables globales — lib/theme.ts

Agregar en `lib/theme.ts` antes de crear cualquier Hero template. Todos los templates importan estos valores.

```ts
// lib/theme.ts — sección hero
hero: {
  height:          "100vh",
  heightMobile:    "90vh",
  overlayOpacity:  0.75,
  blurAmount:      "4px",
  slideInterval:   4000,       // ms entre imágenes
  slideTransition: "1.2s",     // duración del fade
  tag:    "SOLUCIONES TECNOLOGICAS",
  title:  "Tu título principal",
  titleHighlight: "palabra destacada",  // se muestra en color secondary
  subtitle: "Tu descripción breve aquí.",
  cta: {
    primary:   { text: "Contactanos", href: "#contact" },
    secondary: { text: "Ver servicios", href: "#services" },
  },
  images: [
    "/images/hero/imagen1.jpg",
    "/images/hero/imagen2.jpg",
    "/images/hero/imagen3.jpg",
  ],
},
```

> **Imágenes:** JPG o PNG de al menos 1920×1080px. Peso máximo recomendado: 300KB cada una.
> Nombrarlas `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` en `/public/images/hero/`

---

## Resumen — Cuándo usar cada template

| Template | Estilo | Imágenes | Ideal para |
|---|---|---|---|
| **1 — Mockup** | Profesional, con app | 3 horizontales | SaaS, agencias, tech |
| **2 — Split stats** | Datos, credibilidad | 2-3 horizontales | Servicios, empresas, pymes |
| **3 — Fullscreen** | Premium, inmersivo | 3-5 de alta calidad | Cualquier rubro premium |

---

## Template 1 — Imagen fondo + mockup derecha

Imágenes rotantes con overlay · Título y CTA izquierda · Mockup de app derecha

```
PROMPT PARA CURSOR — Hero Template 1

@components/landing/hero.tsx @lib/theme.ts

Crea el Hero Template 1 - Imagen fondo + mockup derecha.
Importa los valores desde lib/theme.ts.

ESPECIFICACIONES:
- Contenedor: height=theme.hero.height, position relative, overflow hidden
- Slideshow de imágenes:
  Cada imagen: position absolute, inset 0
  object-fit cover, filter blur(theme.hero.blurAmount)
  transition opacity theme.hero.slideTransition ease
  Auto-avance cada theme.hero.slideInterval ms
  Pausa con onMouseEnter, reanuda con onMouseLeave
- Overlay: position absolute inset 0
  background: linear-gradient(to right,
    rgba(26,39,68,0.88) 0%,
    rgba(26,39,68,0.88) 45%,
    rgba(26,39,68,0.40) 70%,
    rgba(26,39,68,0.10) 100%)
- Layout: grid 2 columnas, gap 32px, padding 0 48px
  align-items center, position relative z-index 2
- Columna izquierda:
  Tag: badge pill con border rgba(secondary,0.4)
    color secondary, font-size xs, letter-spacing 1px
    animación fadeUp 0.6s
  Título: font-size 3.5rem, font-weight 800, color white
    palabra highlight en color=theme.colors.secondary
    animación fadeUp 0.6s delay 0.1s
  Subtítulo: font-size base, color rgba(255,255,255,0.70)
    max-width 400px, animación fadeUp delay 0.2s
  Botones: flex gap-3, animación fadeUp delay 0.3s
    CTA primario: pill bg=theme.colors.primary
    CTA secundario: pill borde rgba(255,255,255,0.3)
- Columna derecha: mockup de dashboard
  Contenedor: bg rgba(255,255,255,0.06)
    border rgba(255,255,255,0.12), border-radius 16px
    animación slideInRight 0.8s delay 0.4s
  Contenido: barra de título + filas de datos simulados + grid de 2 cards
- Dots navegación: position absolute bottom-4 left-48
  activo: pill elongado color secondary
  inactivo: círculo rgba(255,255,255,0.3)
- Mobile (<768px): grid 1 columna, ocultar mockup
  height=theme.hero.heightMobile

Usa use client + useState + useEffect para slideshow.
```

---

## Template 2 — Split 50/50 con stats flotantes

Layout dividido · Gradiente izquierda · Imágenes + stats glassmorphism derecha

```
PROMPT PARA CURSOR — Hero Template 2

@components/landing/hero.tsx @lib/theme.ts

Crea el Hero Template 2 - Split 50/50 con stats.
Importa los valores desde lib/theme.ts.

STATS: [
  { number: "+50", label: "Clientes activos" },
  { number: "8+",  label: "Años de experiencia" },
  { number: "3",   label: "Productos ZooLogic" },
]

ESPECIFICACIONES:
- Contenedor: display grid, grid-template-columns 1fr 1fr
  height=theme.hero.height, overflow hidden
- Lado izquierdo:
  background: linear-gradient(135deg,
    theme.colors.dark 0%, theme.colors.primary 100%)
  padding 60px 48px, display flex flex-col justify-center
  Tag: badge pequeño bg rgba(accent,0.15) color accent
  Título: font-size 3rem fw 700 color white lh 1.2
  Subtítulo: font-size base color rgba(white,0.65)
  CTA: botón sólido bg white color dark, border-radius md
    hover: bg rgba(white,0.9) transition fast
  Animaciones fadeUp en secuencia con delays
- Lado derecho: position relative overflow hidden
  Slideshow: imágenes con blur(theme.hero.blurAmount)
  filter brightness(0.7), crossfade suave
  Overlay: linear-gradient(to left,
    transparent 60%, rgba(dark,0.3) 100%)
  Stats: position absolute bottom-5 left-5 right-5
    display grid grid-cols-3 gap-2
    Cada card: bg rgba(255,255,255,0.12)
      backdrop-filter blur(8px)
      border 0.5px solid rgba(255,255,255,0.2)
      border-radius 10px, padding 12px, text-align center
      Número: font-size xl fw 700 color white
      Label: font-size xs color rgba(white,0.6)
- Mobile (<768px):
  grid 1 columna, lado derecho arriba height 50vh
  stats: fila horizontal con overflow-x auto

Usa use client + useState + useEffect para slideshow.
```

---

## Template 3 — Fullscreen centrado + pills flotantes

Imágenes fullscreen oscuras · Contenido centrado · Título con gradiente · Pills de servicios

```
PROMPT PARA CURSOR — Hero Template 3

@components/landing/hero.tsx @lib/theme.ts

Crea el Hero Template 3 - Fullscreen centrado con pills.
Importa los valores desde lib/theme.ts.

PILLS: [
  { icon: Globe,  title:"Desarrollo Web",    sub:"Next.js · React", color:"#6BA3D0" },
  { icon: Zap,    title:"Sistemas Gestión",  sub:"ZooLogic",        color:"#1D9E75" },
  { icon: Wrench, title:"Soporte Técnico",   sub:"24/7",            color:"#EF9F27" },
]

ESPECIFICACIONES:
- Contenedor: position relative height=theme.hero.height
  overflow hidden, display flex align-items center justify-content center
- Imágenes: position absolute inset 0
  filter: blur(theme.hero.blurAmount) brightness(0.35)
  transition opacity 1.5s ease
  Slideshow auto cada theme.hero.slideInterval
- Overlay: position absolute inset 0
  background rgba(0,0,0,0.55)
- Contenido centrado (position relative z-index 2):
  max-width 680px, text-align center, padding 0 48px
  Tag: pill flex items-center gap-2
    bg rgba(255,255,255,0.08)
    border 0.5px solid rgba(255,255,255,0.2)
    Dot: w-2 h-2 rounded-full bg #4ade80
      animation pulse 1.5s infinite
  Título: font-size 4rem fw 800 color white lh 1.1
    Segunda línea: background linear-gradient(to right,
      theme.colors.secondary, theme.colors.accent)
      -webkit-background-clip text
      -webkit-text-fill-color transparent
  Subtítulo: font-size base color rgba(white,0.65)
  Botones: flex justify-center gap-3
    Primario: gradient bg primary→secondary, pill
    Secundario: glassmorphism, pill
- Pills flotantes: position absolute right-10
  display flex flex-col gap-3, top 50% translateY(-50%)
  Cada pill: flex items-center gap-3
    bg rgba(255,255,255,0.10)
    backdrop-filter blur(8px)
    border 0.5px solid rgba(255,255,255,0.2)
    border-radius 99px, padding 8px 16px
    Icon container: w-8 h-8 rounded-full bg color+44
    animation: floatUp 3s ease-in-out infinite
      delay: 0s / 1s / 2s según index
- Mobile (<768px): ocultar pills
  font-size título reducido a 2.5rem

Importar íconos de lucide-react.
Usa use client + useState + useEffect.

NOTA: Requiere imágenes de alta calidad. Con imágenes de baja resolución el resultado no es el esperado.
```

---

*MGA Informática | 2026 | Biblioteca de Hero v1.0*
