"use client";

import React from "react";
import { Crown, Sparkles, CheckCircle2, Heart, Share2 } from "lucide-react";

interface PersonalizedBannerProps {
  guestName: string;
  familyName?: string | null;
  guestLimit: number;
  customMessage?: string | null;
  status: string;
  onOpenRsvp: () => void;
  onOpenCard: () => void;
}

export const PersonalizedBanner: React.FC<PersonalizedBannerProps> = ({
  guestName,
  familyName,
  guestLimit,
  customMessage,
  status,
  onOpenRsvp,
  onOpenCard,
}) => {
  const isRsvpDone = status === "RSVP_COMPLETED";

  return (
    <div className="relative z-30 bg-gradient-to-r from-[#3B101F] via-[#4A1527] to-[#3B101F] border-b-2 border-[#D4AF75] shadow-royal text-[#FFF9F0] py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left greeting */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-[#D4AF75] text-[#3B101F] flex items-center justify-center shrink-0 shadow-gold">
            <Crown className="w-5 h-5 fill-current" />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold">
                Royal Guest of Honour:
              </span>
              <h2 className="font-royal text-base sm:text-lg font-bold text-white">
                {guestName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#211A19]/80 border border-[#D4AF75]/50 text-[#D4AF75]">
                Admits {guestLimit} {guestLimit === 1 ? "Guest" : "Guests"}
              </span>
              {isRsvpDone && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 border border-emerald-500 text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  RSVP Completed
                </span>
              )}
            </div>

            {customMessage && (
              <p className="text-xs sm:text-sm text-[#FFF9F0]/85 font-serif-luxury italic mt-1 max-w-2xl">
                “{customMessage}”
              </p>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCard}
            className="px-4 py-2 rounded-full border border-[#D4AF75] text-[#D4AF75] hover:bg-[#D4AF75]/15 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Digital Card
          </button>

          <button
            onClick={onOpenRsvp}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] hover:brightness-110 text-xs font-bold uppercase tracking-wider shadow-gold active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            {isRsvpDone ? "Update RSVP" : "RSVP Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
