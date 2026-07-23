import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const reviews = await sql`
    SELECT id, name, content, rating, created_at
    FROM reviews
    WHERE status = 'approved'
    ORDER BY created_at DESC
  `;
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, content, rating } = body;

    if (!name || !content || !rating) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
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