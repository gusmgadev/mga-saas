"use client";

import { BRAND, SECTION_COLORS } from "@/lib/constants";
import { motion } from "framer-motion";

export function ServicesBanner() {
  const services = [
    "Sistema Gestión",
    "Diseño Web",
    "Tiendas Online",
    "E-Commerce",
    "Empresas",
    "Emprendedores",
    "Pymes",
    "Servicio Técnico",
  ];

  const repeatedServices = [...services, ...services];

  return (
    <section
      className="relative py-3 overflow-hidden"
      style={{
        background: SECTION_COLORS.servicesBanner.bg,
      }}
    >
      {/* Scrolling Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {repeatedServices.map((service, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 text-sm sm:text-base font-semibold text-white flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: BRAND.colors.light,
                  boxShadow: `0 0 12px ${BRAND.colors.light}99`,
                }}
              />
              <span
                style={{
                  textShadow: `0 0 8px ${BRAND.colors.light}66`,
                }}
              >
                {service}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}