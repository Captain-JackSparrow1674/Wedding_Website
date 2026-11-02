"use client";

import React, { useRef } from "react";
import { X, Share2, Printer, Sparkles, Crown, MapPin, Calendar } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

interface DigitalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string | null;
  guestLimit?: number;
  token?: string | null;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({
  isOpen,
  onClose,
  guestName,
  guestLimit = 2,
  token,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const inviteUrl = typeof window !== "undefined"
    ? token
      ? `${window.location.origin}/invite/${token}`
      : window.location.origin
    : "";

  const handleShareWhatsApp = () => {
    const text = `👑 *Royal Wedding Invitation: Radhika & Devansh* 👑\n\n` +
      `${guestName ? `Respected ${guestName},\n\n` : ""}` +
      `Together with our families, we cordially invite you to celebrate our royal wedding in the City of Lakes, Udaipur from December 16–19, 2026.\n\n` +
      `✨ Explore our celebration itinerary, RSVP, and view your digital invitation pass here:\n` +
      `${inviteUrl}\n\n` +
      `With warm regards,\nSinghania & Rathore Families`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-[#3B101F] via-[#2A0C16] to-[#1C060E] rounded-3xl border-2 border-[#D4AF75] shadow-2xl p-6 sm:p-10 text-[#FFF9F0] overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Digital Card"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF75] z-20 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ornate Inner Gold Border */}
        <div className="absolute inset-3 border border-[#D4AF75]/40 rounded-2xl pointer-events-none" />

        <div className="text-center relative z-10 pt-2">
          {/* Shloka */}
          <div className="font-serif-luxury text-[#D4AF75] text-xs sm:text-sm tracking-widest italic mb-2">
            ॥ श्री गणेशाय नमः ॥
          </div>
          <div className="text-[11px] text-[#D4AF75]/80 font-sans tracking-widest uppercase mb-4">
            Shubha Vivaah Mahotsav
          </div>

          {/* Royal Seal Monogram */}
          <div className="w-14 h-14 rounded-full border border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
            <Crown className="w-7 h-7 text-[#D4AF75]" />
          </div>

          {/* Families Invitation Header */}
          <p className="font-serif-luxury text-xs sm:text-sm tracking-wider uppercase text-[#FFF9F0]/80">
            Smt. Sunita & Shri Vikramaditya Singhania
            <br />
            <span className="text-[11px] text-[#D4AF75] italic">&amp;</span>
            <br />
            Smt. Rajeshwari & Shri Mahendra Pratap Rathore
          </p>

          <p className="text-xs text-[#FFF9F0]/70 mt-3 font-serif-luxury italic">
            cordially invite the gracious presence of
          </p>

          {/* Personalized Guest Badge */}
          <div className="my-3 py-2 px-6 rounded-full bg-gradient-to-r from-transparent via-[#D4AF75]/20 to-transparent border-y border-[#D4AF75]/50 inline-block">
            <h4 className="font-royal text-lg sm:text-xl font-bold text-gold-gradient">
              {guestName || "Honoured Guest & Family"}
            </h4>
            {guestLimit && (
              <span className="text-[10px] tracking-widest uppercase text-[#D4AF75] block mt-0.5">
                Pass Admitting Up To {guestLimit} {guestLimit === 1 ? "Guest" : "Guests"}
              </span>
            )}
          </div>

          <p className="text-xs text-[#FFF9F0]/70 font-serif-luxury italic">
            to celebrate the auspicious wedding of their beloved children
          </p>

          {/* Couple Names */}
          <div className="my-4">
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-gold-shine">
              Radhika &amp; Devansh
            </h2>
          </div>

          <GoldDivider variant="diamond" className="my-2" />

          {/* Event Dates & Destination */}
          <div className="space-y-1.5 text-xs sm:text-sm my-4 font-sans text-[#FFF9F0]/90">
            <div className="flex items-center justify-center gap-2 text-[#D4AF75]">
              <Calendar className="w-4 h-4 text-[#D4AF75]" />
              <strong className="tracking-wide">December 16 – 19, 2026</strong>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF75]" />
              <span>The City Palace &amp; Lake Pichola, Udaipur, Rajasthan</span>
            </div>
          </div>

          {/* Pass ID / QR Section */}
          <div className="bg-[#211A19]/80 p-3 rounded-xl border border-[#D4AF75]/40 my-5 text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF75] block mb-1">
              Digital VIP Invitation Pass ID
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-white font-bold">
              {token || "ROYAL-PASS-2026-VIP"}
            </span>
          </div>

          {/* Action CTAs: WhatsApp & Print */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 no-print">
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share on WhatsApp
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#3B101F] hover:bg-[#4E1527] border border-[#D4AF75] text-[#D4AF75] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
