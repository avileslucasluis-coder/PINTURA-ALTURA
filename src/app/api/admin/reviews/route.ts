import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está configurada");
  }
  return neon(process.env.DATABASE_URL);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const sql = getDatabase();
    const reviews = await sql`
    SELECT id, name, content, rating, status, created_at
    FROM reviews
    ORDER BY created_at DESC
  `;
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Servicio de reseñas no configurado" }, { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const sql = getDatabase();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const [updated] = await sql`
      UPDATE reviews SET status = ${status} WHERE id = ${id} RETURNING id, status
    `;

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar la reseña" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const sql = getDatabase();
    const { id } = await req.json();
    await sql`DELETE FROM reviews WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar la reseña" }, { status: 500 });
  }
}