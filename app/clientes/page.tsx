"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BRAND } from "@/lib/constants";
import { CLIENTS } from "@/lib/clients";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header con imagen desenfocada */}
      <div className="relative py-20 px-4 text-white text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/images/hero/clientes.jpg')", filter: "blur(6px)" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Users size={40} color="white" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Algunos de nuestros clientes
          </h1>
          <p className="text-xl text-white/90">Empresas que confían en MGA Informática</p>
        </div>
      </div>

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {CLIENTS.map((client) => (
              <motion.div
                key={client.id}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white cursor-default"
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.10)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Logo */}
                {client.logo ? (
                  <motion.div
                    className="w-20 h-20 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm select-none"
                    style={{ backgroundColor: client.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {client.initials}
                  </motion.div>
                )}

                {/* Info */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{client.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{client.rubro}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{client.ubicacion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
