import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "ALL";

    const guests = await prisma.guest.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { familyName: { contains: search } },
                  { email: { contains: search } },
                  { phone: { contains: search } },
                ],
              }
            : {},
        ],
      },
      include: {
        invitations: true,
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
      orderBy: { createdAt: "desc" },
    });

    let filtered = guests;
    if (status !== "ALL") {
      filtered = guests.filter((g) => {
        const inv = g.invitations[0];
        if (status === "RSVP_COMPLETED") return inv?.status === "RSVP_COMPLETED";
        if (status === "OPENED") return inv?.status === "OPENED";
        if (status === "SENT") return inv?.status === "SENT";
        if (status === "PENDING") return !inv || inv.status === "PENDING";
        return true;
      });
    }

    return NextResponse.json({ guests: filtered });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, familyName, guestLimit, customMessage, notes } = body;

    if (!name) {
      return NextResponse.json({ error: "Guest name is required" }, { status: 400 });
    }

    const guest = await prisma.guest.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        familyName: familyName || null,
        guestLimit: Number(guestLimit) || 2,
        notes: notes || null,
      },
    });

    // Generate unique, unguessable token
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 15);
    const randomHex = crypto.randomBytes(3).toString("hex");
    const token = `royal-${cleanName}-${randomHex}`;

    const invitation = await prisma.invitation.create({
      data: {
        guestId: guest.id,
        token,
        customMessage: customMessage || `Greetings ${name}, we cordially invite you and your family to celebrate our royal wedding.`,
        status: "SENT",
        sentAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, guest: { ...guest, invitations: [invitation] } });
  } catch (err: any) {
    console.error("Create guest error:", err);
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email, phone, familyName, guestLimit, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Guest ID is required" }, { status: 400 });
    }

    const updated = await prisma.guest.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        familyName,
        guestLimit: Number(guestLimit),
        notes,
      },
    });

    return NextResponse.json({ success: true, guest: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update guest" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { invitationId, action } = body;

    if (!invitationId) {
      return NextResponse.json({ error: "Invitation ID is required" }, { status: 400 });
    }

    if (action === "REGENERATE_TOKEN") {
      const randomHex = crypto.randomBytes(4).toString("hex");
      const newToken = `royal-${randomHex}`;

      const updated = await prisma.invitation.update({
        where: { id: invitationId },
        data: {
          token: newToken,
          status: "SENT",
          openedAt: null,
          rsvpAt: null,
        },
      });

      return NextResponse.json({ success: true, invitation: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update invitation" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Guest ID is required" }, { status: 400 });
    }

    await prisma.guest.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete guest" }, { status: 500 });
  }
}
