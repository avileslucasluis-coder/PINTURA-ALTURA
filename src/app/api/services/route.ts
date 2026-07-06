import { NextRequest, NextResponse } from "next/server";
import { createService, getServices } from "@/lib/service-store";

export async function GET() {
  return NextResponse.json(getServices());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, icon, order } = body;

    const service = createService({
      title,
      description,
      icon: typeof icon === "string" ? icon : null,
      order: typeof order === "number" ? order : 0
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}
