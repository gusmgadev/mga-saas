import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const contactEmailTo = process.env.CONTACT_EMAIL_TO;
    const contactEmailFrom = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY no está configurada" },
        { status: 500 }
      );
    }

    if (!contactEmailTo) {
      return NextResponse.json(
        { error: "CONTACT_EMAIL_TO no está configurada" },
        { status: 500 }
      );
    }

    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = escapeHtml(phone);
    const sanitizedMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from: contactEmailFrom,
      to: contactEmailTo,
      replyTo: email,
      subject: `Nueva consulta web - ${name}`,
      html: `
        <h2>Nueva consulta desde el formulario web</h2>
        <p><strong>Nombre:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Teléfono:</strong> ${sanitizedPhone || "-"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    if (error) {
      console.error("Error al enviar email con Resend:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el email" },
        { status: 502 }
      );
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
