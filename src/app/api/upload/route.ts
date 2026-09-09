import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    
    // Support both single file and multiple files
    const allFiles = files.length > 0 ? files : (singleFile ? [singleFile] : []);

    if (allFiles.length === 0 || allFiles.length > 20) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    const fs = await import("fs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    for (const file of allFiles) {
      if (file.size === 0 || file.size > 10 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        return NextResponse.json({ error: "Solo se permiten imágenes JPG, PNG o WEBP de hasta 10MB" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Sanitize filename
      const ext = path.extname(file.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return NextResponse.json({ error: "Extensión de archivo inválida" }, { status: 400 });
      }
      const safeName = file.name
        .replace(ext, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .substring(0, 50);
      const filename = `${Date.now()}-${safeName}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      urls.push(`/uploads/${filename}`);
    }

    // Return single url for backwards compatibility, and urls array for multiple
    return NextResponse.json({ 
      url: urls[0], 
      urls 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
