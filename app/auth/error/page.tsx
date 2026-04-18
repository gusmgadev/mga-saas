"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/lib/constants";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "unknown";

  const errorMessages: Record<string, string> = {
    unknown: "Ocurrió un error desconocido",
    invalid_credentials: "Email o contraseña inválidos",
    user_not_found: "Usuario no encontrado",
    access_denied: "Acceso denegado",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: BRAND.colors.primary }}>
              Error de Autenticación
            </h1>
            <p className="text-gray-600 mb-6">
              {errorMessages[error] || errorMessages.unknown}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/auth/signin"
              className="flex-1 py-2 rounded font-semibold text-white text-center transition hover:shadow-lg"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              Intentar de Nuevo
            </Link>
            <Link
              href="/"
              className="flex-1 py-2 rounded font-semibold text-center border-2 transition hover:bg-gray-50"
              style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
