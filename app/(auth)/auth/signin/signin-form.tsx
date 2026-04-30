"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setAuthError("Email o contraseña inválidos.");
      return;
    }

    router.push(result?.url || callbackUrl);
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
            Acceso al Sistema
          </h2>

          {authError && (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {authError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded font-semibold text-white transition hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {loading ? "Accediendo..." : "Acceder"}
            </button>
          </form>

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
