import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") || "usuario";

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("role_permissions")
    .select("role, module, can_view, can_create, can_edit, can_delete")
    .eq("role", role);

  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const body = await request.json();
  const { role, module, action, value } = body;

  if (!role || !module || !action) {
    return NextResponse.json(
      { error: "Faltan parámetros: role, module, action" },
      { status: 400 }
    );
  }

  if (role === "administrador") {
    return NextResponse.json(
      { error: "No se pueden modificar los permisos del administrador" },
      { status: 403 }
    );
  }

  const supabase = createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("role_permissions")
    .update({ [action]: value })
    .eq("role", role)
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
