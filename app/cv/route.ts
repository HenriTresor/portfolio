import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Resolve the file in the project root
    const filePath = join(process.cwd(), "Henri_Tresor_Updated_CV.pdf");
    const data = await readFile(filePath);
    
    return new NextResponse(data as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Henri_Tresor_Updated_CV.pdf",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving CV:", error);
    return new NextResponse("CV not found", { status: 404 });
  }
}


