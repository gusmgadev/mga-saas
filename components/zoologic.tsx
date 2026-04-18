"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND, SECTION_COLORS } from "@/lib/constants";
import { Package2 } from "lucide-react";

export function ZooLogic() {
  const products = [
    {
      name: "Dragonfish",
      category: "Color y Talle · Pymes",
      description: "Dragonfish Color y Talle - Pymes es el software completo, sencillo y adaptable a las necesidades de tu negocio o empresa que te permite realizar y dar seguimiento muy fácilmente a todas las actividades de tu local, para que potencies las fortalezas de tu negocio y puedas crecer. Integraciones con Mercado Libre, Tienda Nube y WooCommerce.",
      description2: "",
      features: [],
      logoPath: "/images/logos/dragonfish-logo.png",
      color: "#0079FF",
    },
    {
      name: "Lince",
      category: "Indumentaria",
      description: "Lince Indumentaria es el sistema más elegido por la industria de la indumentaria con más de 25 años en el mercado, que te permite gestionar todas las instancias de tu operatoria comercial. Gestión de venta minorista, mayorista, compras, toma de inventario, tarjetas de crédito y gestión de producción.",
      description2: "",
      features: [],
      logoPath: "/images/logos/lince-logo.png",
      color: "#FF4500",
    },
    {
      name: "Pantera",
      category: "Comercios",
      description: "Pantera Comercios es un sistema de gestión 100% web con el que podrás controlar el stock, emitir facturas, registrar la caja, facturar las ventas de Mercado Libre y obtener informes integrales de gestión. Vas a poder administrar todo tu negocio, de manera fácil, intuitiva y a muy bajo costo.",
      description2: "Software de gestión líder del mercado.",
      features: [],
      logoPath: "/images/logos/pantera-logo.png",
      color: "#9D00FF",
    },
  ];

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: SECTION_COLORS.zoologic.bg }}
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
<div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logos/zoologic.png"
              alt="Zoologic"
              width={360}
              height={120}
              className="h-32 w-auto object-contain"
            />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Somos Agentes comerciales certificados. Expertos en sistemas de Gestión para Puntos de Venta para emprendedores, pymes y grandes empresas
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 border-2 h-full hover:shadow-xl transition flex flex-col"
                style={{ borderColor: product.color }}
                whileHover={{ y: -5 }}
              >
                {/* Logo */}
                <div className="h-32 mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <Image
                    src={product.logoPath}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="h-28 w-auto object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: product.color }}
                >
                  {product.category}
                </p>
                <div className="flex-grow">
                  <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                  {product.features.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: product.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.description2 && (
                    <p className="text-gray-500 leading-relaxed text-sm mt-3 italic">{product.description2}</p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-6 flex justify-center">
                  <motion.button
                    className="px-6 py-2 rounded-lg font-semibold text-white text-sm transition"
                    style={{ backgroundColor: product.color }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Conocer más
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">¿Necesitas una solución personalizada para tu negocio?</p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 rounded-lg font-bold text-white transition"
            style={{
              background: `linear-gradient(135deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicita una demostración
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
