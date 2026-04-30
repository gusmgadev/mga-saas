"use client";

import { BRAND, SECTION_COLORS } from "@/lib/constants";
import { CLIENTS } from "@/lib/clients";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
  const perRow = Math.ceil(CLIENTS.length / 3);
  const r1 = CLIENTS.slice(0, perRow);
  const r2 = CLIENTS.slice(perRow, perRow * 2);
  const r3 = CLIENTS.slice(perRow * 2);
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
