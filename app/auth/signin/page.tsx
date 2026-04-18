"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement sign-in logic with NextAuth
    console.log("Sign in:", { email, password });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.light} 100%)`,
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded"
              style={{ backgroundColor: BRAND.colors.primary }}
            />
            <div className="text-xl font-bold" style={{ color: BRAND.colors.primary }}>
              {BRAND.name}
            </div>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: BRAND.colors.primary }}>
            Acceso al Sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="tu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Contraseña"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded font-semibold text-white transition hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {loading ? "Accediendo..." : "Acceder"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6">
            ¿No tienes cuenta? <Link href="/" className="underline" style={{ color: BRAND.colors.primary }}>
              Contacta con nosotros
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
