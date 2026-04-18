"use client";

import { BRAND, SECTION_COLORS } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Reemplazá estos datos con los clientes reales
// Para agregar un logo: guardá el archivo en public/images/clientes/ y agregá logo: "/images/clientes/nombre.png"
const CLIENTS = [
  { id: 1,  initials: "TS", color: "#b0b60d", name: "TECNOSUR HIDROGRUAS",    rubro: "Taller reparacion", ubicacion: "Rada Tilly - Chubut",    logo: "/images/clientes/tecnosur.jpg" },
  { id: 2, initials: "CA", color: "#23292d", name: "ksk",     rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 3,  initials: "MS", color: "#ebab9b", name: "FRANCA TIENDA DE MAR",   rubro: "Regaleria",         ubicacion: "Puerto Piramides - Chubut",    logo: "/images/clientes/franca.jpg" },
  { id: 4,  initials: "DN", color: "#e79d26", name: "CURTO Propiedades",       rubro: "Inmobiliaria",      ubicacion: "Rada Tilly - Chubut",    logo: "/images/clientes/curto.png" },
  { id: 5, initials: "CA", color: "#ea4040", name: "Cheeky",     rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 6,  initials: "RC", color: "#b51d0c", name: "Tiziana Deco",            rubro: "Mueblería",         ubicacion: "Comodoro Rivadavia - Chubut",    logo: "/images/clientes/tiziana.jpg" },
  { id: 7, initials: "CA", color: "#7fa8e0", name: "Hans Sachs",     rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 8,  initials: "CS", color: "#73be4a", name: "Lent-Sur",                rubro: "Optica",            ubicacion: "Comodoro Rivadavia - Chubut",    logo: "/images/clientes/lentsur.jpg" },
  { id: 9,  initials: "AP", color: "#09984e", name: "Ciudad Inmobiliaria",     rubro: "Inmobiliaria",      ubicacion: "Rada Tilly - Chubut",    logo: "/images/clientes/ciudad.jpg" },
  { id: 10,  initials: "FP", color: "#1b0769", name: "Grandada",  rubro: "Indumentaria",        ubicacion: "Rada Tilly - Chubut",    logo: "/images/clientes/granada.jpg" },
  { id: 11,  initials: "IV", color: "#712a10", name: "Musters", rubro: "Vinoteca",      ubicacion: "Rada Tilly - Chubut",    logo: "/images/clientes/musters.jpg" },
  { id: 12,  initials: "EC", color: "#41c447", name: "Tienda Goy",  rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",    logo: "" },
  { id: 13, initials: "AC", color: "#e08e2a", name: "IRP Import Racing",           rubro: "Repuestos Automotor",      ubicacion: "CABA - Bs As",    logo: "" },
  { id: 14, initials: "JA", color: "#ce241b", name: "Pulgarcito",           rubro: "Indumentaria",           ubicacion: "Comodoro Rivadavia - Chubut",    logo: "" },
  { id: 15, initials: "PC", color: "#9e1b1b", name: "New Wine",       rubro: "Vinoteca",          ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 16, initials: "SZ", color: "#2a9d8f", name: "Lompas",      rubro: "Indumentaria",         ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 17, initials: "LE", color: "#a01010", name: "Optica Rada Tilly",       rubro: "Optica",         ubicacion: "Rada Tilly - Chubut",             logo: "" },
  { id: 18, initials: "CA", color: "#457b9d", name: "Sport Hits",     rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 19, initials: "CA", color: "#b748c6", name: "Clasica y moderna",     rubro: "Indumentaria",      ubicacion: "Comodoro Rivadavia - Chubut",             logo: "" },
  { id: 20, initials: "CA", color: "#121264", name: "Todo Luz",     rubro: "Elecricidad",      ubicacion: "Rada Tilly - Chubut",             logo: "" },
  { id: 20, initials: "CA", color: "#121264", name: "Carlos Coetsee",     rubro: "Productor Seguros",      ubicacion: "Rada Tilly - Chubut",             logo: "" },
  { id: 21, initials: "CA", color: "#2f2fbf", name: "Iveco",     rubro: "Venta Camiones",      ubicacion: "Rada Tilly - Chubut",             logo: "" },
];

function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  return (
    <div className="flex items-center gap-3 px-8 shrink-0">
      {client.logo ? (
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-sm bg-gray-100">
          <Image src={client.logo} alt={client.name} width={64} height={64} className="object-contain w-full h-full" />
        </div>
      ) : (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm select-none"
          style={{ backgroundColor: client.color }}
        >
          {client.initials}
        </div>
      )}
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gray-800">{client.name}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-sm text-gray-500">{client.rubro}</span>
        </div>
        <span className="text-sm text-gray-400">{client.ubicacion}</span>
      </div>
      <span className="ml-8 text-gray-200 text-lg select-none">|</span>
    </div>
  );
}

export function Testimonials() {
  const r1 = CLIENTS.slice(0, 7);
  const r2 = CLIENTS.slice(7, 14);
  const r3 = CLIENTS.slice(14, 21);
  const row1 = [...r1, ...r1];
  const row2 = [...[...r2].reverse(), ...[...r2].reverse()];
  const row3 = [...r3, ...r3];

  return (
    <section
      id="clientes"
      className="py-12 overflow-hidden scroll-mt-20"
      style={{ background: SECTION_COLORS.testimonials.bg }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: BRAND.colors.primary }}>
            Clientes
          </h2>
          <p className="text-gray-500 text-base">Empresas que confían en MGA Informática</p>
        </motion.div>
      </div>

      {/* Fila 1 — izquierda */}
      <div className="relative w-full mb-4">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 60%, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 60%, transparent)" }} />
        <div className="ticker-track">
          {row1.map((client, idx) => <ClientCard key={idx} client={client} />)}
        </div>
      </div>

      {/* Fila 2 — derecha */}
      <div className="relative w-full mb-4">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 60%, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 60%, transparent)" }} />
        <div className="ticker-track-reverse">
          {row2.map((client, idx) => <ClientCard key={idx} client={client} />)}
        </div>
      </div>

      {/* Fila 3 — izquierda */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 60%, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 60%, transparent)" }} />
        <div className="ticker-track">
          {row3.map((client, idx) => <ClientCard key={idx} client={client} />)}
        </div>
      </div>

      {/* Link a página de clientes */}
      <div className="text-center mt-8">
        <Link
          href="/clientes"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: BRAND.colors.primary }}
          onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.colors.secondary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = BRAND.colors.primary)}
        >
          Ver listado de clientes
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

    </section>
  );
}
