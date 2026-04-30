import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/services/resend";
import { createSupabaseServerClient } from "@/lib/supabase";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = escapeHtml(phone);
    const sanitizedMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await sendContactEmail({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
    });

    if (error) {
      console.error("Error al enviar email con Resend:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el email" },
        { status: 502 }
      );
    }

    const supabase = createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dbError } = await (supabase as any).from("contacts").insert({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone || null,
      message: sanitizedMessage.replaceAll("<br />", "\n"),
      tenant_id: null,
    });

    if (dbError) {
      console.error("Error al guardar contacto en Supabase:", dbError);
    }

    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente" },
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
