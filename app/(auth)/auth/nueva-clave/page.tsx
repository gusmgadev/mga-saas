"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { theme } from "@/lib/theme";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),
    confirmPassword: z.string().min(1, "Confirmá tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: "", color: theme.colors.border };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Débil", color: theme.colors.error };
  if (score <= 2) return { level: 2, label: "Media", color: theme.colors.warning };
  return { level: 3, label: "Fuerte", color: theme.colors.success };
}

type PageState = "loading" | "form" | "success" | "error";

export default function NuevaClavePage() {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setPageState("form");
      } else {
        setPageState("error");
      }
    };
    checkSession();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: data.password });
    setLoading(false);

    if (error) {
      return;
    }

    await supabase.auth.signOut();
    setPageState("success");
  };

  const strength = getPasswordStrength(password);

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

  if (pageState === "error") {
    return (
      <div className="text-center">
        <XCircle size={48} className="mx-auto mb-4" style={{ color: theme.colors.error }} />
        <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
          Link inválido o expirado
        </h1>
        <p className="text-sm mt-2 mb-6" style={{ color: theme.colors.textMuted }}>
          Pedí un nuevo link de recuperación.
        </p>
        <a
          href="/auth/reset"
          className="w-full py-2.5 rounded-md font-semibold text-white text-center block transition hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Volver a recuperar contraseña
        </a>
      </div>
    );
  }

  if (pageState === "success") {
    return (
      <div className="text-center">
        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: theme.colors.success }} />
        <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
          ¡Contraseña actualizada!
        </h1>
        <a
          href="/auth/signin"
          className="w-full py-2.5 rounded-md font-semibold text-white text-center block mt-6 transition hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Ir al login
        </a>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center" style={{ color: theme.colors.text }}>
        Nueva contraseña
      </h1>
      <p className="text-center text-sm mt-1 mb-6" style={{ color: theme.colors.textMuted }}>
        Ingresá tu nueva contraseña
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.colors.text }}>
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: errors.password ? theme.colors.error : theme.colors.border,
              }}
              placeholder="Mínimo 8 caracteres"
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
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: i <= strength.level ? strength.color : theme.colors.border,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: strength.color }}>
                {strength.label}
              </p>
            </div>
          )}
        </div>

        {/* Confirmar */}
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.colors.text }}>
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: errors.confirmPassword ? theme.colors.error : theme.colors.border,
              }}
              placeholder="Repetir contraseña"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
              {errors.confirmPassword.message}
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
              Actualizando...
            </>
          ) : (
            "Actualizar contraseña"
          )}
        </button>
      </form>
    </>
  );
}
