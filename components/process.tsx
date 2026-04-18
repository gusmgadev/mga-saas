"use client";

import { motion } from "framer-motion";
import { BRAND, SECTION_COLORS } from "@/lib/constants";
import { MessageSquare, FileText, Zap, Rocket, TrendingUp } from "lucide-react";

export function Process() {
  const steps = [
    {
      number: 1,
      title: "Consulta",
      description: "Entendemos tu negocio",
      Icon: MessageSquare,
    },
    {
      number: 2,
      title: "Propuesta",
      description: "Solución personalizada",
      Icon: FileText,
    },
    {
      number: 3,
      title: "Desarrollo",
      description: "Construimos con calidad",
      Icon: Zap,
    },
    {
      number: 4,
      title: "Lanzamiento",
      description: "Entrega y capacitación",
      Icon: Rocket,
    },
    {
      number: 5,
      title: "Seguimiento",
      description: "Soporte continuo",
      Icon: TrendingUp,
    },
  ];

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: SECTION_COLORS.process.bg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl font-bold mb-2"
            style={{
              background: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nuestro Proceso
          </h2>
          <p className="text-gray-600">5 pasos simples hacia el éxito</p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-8 left-0 right-0 h-1 hidden lg:block"
            style={{
              background: `linear-gradient(90deg, ${BRAND.colors.light}, ${BRAND.colors.secondary})`,
            }}
          />

          {/* Steps Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Number Circle */}
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className="bg-gray-50 rounded-lg p-4 flex-1 w-full"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex justify-center mb-2">
                      <step.Icon size={28} color={BRAND.colors.primary} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
