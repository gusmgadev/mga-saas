"use client";

import { SERVICES, BRAND, SECTION_COLORS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Globe, Briefcase, Wrench, BarChart3 } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Globe: Globe,
  Briefcase: Briefcase,
  Wrench: Wrench,
  BarChart3: BarChart3,
};

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="services"
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: SECTION_COLORS.services.bg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Soluciones tecnológicas integrales diseñadas para impulsar tu negocio
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Link key={service.id} href={`/servicios/${service.slug}`}>
              <motion.div
                className="flex flex-col cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Imagen con título encima */}
                <div className="relative rounded-xl overflow-hidden shadow-md" style={{ height: "260px" }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url('${service.cardImage}')` }}
                  />
                  {/* Degradado oscuro en la parte inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Ícono + Título encima de la imagen */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                    {Icon && (
                      <Icon
                        size={36}
                        color="white"
                        strokeWidth={1.5}
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                        className="mb-2"
                      />
                    )}
                    <h3
                      className="text-2xl font-bold text-white leading-tight"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)" }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Descripción debajo */}
                <p className="text-gray-500 text-center text-sm leading-relaxed mt-4 px-2">
                  {service.description}
                </p>
              </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
