"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { theme } from "@/lib/theme";

const schema = z.object({
  email: z.string().min(1, "El email es requerido").email("Ingresá un email válido"),
});

type FormData = z.infer<typeof schema>;

export default function ResetPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/nueva-clave`,
    });

    // Always show success, even if email doesn't exist
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <>
        <div className="text-center">
          <Mail size={48} className="mx-auto mb-4" style={{ color: theme.colors.primary }} />
          <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
            ¡Email enviado!
          </h1>
          <p className="text-sm mt-2 mb-1" style={{ color: theme.colors.textMuted }}>
            Si el email existe en el sistema, vas a recibir un link en los próximos minutos.
          </p>
          <p className="text-xs mb-6" style={{ color: theme.colors.textMuted }}>
            Revisá también tu carpeta de spam.
          </p>
          <Link
            href="/auth/signin"
            className="w-full py-2.5 rounded-md font-semibold text-white text-center block transition hover:opacity-90"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Volver al login
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center" style={{ color: theme.colors.text }}>
        Recuperar contraseña
      </h1>
      <p className="text-center text-sm mt-1 mb-6" style={{ color: theme.colors.textMuted }}>
        Ingresá tu email y te enviamos un link para restablecer tu clave
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.colors.text }}>
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: errors.email ? theme.colors.error : theme.colors.border,
            }}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md font-semibold text-white transition disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ backgroundColor: theme.colors.primary }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar link de recuperación"
          )}
        </button>
      </form>

      <p className="text-center text-sm mt-5" style={{ color: theme.colors.textMuted }}>
        <Link href="/auth/signin" className="hover:underline" style={{ color: theme.colors.primary }}>
          ← Volver al login
        </Link>
      </p>
    </>
  );
}
