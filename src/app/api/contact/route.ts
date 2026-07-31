import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB por archivo
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const website = formData.get("website")?.toString() || "";
    const formLoadedAt = formData.get("formLoadedAt")?.toString() || "";

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Anti-bot por tiempo
    if (formLoadedAt) {
      const elapsed = Date.now() - Number(formLoadedAt);
      if (elapsed < 3000) {
        return NextResponse.json({ error: "Envío demasiado rápido" }, { status: 400 });
      }
    }

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    if (name.length > 100 || phone.length > 20 || message.length > 2000 || (email && email.length > 100)) {
      return NextResponse.json({ error: "Uno o más campos exceden el largo permitido" }, { status: 400 });
    }

    if (!/^[0-9+\-\s()]+$/.test(phone)) {
      return NextResponse.json({ error: "Formato de teléfono inválido" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Formato de correo inválido" }, { status: 400 });
    }

    // Procesar archivos adjuntos
    const files = formData.getAll("photos") as File[];

    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Máximo ${MAX_FILES} fotos permitidas` }, { status: 400 });
    }

    const attachments = [];
    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue;

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `Cada foto debe pesar menos de 5MB` }, { status: 400 });
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Solo se permiten imágenes (JPG, PNG, WEBP)" }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
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
        ${attachments.length > 0 ? `<p><strong>Fotos adjuntas:</strong> ${attachments.length}</p>` : ""}
      `,
      attachments,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }
}