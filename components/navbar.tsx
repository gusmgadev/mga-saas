"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND, SERVICES } from "@/lib/constants";


export function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logos/mga-logo.png"
              alt="MGA Informática"
              width={200}
              height={60}
              priority
              className="h-16 w-auto"
            />
          </Link>
          {/* Centro */}
          <div className="hidden md:flex flex-row items-center gap-4 flex-1 justify-center">
            <motion.span
              className="inline-block text-sm font-bold tracking-widest uppercase select-none bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #3d3d3d 0%, #7a746e 50%, #3d3d3d 100%)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Soluciones Tecnológicas
            </motion.span>
          </div>
          {/* Menu desktop */}
          <div className="hidden md:flex gap-8 items-center">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-medium transition-all duration-300 py-2 px-3 rounded"
                style={{ color: BRAND.colors.primary }}
              >
                Nuestros Servicios
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {SERVICES.map((service) => (
                    <Link key={service.slug} href={`/servicios/${service.slug}`} className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: BRAND.colors.secondary }} />
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a href="/#clientes" className="font-medium transition-all duration-300 py-2 px-3 rounded" style={{ color: BRAND.colors.primary }} onMouseEnter={(e) => e.currentTarget.style.color = BRAND.colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = BRAND.colors.primary}>Clientes</a>
            <a href="/#zoologic" className="font-medium transition-all duration-300 py-2 px-3 rounded" style={{ color: BRAND.colors.primary }} onMouseEnter={(e) => e.currentTarget.style.color = BRAND.colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = BRAND.colors.primary}>Zoologic</a>
            <a href="/#process" className="font-medium transition-all duration-300 py-2 px-3 rounded" style={{ color: BRAND.colors.primary }} onMouseEnter={(e) => e.currentTarget.style.color = BRAND.colors.secondary} onMouseLeave={(e) => e.currentTarget.style.color = BRAND.colors.primary}>Proceso</a>
            <a href="/#contact" className="font-normal transition-all duration-300 whitespace-nowrap" style={{ color: "#16a34a", fontFamily: "var(--font-poppins)" }} onMouseEnter={(e) => e.currentTarget.style.color = "#15803d"} onMouseLeave={(e) => e.currentTarget.style.color = "#16a34a"}>¡Contactanos y Empezá Ya!</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: BRAND.colors.primary }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {/* Servicios accordion */}
            <button
              className="flex items-center justify-between w-full py-3 px-2 text-left font-medium rounded-lg"
              style={{ color: BRAND.colors.primary }}
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Nuestros Servicios
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 flex flex-col gap-1 mb-1">
                {SERVICES.map((service) => (
                  <Link key={service.slug} href={`/servicios/${service.slug}`} onClick={closeMenu} className="py-2 px-2 text-sm text-gray-600 hover:text-blue-700 rounded-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: BRAND.colors.secondary }} />
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
            <a href="/#clientes" onClick={closeMenu} className="py-3 px-2 font-medium rounded-lg" style={{ color: BRAND.colors.primary }}>Clientes</a>
            <a href="/#zoologic" onClick={closeMenu} className="py-3 px-2 font-medium rounded-lg" style={{ color: BRAND.colors.primary }}>Zoologic</a>
            <a href="/#process" onClick={closeMenu} className="py-3 px-2 font-medium rounded-lg" style={{ color: BRAND.colors.primary }}>Proceso</a>
            <a href="/#contact" onClick={closeMenu} className="py-3 px-2 font-medium rounded-lg" style={{ color: "#16a34a" }}>¡Contactanos y Empezá Ya!</a>
          </div>
        </div>
      )}
    </nav>
  );
}
