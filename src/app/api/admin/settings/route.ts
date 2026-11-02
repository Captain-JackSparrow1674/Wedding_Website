import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.weddingSettings.findFirst();
    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      brideName,
      groomName,
      brideParents,
      groomParents,
      weddingDate,
      weddingCity,
      heroTagline,
      musicUrl,
    } = body;

    const updated = await prisma.weddingSettings.upsert({
      where: { id: "settings-1" },
      update: {
        brideName,
        groomName,
        brideParents,
        groomParents,
        weddingDate: weddingDate ? new Date(weddingDate) : undefined,
        weddingCity,
        heroTagline,
        musicUrl,
      },
      create: {
        id: "settings-1",
        brideName: brideName || "Radhika",
        groomName: groomName || "Devansh",
        brideParents: brideParents || "Smt. Sunita & Shri Vikramaditya Singhania",
        groomParents: groomParents || "Smt. Rajeshwari & Shri Mahendra Pratap Rathore",
        weddingDate: weddingDate ? new Date(weddingDate) : new Date("2026-12-18T18:00:00Z"),
        weddingCity: weddingCity || "Udaipur, Rajasthan",
        heroTagline: heroTagline || "Together with our families, we invite you to celebrate our royal union",
        musicUrl: musicUrl || "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b939db20.mp3?filename=indian-flute-and-sitar-ambient-110825.mp3",
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    console.error("Settings update error:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

