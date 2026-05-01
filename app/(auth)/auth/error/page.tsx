"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { theme } from "@/lib/theme";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "unknown";

  const errorMessages: Record<string, string> = {
    unknown: "Ocurrió un error desconocido",
    invalid_credentials: "Email o contraseña inválidos",
    user_not_found: "Usuario no encontrado",
    access_denied: "Acceso denegado",
  };

  return (
    <div className="text-center">
      <AlertCircle size={48} className="mx-auto mb-4" style={{ color: theme.colors.error }} />
      <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
        Error de Autenticación
      </h1>
      <p className="text-sm mt-2 mb-6" style={{ color: theme.colors.textMuted }}>
        {errorMessages[error] || errorMessages.unknown}
      </p>
      <div className="flex gap-3">
        <Link
          href="/auth/signin"
          className="flex-1 py-2.5 rounded-md font-semibold text-white text-center transition hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Intentar de nuevo
        </Link>
        <Link
          href="/"
          className="flex-1 py-2.5 rounded-md font-semibold text-center border transition hover:opacity-80"
          style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm" style={{ color: theme.colors.textMuted }}>Cargando...</p>}>
      <AuthErrorContent />
    </Suspense>
  );
}
