import { NextResponse } from "next/server";
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
    .from("users")
    .select("id, email, name, role_id, roles!inner(id, name), created_at")
    .order("created_at", { ascending: false }) as {
      data: { id: string; email: string; name: string | null; role_id: number; roles: { id: number; name: string }; created_at: string }[] | null;
      error: unknown;
    };

  const users = data?.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role_id: u.role_id,
    role_name: u.roles.name,
    created_at: u.created_at,
  })) || [];

  return NextResponse.json(users);
}
