import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { HomeClient } from "@/components/home/HomeClient";
import {
  WeddingSettingsItem,
  WeddingEventItem,
  GalleryImageItem,
  GuestWishItem,
  GuestItem,
  InvitationItem,
} from "@/lib/types";
import {
  defaultSettings,
  defaultEvents,
  defaultGallery,
  defaultWishes,
} from "@/lib/defaultData";

export default async function PersonalizedInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Find invitation by token
  const invitationDb = await prisma.invitation.findUnique({
    where: { token },
    include: {
      guest: {
        include: {
          invitations: true,
          rsvps: true,
        },
      },
    },
  });

  if (!invitationDb) {
    notFound();
  }

  // Auto update status to OPENED if it was PENDING or SENT
  if (invitationDb.status === "PENDING" || invitationDb.status === "SENT") {
    await prisma.invitation.update({
      where: { id: invitationDb.id },
      data: {
        status: "OPENED",
        openedAt: invitationDb.openedAt || new Date(),
      },
    });
    invitationDb.status = "OPENED";
  }

  // Load common wedding data with safe fallbacks
  let settings: WeddingSettingsItem = defaultSettings;
  let events: WeddingEventItem[] = defaultEvents;
  let galleryImages: GalleryImageItem[] = defaultGallery;
  let wishes: GuestWishItem[] = defaultWishes;

  try {
    const settingsDb = await prisma.weddingSettings.findFirst();
    const eventsDb = await prisma.weddingEvent.findMany({
      orderBy: { orderIndex: "asc" },
    });
    const galleryDb = await prisma.galleryImage.findMany({
      orderBy: [{ isFeatured: "desc" }, { orderIndex: "asc" }],
    });
    const wishesDb = await prisma.guestWish.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });

    if (settingsDb) {
      settings = {
        id: settingsDb.id,
        brideName: settingsDb.brideName,
        groomName: settingsDb.groomName,
        brideParents: settingsDb.brideParents,
        groomParents: settingsDb.groomParents,
        weddingDate: settingsDb.weddingDate ? settingsDb.weddingDate.toISOString() : defaultSettings.weddingDate,
        weddingCity: settingsDb.weddingCity,
        heroTagline: settingsDb.heroTagline,
        musicUrl: settingsDb.musicUrl,
      };
    }

    if (eventsDb && eventsDb.length > 0) {
      events = eventsDb.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        ceremonyDate: e.ceremonyDate.toISOString(),
        startTime: e.startTime,
        endTime: e.endTime,
        venueName: e.venueName,
        venueAddress: e.venueAddress,
        mapUrl: e.mapUrl,
        description: e.description,
        dressCode: e.dressCode,
        dressCodeColors: e.dressCodeColors,
        imageUrl: e.imageUrl,
        orderIndex: e.orderIndex,
      }));
    }

    if (galleryDb && galleryDb.length > 0) {
      galleryImages = galleryDb.map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category,
        imageUrl: g.imageUrl,
        videoUrl: g.videoUrl,
        mediaType: (g.mediaType as "image" | "video") || "image",
        caption: g.caption,
        isFeatured: g.isFeatured,
        orderIndex: g.orderIndex,
      }));
    }

    if (wishesDb && wishesDb.length > 0) {
      wishes = wishesDb.map((w) => ({
        id: w.id,
        guestName: w.guestName,
        message: w.message,
        relation: w.relation,
        isApproved: w.isApproved,
        createdAt: w.createdAt.toISOString(),
      }));
    }
  } catch (error) {
    console.warn("Using default wedding data fallback for invite page:", error);
  }

  const personalizedGuest: GuestItem = {
    id: invitationDb.guest.id,
    name: invitationDb.guest.name,
    email: invitationDb.guest.email,
    phone: invitationDb.guest.phone,
    familyName: invitationDb.guest.familyName,
    guestLimit: invitationDb.guest.guestLimit,
    notes: invitationDb.guest.notes,
    invitations: [],
    rsvps: [],
    createdAt: invitationDb.guest.createdAt.toISOString(),
  };

  const personalizedInvitation: InvitationItem = {
    id: invitationDb.id,
    guestId: invitationDb.guestId,
    token: invitationDb.token,
    customMessage: invitationDb.customMessage,
    status: invitationDb.status as any,
    openedAt: invitationDb.openedAt?.toISOString(),
    sentAt: invitationDb.sentAt?.toISOString(),
    rsvpAt: invitationDb.rsvpAt?.toISOString(),
  };

  return (
    <HomeClient
      settings={settings}
      events={events}
      galleryImages={galleryImages}
      wishes={wishes}
      personalizedGuest={personalizedGuest}
      personalizedInvitation={personalizedInvitation}
    />
  );
}
