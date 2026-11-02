import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      token,
      name,
      email,
      phone,
      attending,
      totalAttending,
      dietaryPreference,
      allergies,
      needsHotelStay,
      needsShuttle,
      songRequest,
      specialRequests,
      selectedEvents, // array of weddingEventId
    } = body;

    if (!name || attending === undefined) {
      return NextResponse.json(
        { error: "Name and attendance status are required." },
        { status: 400 }
      );
    }

    let guestId: string | null = null;
    let invitationId: string | null = null;

    // Check if token was provided
    if (token) {
      const invitation = await prisma.invitation.findUnique({
        where: { token },
        include: { guest: true },
      });

      if (invitation) {
        guestId = invitation.guestId;
        invitationId = invitation.id;

        // Update invitation status
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            status: "RSVP_COMPLETED",
            rsvpAt: new Date(),
          },
        });
      }
    }

    // If not found by token, look up guest by name/phone or create new guest
    if (!guestId) {
      const existing = await prisma.guest.findFirst({
        where: {
          OR: [
            ...(phone ? [{ phone }] : []),
            ...(email ? [{ email }] : []),
            { name },
          ],
        },
      });

      if (existing) {
        guestId = existing.id;
      } else {
        const newGuest = await prisma.guest.create({
          data: {
            name,
            email: email || null,
            phone: phone || null,
            guestLimit: Number(totalAttending) || 2,
          },
        });
        guestId = newGuest.id;
      }
    }

    // Create the RSVP record
    const rsvp = await prisma.rsvp.create({
      data: {
        guestId,
        invitationId,
        attending: Boolean(attending),
        totalAttending: attending ? Number(totalAttending) || 1 : 0,
        dietaryPreference: dietaryPreference || "Vegetarian",
        allergies: allergies || null,
        needsHotelStay: Boolean(needsHotelStay),
        needsShuttle: Boolean(needsShuttle),
        songRequest: songRequest || null,
        specialRequests: specialRequests || null,
      },
    });

    // If attending, save individual event selections
    if (attending && Array.isArray(selectedEvents) && selectedEvents.length > 0) {
      for (const eventId of selectedEvents) {
        await prisma.rsvpEvent.create({
          data: {
            rsvpId: rsvp.id,
            weddingEventId: eventId,
            attending: true,
            count: Number(totalAttending) || 1,
          },
        });
      }
    }

    const fullRsvp = await prisma.rsvp.findUnique({
      where: { id: rsvp.id },
      include: {
        guest: true,
        eventsAttending: {
          include: {
            weddingEvent: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: attending
        ? "Your royal RSVP has been graciously recorded. We look forward to celebrating with you!"
        : "Thank you for letting us know. You will be dearly missed during the celebrations.",
      rsvp: fullRsvp,
    });
  } catch (err: any) {
    console.error("RSVP submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit RSVP. Please try again or contact the concierge." },
      { status: 500 }
    );
  }
}
