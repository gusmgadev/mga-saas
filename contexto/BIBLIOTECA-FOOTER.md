# BIBLIOTECA-FOOTER.md
3 Templates con Sistema de Diseño — Prompts listos para Cursor

Gustavo — MGA Informática | 2026

---

## Cómo usar este archivo

Adjuntalo con `@BIBLIOTECA-FOOTER.md` junto a `@lib/theme.ts` antes de pedir el footer en Cursor.
Elegí el template según la tabla de abajo, copiá el prompt correspondiente y pegalo en el Agent.

---

## Variables globales — lib/theme.ts

Agregar en `lib/theme.ts` antes de crear cualquier Footer template. Todos los templates importan estos valores.

```ts
// lib/theme.ts — sección footer
footer: {
  description: "Soluciones tecnológicas para empresas y emprendedores de la Patagonia.",
  social: {
    facebook:  "https://facebook.com/tu-pagina",
    instagram: "https://instagram.com/tu-usuario",
    linkedin:  "https://linkedin.com/company/tu-empresa",
  },
  maps: {
    embedUrl: "https://maps.google.com/maps?q=...",
    height:   "120px",
  },
  legal: {
    privacy: "/privacidad",
    terms:   "/terminos",
  },
  copyright: "2026 MGA Informática.",
  services: [
    { label: "Desarrollo Web",    href: "/servicios/desarrollo-web" },
    { label: "Sistemas Gestión",  href: "/servicios/sistemas-gestion" },
    { label: "Soporte Técnico",   href: "/servicios/soporte-tecnico" },
    { label: "Consultoría IT",    href: "/servicios/consultoria-it" },
    { label: "ZooLogic",          href: "#zoologic" },
  ],
  nav: [
    { label: "Inicio",    href: "/" },
    { label: "Servicios", href: "#services" },
    { label: "Clientes",  href: "#clientes" },
    { label: "Proceso",   href: "#process" },
    { label: "Contacto",  href: "#contact" },
  ],
},
```

> **Google Maps embedUrl:** maps.google.com → buscar tu dirección → Compartir → Insertar un mapa → copiar el `src` del iframe.

---

## Resumen — Cuándo usar cada template

| Template | Estilo | Logo | Ideal para |
|---|---|---|---|
| **1 — Clásico** | Claro, completo | Logo normal | Cualquier proyecto, default |
| **2 — Oscuro** | Marino, impactante | Logo blanco | Hero oscuro, tech, corporativo |
| **3 — Banda CTA** | Moderno, conversión | Logo normal | Cuando se quiere último CTA |

**Combinaciones que funcionan bien:**
- Navbar 1 + Hero 1 + Footer 1 (todo claro)
- Navbar 2 + Hero 3 + Footer 2 (todo oscuro)
- Navbar 1 + Hero 2 + Footer 3 (mixto con CTA final)

---

## Template 1 — Clásico 4 columnas claro

Footer claro · 4 columnas · Empresa, servicios, nav y contacto con mapa

```
PROMPT PARA CURSOR — Footer Template 1

@components/landing/footer.tsx @lib/theme.ts

Crea el Footer Template 1 - Clásico 4 columnas claro.
Importa todos los valores desde lib/theme.ts.

ESPECIFICACIONES:
- Contenedor: bg=#F8F9FB, border-top 1px solid #E8ECF0
  padding 48px 48px 0
- Grid: grid-template-columns 2fr 1fr 1fr 1.5fr, gap 40px
  margin-bottom 40px
- Columna 1 — Empresa:
  Logo: Next/Image path=theme.logo.path + nombre empresa
  Descripción: theme.footer.description, color textMuted
  Redes sociales: íconos Lucide Facebook/Instagram/Linkedin
    Cada ícono: w-8 h-8, bg #E8ECF0, border-radius md
    hover: bg=theme.colors.primary color blanco
    transition=theme.transitions.fast
    Links a theme.footer.social.facebook/instagram/linkedin
    target _blank rel noopener noreferrer
- Columna 2 — Servicios:
  Título uppercase letter-spacing 0.5px color dark
  Links: theme.footer.services, color textMuted
  hover: color=theme.colors.primary
- Columna 3 — Empresa:
  Título uppercase, links: theme.footer.nav
- Columna 4 — Contacto:
  Items con ícono Lucide + texto:
    Phone: theme.contact.phone
    Mail: theme.contact.email (link mailto:)
    WhatsApp: botón que abre wa.me/theme.contact.whatsapp
  Google Maps: iframe src=theme.footer.maps.embedUrl
    width 100% height=theme.footer.maps.height
    border-radius md, border 0, loading lazy
- Barra inferior:
  border-top 1px solid #E8ECF0, padding 20px 0
  flex justify-between
  Copyright: theme.footer.copyright
  Links legales: Privacidad y Términos
- Mobile (<768px): grid 1 columna, mapa al final
  Redes en fila horizontal
```

---

## Template 2 — Oscuro con acento azul

Footer oscuro azul marino · Logo blanco · Hover en secundario · Gradiente en barra inferior

```
PROMPT PARA CURSOR — Footer Template 2

@components/landing/footer.tsx @lib/theme.ts

Crea el Footer Template 2 - Oscuro con acento.
Importa todos los valores desde lib/theme.ts.

ESPECIFICACIONES:
- Contenedor: bg=theme.colors.dark (#0f1a35)
  padding 48px 48px 0
- Grid: mismo que Template 1 (2fr 1fr 1fr 1.5fr)
  border-bottom 1px solid rgba(255,255,255,0.08)
  margin-bottom 0, padding-bottom 40px
- Columna 1:
  Logo: Next/Image path=theme.logo.pathWhite
  Descripción: color rgba(255,255,255,0.50)
  Redes: bg rgba(255,255,255,0.06)
    border 0.5px solid rgba(255,255,255,0.10)
    hover: bg=theme.colors.primary, border primary
    color rgba(255,255,255,0.60) → blanco en hover
- Columnas 2 y 3:
  Títulos: color rgba(255,255,255,0.35), uppercase
  Links: color rgba(255,255,255,0.55)
  hover: color=theme.colors.secondary
- Columna 4 contacto:
  Ícono bg: rgba(primary,0.25), color secondary
  Texto: color rgba(255,255,255,0.55)
  Maps: opacity 0.7 sobre iframe, border rgba(white,0.08)
- Barra inferior:
  padding 20px 0, flex justify-between align-items center
  Copyright: color rgba(255,255,255,0.30)
  Acento: div w-10 h-0.5 bg gradient primary→secondary
- Mobile (<768px): grid 1 columna

NOTA: Combina muy bien con Hero Templates 1 y 3 (fondos oscuros).
```

---

## Template 3 — Banda CTA + minimalista

Banda de color con CTA · Footer blanco compacto · Convierte usuarios al final de la página

```
PROMPT PARA CURSOR — Footer Template 3

@components/landing/footer.tsx @lib/theme.ts

Crea el Footer Template 3 - Banda CTA + minimalista.
Importa todos los valores desde lib/theme.ts.

BANDA CTA:
BAND_TITLE:    "¿Listo para digitalizar tu negocio?"
BAND_SUBTITLE: "Contactanos hoy y te asesoramos sin compromiso."
BAND_CTA_TEXT: "Contactanos ahora"
BAND_CTA_HREF: theme.navbar.cta.href

ESPECIFICACIONES:
- Banda superior:
  bg=theme.colors.primary, padding 36px 48px
  display grid grid-template-columns 1fr auto
  gap 32px, align-items center
  Título: font-size xl fw 700 color blanco
  Subtítulo: font-size sm color rgba(white,0.70)
  Botón: bg blanco, color=theme.colors.primary
    border-radius full, fw 700, padding 10px 28px
    hover: bg rgba(white,0.92) scale(1.02)
    transition=theme.transitions.fast
    white-space nowrap
- Footer principal:
  bg=#FFFFFF, border-top 1px solid #E8ECF0
  padding 36px 48px 0
  Grid: grid-template-columns 2fr 1fr 1fr 1fr gap 32px
- Columna 1:
  Logo Next/Image + nombre empresa
  Descripción: font-size sm color textMuted
  Redes: íconos Lucide en pill circular
    border 0.5px solid #E0E8F0, w-7 h-7
    hover: bg primary color blanco border primary
- Columnas 2 y 3: links compactos
  font-size sm, sin títulos en mayúscula
  hover: color primary
- Columna 4 contacto compacto:
  Ícono inline + texto en misma línea
  Maps iframe compacto al final
- Bottom: padding 14px 0
  Copyright izquierda, Privacidad y Términos derecha
- Mobile:
  Banda: flex-col, botón ancho completo
  Footer: grid 1 columna

TIP: Cambiar el BAND_TITLE según el rubro hace este footer muy efectivo.
  Para MGA: "¿Listo para digitalizar tu negocio?"
  Para una clínica: "Agendá tu consulta hoy."
```

---

*MGA Informática | 2026 | Biblioteca de Footer v1.0*
