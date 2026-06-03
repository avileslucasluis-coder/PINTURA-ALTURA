import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Add images to a project
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const data = await req.json();
    
    // data.images is an array of { url, alt?, order? }
    const images = data.images || [];
    
    const createdImages = await Promise.all(
      images.map((img: { url: string; alt?: string; order?: number }, index: number) =>
        prisma.projectImage.create({
          data: {
            url: img.url,
            alt: img.alt || "",
            order: img.order ?? index,
            projectId: id,
          }
        })
      )
    );

    // Update the main imageUrl if this is the first image and project has no main image
    if (createdImages.length > 0) {
      const project = await prisma.project.findUnique({ where: { id } });
      if (project && !project.imageUrl) {
        await prisma.project.update({
          where: { id },
          data: { imageUrl: createdImages[0].url }
        });
      }
    }

    return NextResponse.json(createdImages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add images" }, { status: 500 });
  }
}

// Delete an image from a project
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { imageId } = await req.json();
    
    await prisma.projectImage.delete({
      where: { id: imageId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
