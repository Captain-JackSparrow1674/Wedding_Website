export interface WeddingEventItem {
  id: string;
  title: string;
  slug: string;
  ceremonyDate: string | Date;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string | null;
  description: string;
  dressCode: string;
  dressCodeColors?: string | null;
  imageUrl: string;
  orderIndex: number;
}

export interface GuestItem {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  familyName?: string | null;
  guestLimit: number;
  notes?: string | null;
  invitations: InvitationItem[];
  rsvps: RsvpItem[];
  createdAt: string | Date;
}

export interface InvitationItem {
  id: string;
  guestId: string;
  token: string;
  customMessage?: string | null;
  status: "PENDING" | "SENT" | "OPENED" | "RSVP_COMPLETED";
  openedAt?: string | Date | null;
  sentAt?: string | Date | null;
  rsvpAt?: string | Date | null;
}

export interface RsvpItem {
  id: string;
  invitationId?: string | null;
  guestId: string;
  attending: boolean;
  totalAttending: number;
  dietaryPreference?: string | null;
  allergies?: string | null;
  needsHotelStay: boolean;
  needsShuttle: boolean;
  songRequest?: string | null;
  specialRequests?: string | null;
  eventsAttending?: {
    id: string;
    weddingEventId: string;
    attending: boolean;
    count: number;
    weddingEvent?: WeddingEventItem;
  }[];
  createdAt: string | Date;
}

export interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string | null;
  mediaType: "image" | "video";
  caption?: string | null;
  isFeatured: boolean;
  orderIndex: number;
}

export interface GuestWishItem {
  id: string;
  guestName: string;
  message: string;
  relation?: string | null;
  isApproved: boolean;
  createdAt: string | Date;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "UNREAD" | "RESPONDED";
  createdAt: string | Date;
}

export interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "CONCIERGE" | "EVENT_PLANNER" | "ADMIN";
  createdAt: string | Date;
}

export interface WeddingSettingsItem {
  id: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  weddingDate: string | Date;
  weddingCity: string;
  heroTagline: string;
  musicUrl?: string | null;
}
