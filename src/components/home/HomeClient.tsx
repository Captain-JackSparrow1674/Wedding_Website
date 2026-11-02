"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CoupleSection } from "@/components/couple/CoupleSection";
import { EventsSection } from "@/components/events/EventsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { VenueSection } from "@/components/venue/VenueSection";
import { WishesSection } from "@/components/wishes/WishesSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { Footer } from "@/components/footer/Footer";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { RsvpModal } from "@/components/rsvp/RsvpModal";
import { DigitalCardModal } from "@/components/invitation/DigitalCardModal";
import { PersonalizedBanner } from "@/components/invitation/PersonalizedBanner";
import {
  WeddingEventItem,
  GalleryImageItem,
  GuestWishItem,
  WeddingSettingsItem,
  GuestItem,
  InvitationItem,
} from "@/lib/types";

interface HomeClientProps {
  settings: WeddingSettingsItem;
  events: WeddingEventItem[];
  galleryImages: GalleryImageItem[];
  wishes: GuestWishItem[];
  personalizedGuest?: GuestItem | null;
  personalizedInvitation?: InvitationItem | null;
}

export const HomeClient: React.FC<HomeClientProps> = ({
  settings,
  events,
  galleryImages,
  wishes,
  personalizedGuest,
  personalizedInvitation,
}) => {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string | undefined>();

  const openRsvp = (eventId?: string) => {
    setPreselectedEventId(eventId);
    setRsvpOpen(true);
  };

  const openCard = () => {
    setCardOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF9F0]">
      {/* Personalized VIP Banner if token was loaded */}
      {personalizedGuest && personalizedInvitation && (
        <PersonalizedBanner
          guestName={personalizedGuest.name}
          familyName={personalizedGuest.familyName}
          guestLimit={personalizedGuest.guestLimit}
          customMessage={personalizedInvitation.customMessage}
          status={personalizedInvitation.status}
          onOpenRsvp={() => openRsvp()}
          onOpenCard={openCard}
        />
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenRsvp={() => openRsvp()}
        onOpenCard={openCard}
        guestName={personalizedGuest?.name}
      />

      {/* Hero Section */}
      <HeroSection
        brideName={settings.brideName}
        groomName={settings.groomName}
        weddingDate={settings.weddingDate}
        weddingCity={settings.weddingCity}
        onOpenRsvp={() => openRsvp()}
        onOpenCard={openCard}
      />

      {/* Couple Profiles & Love Story Timeline */}
      <CoupleSection
        brideName={`${settings.brideName} Singhania`}
        groomName={`${settings.groomName} Rathore`}
        brideParents={settings.brideParents}
        groomParents={settings.groomParents}
      />

      {/* Events Schedule & Itinerary */}
      <EventsSection
        events={events}
        onOpenRsvpForEvent={(eventId) => openRsvp(eventId)}
      />

      {/* Royal Gallery */}
      <GallerySection images={galleryImages} />

      {/* Venue & Travel Accommodations */}
      <VenueSection />

      {/* Wishes & Guestbook */}
      <WishesSection initialWishes={wishes} />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Ambient Instrumental Wedding Music */}
      <MusicPlayer musicUrl={settings.musicUrl || undefined} />

      {/* Smart RSVP Modal */}
      <RsvpModal
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        events={events}
        preselectedEventId={preselectedEventId}
        initialGuestName={personalizedGuest?.name}
        initialGuestEmail={personalizedGuest?.email}
        initialGuestPhone={personalizedGuest?.phone}
        initialGuestLimit={personalizedGuest?.guestLimit || 2}
        token={personalizedInvitation?.token}
      />

      {/* Digital Invitation Card & WhatsApp Pass Modal */}
      <DigitalCardModal
        isOpen={cardOpen}
        onClose={() => setCardOpen(false)}
        guestName={personalizedGuest?.name}
        guestLimit={personalizedGuest?.guestLimit || 2}
        token={personalizedInvitation?.token}
      />
    </main>
  );
};
