import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        guest: {
          include: {
            rsvps: {
              include: {
                eventsAttending: {
                  include: {
                    weddingEvent: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Royal invitation not found or has expired." },
        { status: 404 }
      );
    }

    // Auto-track 'OPENED' status if not already completed
    if (invitation.status === "PENDING" || invitation.status === "SENT") {
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: "OPENED",
          openedAt: invitation.openedAt || new Date(),
        },
      });
      invitation.status = "OPENED";
    }

    const events = await prisma.weddingEvent.findMany({
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json({
      invitation,
      guest: invitation.guest,
      events,
    });
  } catch (err: any) {
    console.error("Invite token error:", err);
    return NextResponse.json({ error: "Failed to load invitation" }, { status: 500 });
  }
}
