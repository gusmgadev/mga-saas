import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not configured");
}

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactEmailParams = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailParams) {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

  if (!to) {
    throw new Error("CONTACT_EMAIL_TO is not configured");
  }

  return resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nueva consulta web - ${name}`,
    html: `
      <h2>Nueva consulta desde el formulario web</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || "-"}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  });
}
