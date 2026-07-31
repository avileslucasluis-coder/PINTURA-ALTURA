import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Escapa HTML para evitar inyección de código en el correo
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, website, formLoadedAt } = body;

    // Honeypot: campo invisible que solo un bot llenaría
    if (website) {
      // Responde como si todo hubiera ido bien, sin enviar nada (despista al bot)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Anti-bot por tiempo: si el formulario se envía en menos de 3 segundos, es sospechoso
    if (formLoadedAt) {
      const elapsed = Date.now() - Number(formLoadedAt);
      if (elapsed < 3000) {
        return NextResponse.json({ error: "Envío demasiado rápido" }, { status: 400 });
      }
    }

    // Validación de campos requeridos
    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // Límites de longitud
    if (name.length > 100 || phone.length > 20 || message.length > 2000 || (email && email.length > 100)) {
      return NextResponse.json({ error: "Uno o más campos exceden el largo permitido" }, { status: 400 });
    }

    // Validación básica de formato de teléfono (solo números, espacios, +, -)
    if (!/^[0-9+\-\s()]+$/.test(phone)) {
      return NextResponse.json({ error: "Formato de teléfono inválido" }, { status: 400 });
    }

    // Validación básica de email si viene
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Formato de correo inválido" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"TuPintor Luis - Web" <${process.env.SMTP_USER}>`,
      to: "ventas@tu-pintor.com",
      replyTo: email || undefined,
      subject: `Nueva solicitud de cotización - ${escapeHtml(name)}`,
      html: `
        <h2>Nueva solicitud de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Correo:</strong> ${email ? escapeHtml(email) : "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }
}