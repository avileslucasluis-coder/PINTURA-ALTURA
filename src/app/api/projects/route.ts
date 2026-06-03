import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");
    
    // Public endpoint: only show visible projects
    // Admin endpoint (?all=true): show all projects
    const session = await getServerSession(authOptions);
    const showAll = all === "true" && !!session;

    const projects = await prisma.project.findMany({
      where: showAll ? {} : { visible: true },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        location: data.location,
        date: data.date,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        visible: data.visible !== undefined ? data.visible : true,
        order: data.order || 0,
      },
      include: { images: true }
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
