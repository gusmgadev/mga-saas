"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { theme } from "@/lib/theme";

type PageState = "loading" | "success" | "error";

export default function VerificarPage() {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [countdown, setCountdown] = useState(3);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  useEffect(() => {
    const checkVerification = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email_confirmed_at) {
        setPageState("success");
      } else {
        setPageState("error");
      }
    };
    checkVerification();
  }, []);

  useEffect(() => {
    if (pageState !== "success") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/auth/signin";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pageState]);

  if (pageState === "loading") {
    return (
      <div className="text-center py-8">
        <Loader2 size={32} className="mx-auto animate-spin mb-4" style={{ color: theme.colors.primary }} />
        <p className="text-sm" style={{ color: theme.colors.textMuted }}>
          Verificando tu email...
        </p>
      </div>
    );
  }

  if (pageState === "success") {
    return (
      <div className="text-center">
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
        <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
          ¡Email verificado!
        </h1>
        <p className="text-sm mt-2 mb-6" style={{ color: theme.colors.textMuted }}>
          Tu cuenta está activa. Ya podés iniciar sesión.
        </p>
        <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>
          Redirigiendo en {countdown} segundos...
        </p>
        <Link
          href="/auth/signin"
          className="inline-block py-2.5 px-8 rounded-md font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Ir al login
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <XCircle size={48} className="mx-auto mb-4" style={{ color: theme.colors.error }} />
      <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
        No se pudo verificar el email
      </h1>
      <p className="text-sm mt-2 mb-6" style={{ color: theme.colors.textMuted }}>
        El link puede haber expirado o ya fue usado.
      </p>
      <Link
        href="/"
        className="inline-block py-2.5 px-8 rounded-md font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: theme.colors.primary }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
