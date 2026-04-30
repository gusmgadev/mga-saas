import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const module = searchParams.get("module");

  if (!role || !module) {
    return NextResponse.json(
      { error: "Faltan parámetros: role y module" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("role_permissions")
    .select("can_view, can_create, can_edit, can_delete")
    .eq("role", role)
    .eq("module", module)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { can_view: false, can_create: false, can_edit: false, can_delete: false },
      { status: 200 }
    );
  }

  return NextResponse.json(data);
}
