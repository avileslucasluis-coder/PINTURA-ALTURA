import { NextRequest, NextResponse } from "next/server";
import { servicesData } from "@/data/services";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }

  return NextResponse.json(service);
}

// Editar y eliminar servicios ya no se hace en runtime.
// Para modificar un servicio, edita src/data/services.ts directamente y haz git push.
export async function PUT() {
  return NextResponse.json(
    { error: "Los servicios se administran editando src/data/services.ts" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Los servicios se administran editando src/data/services.ts" },
    { status: 405 }
  );
}