import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/services/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { data: defaultRole } = await supabase
      .from("roles")
      .select("id")
      .eq("is_default", true)
      .single() as { data: { id: number } | null; error: unknown };

    if (!defaultRole) {
      return NextResponse.json(
        { error: "No se encontró un rol por defecto" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: process.env.NEXTAUTH_URL
          ? `${process.env.NEXTAUTH_URL}/dashboard`
          : undefined,
      },
    });

    if (error) {
      if (error.message.includes("already been registered")) {
        return NextResponse.json(
          { error: "Ya existe una cuenta con ese email" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Error al crear la cuenta" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error al procesar el registro" },
      { status: 500 }
    );
  }
}
