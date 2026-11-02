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

  // Load common wedding data
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

  const settings: WeddingSettingsItem = {
    id: settingsDb?.id || "settings-1",
    brideName: settingsDb?.brideName || "Radhika",
    groomName: settingsDb?.groomName || "Devansh",
    brideParents: settingsDb?.brideParents || "Smt. Sunita & Shri Vikramaditya Singhania",
    groomParents: settingsDb?.groomParents || "Smt. Rajeshwari & Shri Mahendra Pratap Rathore",
    weddingDate: settingsDb?.weddingDate ? settingsDb.weddingDate.toISOString() : "2026-12-18T18:00:00Z",
    weddingCity: settingsDb?.weddingCity || "Udaipur, Rajasthan",
    heroTagline: settingsDb?.heroTagline || "Together with our families, we cordially invite you to celebrate our royal union",
    musicUrl: settingsDb?.musicUrl || "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b939db20.mp3?filename=indian-flute-and-sitar-ambient-110825.mp3",
  };

  const events: WeddingEventItem[] = eventsDb.map((e) => ({
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

  const galleryImages: GalleryImageItem[] = galleryDb.map((g) => ({
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

  const wishes: GuestWishItem[] = wishesDb.map((w) => ({
    id: w.id,
    guestName: w.guestName,
    message: w.message,
    relation: w.relation,
    isApproved: w.isApproved,
    createdAt: w.createdAt.toISOString(),
  }));

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
