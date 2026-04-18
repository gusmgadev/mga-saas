"use client";

import { BRAND, SECTION_COLORS } from "@/lib/constants";
import Image from "next/image";
import { ServicesBanner } from "@/components/services-banner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/images/hero/webdesign.jpg",
    "/images/hero/sistemas.jpg",
    "/images/hero/tecnico.jpg",
    "/images/hero/consultoria.jpg",
    "/images/hero/ventas2.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: SECTION_COLORS.hero.bg,
      }}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: BRAND.colors.primary }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: BRAND.colors.light }}
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
      <ServicesBanner />
      {/* Main Content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Impulsamos tu Negocio en el {" "}
                <motion.span
                  className="inline-block bg-gradient-to-r via-mga-primary to-mga-secondary bg-clip-text text-transparent font-black"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.light} 50%, ${BRAND.colors.secondary} 100%)`,
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Mundo Digital
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 mb-4 leading-relaxed font-semibold"
                variants={itemVariants}
              >
                {BRAND.tagline}
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Soluciones tecnológicas innovadoras que impulsan el crecimiento de tu negocio. Desde desarrollo web hasta gestión empresarial integral.
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <Link href="#contact">
                  <motion.span
                    className="relative inline-flex items-center justify-center px-9 py-3 rounded-full font-medium text-white text-base overflow-hidden cursor-pointer select-none"
                    style={{
                      background: "linear-gradient(135deg, #7ec8e3 0%, #5ba8c4 50%, #4a8faa 100%)",
                      boxShadow: "0 0 15px rgba(126,200,227,0.35), 0 3px 12px rgba(91,168,196,0.25)",
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126,200,227,0.55), 0 6px 20px rgba(91,168,196,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      boxShadow: [
                        "0 0 12px rgba(126,200,227,0.3), 0 3px 10px rgba(91,168,196,0.2)",
                        "0 0 22px rgba(126,200,227,0.5), 0 3px 18px rgba(91,168,196,0.35)",
                        "0 0 12px rgba(126,200,227,0.3), 0 3px 10px rgba(91,168,196,0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Brillo animado */}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)" }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    />
                    <span className="relative z-10">¡Contactanos y Empezá Ya!</span>
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visualization - Image Carousel */}
            <motion.div
              className="flex items-center justify-center relative"
              variants={itemVariants}
            >
              <motion.div
                className="w-4/5 aspect-square rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden relative mx-auto"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.colors.light} 0%, ${BRAND.colors.secondary} 100%)`,
                }}
              >
                <motion.div
                  className="absolute w-40 h-40 rounded-full blur-2xl opacity-50"
                  style={{
                    background: `linear-gradient(45deg, ${BRAND.colors.primary}, ${BRAND.colors.light})`,
                  }}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Image Carousel */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: idx === currentImage ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Image
                        src={img}
                        alt={`Tech ${idx + 1}`}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Services Banner al pie del Hero */}

    </section>
  );
}