import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está configurada");
  }
  return neon(process.env.DATABASE_URL);
}

export async function GET() {
  try {
    const sql = getDatabase();
    const reviews = await sql`
    SELECT id, name, content, rating, created_at
    FROM reviews
    WHERE status = 'approved'
    ORDER BY created_at DESC
  `;
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Servicio de reseñas no configurado" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sql = getDatabase();
    if (isRateLimited(`reviews:${getClientIp(req)}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const rating = body.rating;

    if (!name || !content || !rating) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    if (name.length > 100 || content.length > 1000) {
      return NextResponse.json({ error: "La reseña excede el largo permitido" }, { status: 400 });
    }

    if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Calificación inválida" }, { status: 400 });
    }

    const [review] = await sql`
      INSERT INTO reviews (name, content, rating, status)
      VALUES (${name}, ${content}, ${rating}, 'pending')
      RETURNING id
    `;

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al enviar la reseña" }, { status: 500 });
  }
}