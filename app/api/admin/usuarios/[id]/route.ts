import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

const VALID_ROLES = ["administrador", "usuario"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const { id } = await params;

  if (session.user.id === id) {
    return NextResponse.json(
      { error: "No puedes cambiar tu propio rol" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const role = body?.role;

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json(
      { error: "Rol inválido. Debe ser 'administrador' o 'usuario'" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .single();

  if (fetchError || !user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: updateError } = await (supabase as any)
    .from("users")
    .update({ role })
    .eq("id", id);

  if (updateError) {
    console.error("Error al cambiar rol:", updateError);
    return NextResponse.json(
      { error: "Error al actualizar el rol" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, newRole: role });
}
