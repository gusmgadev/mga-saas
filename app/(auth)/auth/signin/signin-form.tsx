"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { theme } from "@/lib/theme";

const schema = z.object({
  email: z.string().min(1, "El email es requerido").email("Ingresá un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function SignInForm({
  showRegistered,
  showAccessDenied,
}: {
  showRegistered?: boolean;
  showAccessDenied?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setGeneralError("");
    setLoading(true);

    const callbackUrl = searchParams.get("callbackUrl") || theme.auth.redirectAfterLogin;
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setGeneralError("Email o contraseña inválidos.");
      return;
    }

    router.push(result?.url || callbackUrl);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-center" style={{ color: theme.colors.text }}>
        Iniciar sesión
      </h1>
      <p className="text-center text-sm mt-1 mb-6" style={{ color: theme.colors.textMuted }}>
        Ingresá con tu cuenta
      </p>

      {showRegistered && (
        <p
          className="mb-4 rounded-lg border p-3 text-sm"
          style={{
            backgroundColor: "rgba(29,158,117,0.08)",
            borderColor: theme.colors.success,
            color: theme.colors.success,
          }}
        >
          Cuenta creada correctamente. Ingresá con tu email y contraseña.
        </p>
      )}

      {showAccessDenied && (
        <p
          className="mb-4 rounded-lg border p-3 text-sm"
          style={{
            backgroundColor: "rgba(239,159,39,0.08)",
            borderColor: theme.colors.warning,
            color: theme.colors.warning,
          }}
        >
          No tenés permisos para acceder a esa sección.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.colors.text }}>
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: errors.password ? theme.colors.error : theme.colors.border,
              }}
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Error general */}
        {generalError && (
          <div
            className="flex items-center gap-2 rounded-lg border p-3 text-sm"
            style={{
              backgroundColor: "rgba(226,75,74,0.08)",
              borderColor: theme.colors.error,
              color: theme.colors.error,
            }}
          >
            <AlertCircle size={16} />
            <span>{generalError}</span>
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 font-semibold text-white disabled:opacity-60 flex items-center justify-center gap-2 hover:brightness-95"
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radii.sm,
            transition: theme.transitions.fast,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      {/* Links */}
      <div className="mt-5 space-y-3 text-center">
        <Link
          href="/auth/reset"
          className="text-sm block hover:underline"
          style={{ color: theme.colors.primary }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <p className="text-sm" style={{ color: theme.colors.textMuted }}>
          ¿No tenés cuenta?{" "}
          <Link href="/auth/registro" className="font-semibold hover:underline" style={{ color: theme.colors.primary }}>
            Registrate
          </Link>
        </p>
      </div>
    </>
  );
}
