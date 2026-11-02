"use client";

import React, { useState } from "react";
import { RsvpModal } from "@/components/rsvp/RsvpModal";
import { WeddingEventItem } from "@/lib/types";
import { Crown, Heart, Sparkles } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

interface RsvpPageClientProps {
  events: WeddingEventItem[];
}

export const RsvpPageClient: React.FC<RsvpPageClientProps> = ({ events }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="w-14 h-14 rounded-full border border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
          <Crown className="w-7 h-7 text-[#D4AF75]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#641C32] font-semibold block">
          Royal Wedding Celebrations • December 2026
        </span>
        <h1 className="font-royal text-3xl sm:text-5xl font-bold text-[#3B101F] mt-2">
          Confirm Your Royal Presence
        </h1>
        <GoldDivider variant="lotus" />
        <p className="font-serif-luxury text-base sm:text-lg text-[#211A19]/80 italic max-w-xl mx-auto">
          Please let us know your travel plans, attending ceremonies, and dietary choices so our royal concierge team can prepare your welcome.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <RsvpModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          events={events}
          initialGuestLimit={2}
        />
        {!isOpen && (
          <div className="text-center py-12">
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110"
            >
              Open RSVP Form Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
