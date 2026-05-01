// ─────────────────────────────────────────────────────────────────────────────
// lib/theme.ts — MGA Informática — Sistema de Diseño
// Fuente de verdad única para colores, tipografía, contacto y configuración.
// Copiá este archivo a cada proyecto nuevo y completá los valores entre [ ].
// Todos los componentes importan desde acá — un cambio acá cambia todo.
// ─────────────────────────────────────────────────────────────────────────────

export const theme = {

  // ── IDENTIDAD ──────────────────────────────────────────────────────────────
  company: {
    name:    "MGA Informática",
    tagline: "Soluciones Tecnológicas",
  },

  // ── COLORES ────────────────────────────────────────────────────────────────
  colors: {
    primary:    "#2E5C8A",  // Azul Marino
    secondary:  "#6BA3D0",  // Azul Claro
    accent:     "#A8D0E8",  // Azul Gradiente
    dark:       "#000000",  // Negro puro
    background: "#FFFFFF",  // Fondo general
    text:       "#1A1A1A",  // Texto principal
    textMuted:  "#666666",  // Texto secundario / placeholders
    border:     "#E8E8E8",  // Bordes de inputs, cards, separadores
    success:    "#1D9E75",  // Mensajes de éxito
    error:      "#E24B4A",  // Mensajes de error
    warning:    "#EF9F27",  // Mensajes de advertencia
  },

  // ── TIPOGRAFÍA ─────────────────────────────────────────────────────────────
  fonts: {
    primary:   "Poppins",    // Títulos y UI
    secondary: "DM Sans",    // Cuerpo de texto
  },

  fontSizes: {
    xs:   "11px",   // Labels, badges, metadata
    sm:   "13px",   // Texto secundario, captions
    base: "16px",   // Texto base del cuerpo
    lg:   "20px",   // Subtítulos pequeños
    xl:   "28px",   // Títulos de sección
    xxl:  "40px",   // Títulos grandes
  },

  fontWeights: {
    regular: 400,
    medium:  500,
    bold:    700,
  },

  // ── ESPACIADO ──────────────────────────────────────────────────────────────
  spacing: {
    xs:  "4px",
    sm:  "8px",
    md:  "16px",
    lg:  "24px",
    xl:  "48px",
    xxl: "80px",
  },

  // ── BORDES ─────────────────────────────────────────────────────────────────
  radii: {
    sm:   "6px",    // Inputs, badges pequeños
    md:   "12px",   // Cards, modals
    lg:   "20px",   // Cards grandes
    full: "99px",   // Pills, botones redondeados
  },

  // ── SOMBRAS ────────────────────────────────────────────────────────────────
  shadows: {
    sm:  "0 1px 3px rgba(0,0,0,0.08)",
    md:  "0 4px 12px rgba(0,0,0,0.10)",
    nav: "0 2px 8px rgba(0,0,0,0.06)",
  },

  // ── TRANSICIONES ───────────────────────────────────────────────────────────
  transitions: {
    fast:   "0.15s ease",
    normal: "0.25s ease",
    slow:   "0.40s ease",
  },

  // ── BREAKPOINTS ────────────────────────────────────────────────────────────
  breakpoints: {
    mobile:  "640px",
    tablet:  "768px",
    desktop: "1024px",
  },

  // ── NAVBAR ─────────────────────────────────────────────────────────────────
  navbar: {
    height:       "72px",
    heightMobile: "64px",
    cta: {
      text: "Acceder",
      href: "/auth/signin",
    },
  },

  // ── HERO ───────────────────────────────────────────────────────────────────
  hero: {
    height:          "100vh",
    heightMobile:    "90vh",
    overlayOpacity:  0.75,
    blurAmount:      "4px",
    slideInterval:   1500,
    slideTransition: "0.8s",

    tag:            "SOLUCIONES TECNOLÓGICAS",
    title:          "Impulsamos tu Negocio en el",
    titleHighlight: "Mundo Digital",
    subtitle:       "Soluciones tecnológicas innovadoras que impulsan el crecimiento de tu negocio.",

    cta: {
      primary:   { text: "¡Contactanos y Empezá Ya!", href: "#contact" },
      secondary: { text: "Ver Servicios", href: "#services" },
    },

    images: [
      "/images/hero/webdesign.jpg",
      "/images/hero/sistemas.jpg",
      "/images/hero/tecnico.jpg",
      "/images/hero/consultoria.jpg",
      "/images/hero/ventas2.jpg",
    ],
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    description: "Soluciones tecnológicas para empresas y emprendedores",
    copyright:   "MGA Informática 2026",

    social: {
      facebook:  "https://facebook.com/MGAInformatica.Gustavo",
      instagram: "https://instagram.com/mgainformatica.ok",
      linkedin:  null as string | null,
    },

    maps: {
      embedUrl: null as string | null,
      height:   "120px",
    },

    legal: {
      privacy: "/privacidad",
      terms:   "/terminos",
    },

    services: [
      { label: "Desarrollo Web", href: "/servicios/desarrollo-web" },
      { label: "Sistemas de Gestión", href: "/servicios/sistemas-gestion" },
      { label: "Soporte Técnico", href: "/servicios/soporte-tecnico" },
      { label: "Consultoría IT", href: "/servicios/consultoria-it" },
    ],

    nav: [
      { label: "Inicio",    href: "/" },
      { label: "Servicios", href: "#services" },
      { label: "Clientes",  href: "/clientes" },
      { label: "Proceso",   href: "#process" },
      { label: "Contacto",  href: "#contact" },
    ],
  },

  // ── CONTACTO ───────────────────────────────────────────────────────────────
  contact: {
    phone:     "+54 297 4036526",
    email:     "gustavo.mgainformatica@gmail.com",
    whatsapp:  "542974036526",
    address:   "Comodoro Rivadavia, Chubut",
  },

  // ── LOGO ───────────────────────────────────────────────────────────────────
  logo: {
    path:       "/images/logos/mga-logo.png",
    pathWhite:  null as string | null,
    width:  160,
    height:  40,
  },

  // ── AUTH ───────────────────────────────────────────────────────────────────
  auth: {
    logo: {
      width:  120,
      height:  32,
    },
    redirectAfterLogin:    "/dashboard",
    redirectAfterLogout:   "/auth/signin",
    redirectAfterRegister: "/auth/signin",
  },

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  dashboard: {
    sidebarWidth:        "240px",
    sidebarWidthCollapsed: "64px",
    headerHeight:        "60px",
  },

} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tipos exportados — útiles para tipar props de componentes
// ─────────────────────────────────────────────────────────────────────────────

export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
