import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestros Clientes | MGA Informática",
  description: "Conocé las empresas y comercios de Comodoro Rivadavia, Rada Tilly y toda la Patagonia que confían en MGA Informática para sus soluciones tecnológicas.",
  openGraph: {
    title: "Clientes de MGA Informática",
    description: "Empresas y comercios de Comodoro Rivadavia y Chubut que confían en MGA Informática.",
    url: "https://mgainformatica.com.ar/clientes",
  },
};

export default function ClientesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
