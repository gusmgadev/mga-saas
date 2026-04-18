# MGA Informática - SaaS Multi-Tenant

Plataforma SaaS multi-tenant para MGA Informática. Landing page + Sistema interno + E-commerce.

## 🚀 Quick Start

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

Edita `.env.local` con tus credenciales:
- **Supabase**: Sigue [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **NextAuth Secret**: Ya configurado
- **Resend API Key**: https://resend.com
- **Email y WhatsApp**: Ya configurados

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
mga-saas/
├── app/                    # Next.js App Router
│   ├── auth/              # Autenticación (signin, error)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home (landing)
├── components/            # Componentes React
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── why-us.tsx
│   ├── contact-form.tsx
│   └── footer.tsx
├── lib/                   # Utilidades
│   ├── supabase.ts
│   ├── constants.ts
│   └── database.types.ts
├── tailwind.config.ts     # Tailwind config
└── .env.local             # Variables de entorno
```

## 🎨 Colores (MGA Branding)

- **Primario**: #2E5C8A (Azul Marino)
- **Secundario**: #6BA3D0 (Azul Claro)
- **Gradiente**: #A8D0E8

## 📞 Contacto

**Email:** gustavo.mgainformatica@gmail.com  
**WhatsApp:** +542974036526

---

MGA Informática © 2026
