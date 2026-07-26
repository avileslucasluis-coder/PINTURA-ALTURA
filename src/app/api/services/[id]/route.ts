import { NextResponse } from "next/server";
import { servicesData } from "@/data/services";

export async function GET() {
  return NextResponse.json(servicesData);
}

// El panel de administración ya no crea servicios en runtime.
// Para agregar/editar/eliminar un servicio, edita src/data/services.ts
// directamente y haz git push.
export async function POST() {
  return NextResponse.json(
    { error: "Los servicios se administran editando src/data/services.ts" },
    { status: 405 }
  );
}