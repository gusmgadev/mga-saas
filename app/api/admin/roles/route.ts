import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("roles")
    .select("id, name, description, is_default, created_at")
    .order("id", { ascending: true });

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const body = await request.json();
  const { name, description, is_default } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "El nombre del rol es obligatorio (mínimo 2 caracteres)" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("roles")
    .insert({ name: name.trim(), description: description || null, is_default: !!is_default })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ya existe un rol con ese nombre" },
        { status: 409 }
      );
    }
    console.error("Error al crear rol:", error);
    return NextResponse.json(
      { error: "Error al crear el rol" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
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
  const { id, name, description, is_default } = body;

  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { error: "ID de rol inválido" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name.trim();
  if (description !== undefined) updates.description = description || null;
  if (is_default !== undefined) updates.is_default = !!is_default;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No hay campos para actualizar" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("roles")
    .update(updates)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ya existe un rol con ese nombre" },
        { status: 409 }
      );
    }
    console.error("Error al actualizar rol:", error);
    return NextResponse.json(
      { error: "Error al actualizar el rol" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (session.user.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Falta parámetro: id" },
      { status: 400 }
    );
  }

  const roleId = parseInt(id, 10);

  const supabase = createSupabaseServerClient();

  const { data: adminRole } = await supabase
    .from("roles")
    .select("id")
    .eq("name", "Administrador")
    .single() as { data: { id: number } | null; error: unknown };

  if (adminRole && roleId === adminRole.id) {
    return NextResponse.json(
      { error: "No se puede eliminar el rol de Administrador" },
      { status: 403 }
    );
  }

  const { data: usersWithRole } = await supabase
    .from("users")
    .select("id")
    .eq("role_id", roleId)
    .limit(1);

  if (usersWithRole && usersWithRole.length > 0) {
    return NextResponse.json(
      { error: "No se puede eliminar un rol que tiene usuarios asignados" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("roles")
    .delete()
    .eq("id", roleId);

  if (error) {
    console.error("Error al eliminar rol:", error);
    return NextResponse.json(
      { error: "Error al eliminar el rol" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
