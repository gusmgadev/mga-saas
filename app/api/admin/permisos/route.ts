import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const roleId = searchParams.get("role_id");

  if (!roleId) {
    return NextResponse.json(
      { error: "Falta parámetro: role_id" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("role_permissions")
    .select("role_id, module, can_view, can_create, can_edit, can_delete")
    .eq("role_id", parseInt(roleId, 10));

  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const body = await request.json();
  const { role_id, module, action, value } = body;

  if (!role_id || !module || !action) {
    return NextResponse.json(
      { error: "Faltan parámetros: role_id, module, action" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  const { data: adminRole } = await supabase
    .from("roles")
    .select("id")
    .eq("name", "Administrador")
    .single() as { data: { id: number } | null; error: unknown };

  if (adminRole && role_id === adminRole.id) {
    return NextResponse.json(
      { error: "No se pueden modificar los permisos del administrador" },
      { status: 403 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("role_permissions")
    .update({ [action]: value })
    .eq("role_id", role_id)
    .eq("module", module);

  if (error) {
    console.error("Error al actualizar permiso:", error);
    return NextResponse.json(
      { error: "Error al actualizar el permiso" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
