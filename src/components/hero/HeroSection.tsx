"use client";

import React from "react";
import { CountdownTimer } from "@/components/countdown/CountdownTimer";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Calendar, MapPin, Heart, Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string | Date;
  weddingCity?: string;
  onOpenRsvp?: () => void;
  onOpenCard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brideName = "Radhika",
  groomName = "Devansh",
  weddingDate = "2026-12-18T18:00:00Z",
  weddingCity = "Udaipur, Rajasthan",
  onOpenRsvp,
  onOpenCard,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#211A19] text-[#FFF9F0]">
      {/* Background Image with Rich Royal Vignette & Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/images/gallery/prewedding-1.jpg')`,
        }}
      />
      
      {/* Royal Dark Maroon Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#211A19]/90 via-[#3B101F]/80 to-[#211A19]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,117,0.15)_0%,transparent_70%)]" />

      {/* Ornate Gold Frame Border around Hero */}
      <div className="absolute inset-4 sm:inset-8 border border-[#D4AF75]/30 pointer-events-none rounded-2xl royal-corner-ornament" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        {/* Royal Auspicious Shloka / Invocation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF75]/40 bg-[#3B101F]/70 backdrop-blur-sm mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
          <span className="font-serif-luxury text-xs sm:text-sm tracking-widest text-[#D4AF75] italic">
            ॥ श्री गणेशाय नमः ॥ Shubha Vivaah
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
        </div>

        {/* Family Invitation Pre-text */}
        <p className="font-serif-luxury text-sm sm:text-base md:text-lg tracking-widest uppercase text-[#FFF9F0]/80 mb-3 max-w-xl">
          Together with their families
        </p>

        {/* Bride & Groom Royal Calligraphy */}
        <div className="my-2 sm:my-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-shine drop-shadow-lg">
            {brideName}
          </h1>
          <span className="font-serif-luxury italic text-3xl sm:text-4xl text-[#D4AF75] font-light md:my-0 my-1">
            &
          </span>
          <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-shine drop-shadow-lg">
            {groomName}
          </h1>
        </div>

        {/* Royal Divider */}
        <GoldDivider variant="lotus" className="my-4" />

        {/* Cordial Invitation Message */}
        <p className="font-serif-luxury text-base sm:text-xl text-[#FFF9F0]/90 max-w-2xl font-normal leading-relaxed italic px-4">
          Request the honour of your gracious presence and heartfelt blessings
          as we embark on our lifelong journey of love, duty, and togetherness.
        </p>

        {/* Date & Destination City */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-6 text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#D4AF75]">
          <div className="flex items-center gap-2 bg-[#3B101F]/60 px-4 py-2 rounded-full border border-[#D4AF75]/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-[#D4AF75]" />
            <span>December 16 – 19, 2026</span>
          </div>
          <div className="flex items-center gap-2 bg-[#3B101F]/60 px-4 py-2 rounded-full border border-[#D4AF75]/30 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-[#D4AF75]" />
            <span>{weddingCity}</span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-lg mb-8">
          <span className="text-[11px] tracking-widest uppercase text-[#D4AF75] font-semibold block mb-2">
            Counting Down To The Sacred Vows
          </span>
          <CountdownTimer targetDate={weddingDate} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {onOpenRsvp && (
            <button
              onClick={onOpenRsvp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF75] via-[#F4E2BE] to-[#A57D3E] text-[#211A19] font-bold text-sm tracking-widest uppercase shadow-gold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-[#211A19]" />
              RSVP Now
            </button>
          )}

          {onOpenCard && (
            <button
              onClick={onOpenCard}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#3B101F]/80 backdrop-blur-md border border-[#D4AF75] text-[#D4AF75] font-semibold text-sm tracking-widest uppercase hover:bg-[#D4AF75]/15 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF75]" />
              Digital Invitation
            </button>
          )}

          <a
            href="#events"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 text-[#FFF9F0]/80 hover:text-[#FFF9F0] hover:border-white/40 text-sm tracking-wider uppercase transition-colors flex items-center justify-center"
          >
            Explore Events
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#story"
          aria-label="Scroll down to Story"
          className="mt-12 text-[#D4AF75]/70 hover:text-[#D4AF75] flex flex-col items-center gap-1 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll Down</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
