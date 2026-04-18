// MGA Branding & Colors
export const BRAND = {
  name: "MGA Informática",
  tagline: "Soluciones Tecnológicas",
  colors: {
    primary: "#2E5C8A", // Azul Marino
    secondary: "#6BA3D0", // Azul Claro
    light: "#A8D0E8", // Azul Gradiente
    dark: "#000000",
    lightBg: "#F5F5F5",
  },
};

// Contact Information
export const CONTACT = {
  email: "gustavo.mgainformatica@gmail.com",
  whatsapp: "+54 (297) 4036526",
};

// Services Offered - Using icon names (will use Lucide React)
export const SERVICES = [
  {
    id: "web",
    slug: "desarrollo-web",
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos, rápidos y escalables con las últimas tecnologías.",
    icon: "Globe",
    cardImage: "/images/hero/webdesign.jpg",
    fullDescription: "Diseñamos y desarrollamos sitios web y aplicaciones a medida utilizando tecnologías modernas como Next.js, React y Tailwind CSS. Desde landing pages hasta plataformas SaaS completas, construimos soluciones digitales que convierten visitantes en clientes.",
    features: ["Sitios web corporativos", "Tiendas online (E-Commerce)", "Aplicaciones web a medida", "Landing pages de alto impacto", "Optimización SEO", "Diseño responsive y mobile-first"],
  },
  {
    id: "stock",
    slug: "sistemas-gestion",
    title: "Sistemas de Gestión",
    description: "Soluciones completas de gestión de stock, ventas e inventario. Distribuidor certificado ZooLogic.",
    icon: "BarChart3",
    cardImage: "/images/hero/sistemas.jpg",
    fullDescription: "Como distribuidor certificado de ZooLogic, implementamos sistemas de gestión empresarial para puntos de venta, control de stock, facturación electrónica y más. Soluciones pensadas para pymes y emprendedores que quieren profesionalizar su negocio.",
    features: ["Sistema de punto de venta (POS)", "Control de stock e inventario", "Facturación electrónica AFIP", "Reportes y estadísticas", "Gestión de clientes y proveedores", "Integración con balanzas y lectores de código"],
  },
  {
    id: "support",
    slug: "soporte-tecnico",
    title: "Soporte Técnico",
    description: "Soporte especializado para mantener tus sistemas funcionando sin interrupciones.",
    icon: "Wrench",
    cardImage: "/images/hero/tecnico.jpg",
    fullDescription: "Brindamos soporte técnico presencial y remoto para mantener tu infraestructura tecnológica en óptimas condiciones. Diagnóstico, reparación, mantenimiento preventivo y asistencia continua para que tu negocio no se detenga.",
    features: ["Soporte remoto y presencial", "Mantenimiento preventivo de equipos", "Redes y conectividad", "Instalación y configuración de software", "Backup y recuperación de datos", "Atención prioritaria para clientes"],
  },
  {
    id: "consulting",
    slug: "consultoria-it",
    title: "Consultoría IT",
    description: "Asesoría estratégica en tecnología e infraestructura para tu negocio.",
    icon: "Briefcase",
    cardImage: "/images/hero/consultoria.jpg",
    fullDescription: "Te ayudamos a tomar las mejores decisiones tecnológicas para tu empresa. Analizamos tu situación actual, identificamos oportunidades de mejora y diseñamos una hoja de ruta digital adaptada a tus objetivos y presupuesto.",
    features: ["Diagnóstico tecnológico integral", "Planificación de infraestructura IT", "Selección de herramientas y software", "Transformación digital", "Seguridad informática", "Capacitación del equipo"],
  },
];

// Section Colors - Soft and subtle gradients
export const SECTION_COLORS = {
  hero: {
    bg: "#FFFFFF",
  },
  servicesBanner: {
    bg: "linear-gradient(135deg, #6BA3D0 0%, #2E5C8A 100%)",
  },
  services: {
    bg: "#FFFFFF",
  },
  zoologic: {
    bg: "#FFFFFF",
  },
  process: {
    bg: "#FFFFFF",
  },
  whyUs: {
    bg: "#FFFFFF",
  },
  testimonials: {
    bg: "#FFFFFF",
  },
  contact: {
    bg: "#FFFFFF",
  },
};

// Tenant Configuration
export const DEFAULT_TENANT_SLUG = "mga";

// API Routes
export const API_ROUTES = {
  AUTH: "/api/auth",
  CONTACT: "/api/contact",
  WEBHOOKS: "/api/webhooks",
};

// NextAuth Configuration
export const AUTH_CONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
};
