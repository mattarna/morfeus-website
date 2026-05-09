import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const filePath = path.join(
  process.cwd(),
  "src",
  "funnels",
  "playbook-2026-05",
  "download",
  "playbook-infobusiness-milionario.zip"
);

export async function GET() {
  const unlocked = cookies().get("mf_playbook_download")?.value === "1";
  if (!unlocked) {
    return NextResponse.json({ success: false, error: "download_locked" }, { status: 403 });
  }

  const file = fs.readFileSync(filePath);
  return new NextResponse(file, {
    headers: {
      "content-type": "application/zip",
      "content-disposition": 'attachment; filename="playbook-infobusiness-milionario.zip"',
      "cache-control": "private, no-store",
    },
  });
}
