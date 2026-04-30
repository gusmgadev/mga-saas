"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al crear la cuenta");
        setLoading(false);
        return;
      }

      router.push("/auth/signin?registered=true");
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.light} 100%)`,
        }}
      />

      <div className="w-full max-w-md relative z-10">
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

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: BRAND.colors.primary }}>
            Crear cuenta
          </h2>

          {error && (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BA3D0]"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BA3D0]"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BA3D0]"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: BRAND.colors.primary }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BA3D0]"
                placeholder="Repetir contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded font-semibold text-white transition hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link href="/auth/signin" className="underline" style={{ color: BRAND.colors.primary }}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
