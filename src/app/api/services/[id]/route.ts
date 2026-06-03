import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({
      where: { id }
    });
    
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching service" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, description, icon, order } = body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        order
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Error updating service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.service.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting service" }, { status: 500 });
  }
}
