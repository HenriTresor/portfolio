import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  // Resolve the file in the project root
  const filePath = join(process.cwd(), "Henri_Tresor_Updated_CV.pdf");
  const data = await readFile(filePath);
  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Henri_Tresor_Updated_CV.pdf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}


