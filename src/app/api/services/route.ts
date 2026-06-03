import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, icon, order } = body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        order: order || 0
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}
