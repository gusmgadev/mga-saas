import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // TODO: Enviar email con Resend
    console.log("Contact form received:", { name, email, message });

    // TODO: Guardar en Supabase
    // const supabase = createSupabaseServerClient();
    // const { data, error } = await supabase
    //   .from("contacts")
    //   .insert([{ name, email, message, tenant_id: DEFAULT_TENANT_ID }]);

    return NextResponse.json(
      { success: true, message: "Mensaje recibido correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form:", error);
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
