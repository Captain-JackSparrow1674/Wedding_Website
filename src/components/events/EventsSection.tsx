"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GoldDivider } from "@/components/common/GoldDivider";
import { WeddingEventItem } from "@/lib/types";
import { Calendar, Clock, MapPin, Sparkles, Navigation, Heart } from "lucide-react";

interface EventsSectionProps {
  events: WeddingEventItem[];
  onOpenRsvpForEvent?: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onOpenRsvpForEvent,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    events[0]?.id || ""
  );

  const activeEvent =
    events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <section id="events" className="py-24 bg-[#3B101F] text-[#FFF9F0] relative overflow-hidden">
      {/* Royal Jaali Lattice Background */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF75]">
            Celebration Itinerary &amp; Rituals
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-white mt-2">
            The Wedding Celebrations
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F0]/80 italic">
            Four days of sacred ceremonies, musical jubilation, and royal Rajasthani hospitality.
          </p>
        </div>

        {/* Event Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {events.map((ev, index) => {
            const isSelected = ev.id === activeEvent?.id;
            return (
              <button
                key={ev.id}
                onClick={() => setSelectedEventId(ev.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] shadow-gold scale-105"
                    : "bg-[#211A19]/60 hover:bg-[#211A19] text-[#FFF9F0]/80 border border-[#D4AF75]/30 hover:border-[#D4AF75]"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                  {index + 1}
                </span>
                <span>{ev.title.split(":")[0].split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Active Event Card */}
        {activeEvent && (
          <div className="bg-gradient-to-b from-[#2A0C16] to-[#1C060E] rounded-3xl border border-[#D4AF75]/50 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
            {/* Left: Event Visual with Gold Frame */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.title}
                onError={(e) => {
                  e.currentTarget.src = "/images/gallery/wedding-1.jpg";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C060E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#2A0C16]" />

              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-[#3B101F]/90 backdrop-blur-md border border-[#D4AF75] text-[#D4AF75] text-xs font-bold uppercase tracking-widest shadow-md">
                  {new Date(activeEvent.ceremonyDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Right: Event Information */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF75] tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
                  Ceremony #{events.findIndex((e) => e.id === activeEvent.id) + 1}
                </div>

                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-white mb-4">
                  {activeEvent.title}
                </h3>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 bg-[#3B101F]/70 p-4 rounded-xl border border-[#D4AF75]/20">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#D4AF75] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#D4AF75] block">
                        Ceremony Timings
                      </span>
                      <span className="text-sm font-medium text-white">
                        {activeEvent.startTime} – {activeEvent.endTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF75] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#D4AF75] block">
                        Royal Venue
                      </span>
                      <span className="text-sm font-medium text-white">
                        {activeEvent.venueName}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#FFF9F0]/85 font-sans leading-relaxed mb-6">
                  {activeEvent.description}
                </p>

                {/* Dress Code & Color Palette Tag */}
                <div className="bg-[#211A19]/80 p-4 rounded-xl border border-[#D4AF75]/30 mb-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-semibold flex items-center gap-1.5">
                      Dress Code: {activeEvent.dressCode}
                    </span>
                  </div>

                  {activeEvent.dressCodeColors && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] text-[#FFF9F0]/60 mr-1">Recommended Shades:</span>
                      {activeEvent.dressCodeColors.split(",").map((c, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border border-white/40 shadow-sm"
                          style={{ backgroundColor: c.trim() }}
                          title={c.trim()}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#D4AF75]/20">
                {activeEvent.mapUrl && (
                  <a
                    href={activeEvent.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#3B101F] hover:bg-[#4E1527] border border-[#D4AF75] text-[#D4AF75] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Google Maps Directions
                  </a>
                )}

                {onOpenRsvpForEvent ? (
                  <button
                    onClick={() => onOpenRsvpForEvent(activeEvent.id)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold tracking-wider uppercase shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    RSVP For This Ceremony
                  </button>
                ) : (
                  <Link
                    href="/rsvp"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold tracking-wider uppercase shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    RSVP For This Ceremony
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Events Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEventId(ev.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                ev.id === activeEvent?.id
                  ? "bg-[#3B101F] border-[#D4AF75] shadow-gold ring-1 ring-[#D4AF75]"
                  : "bg-[#211A19]/70 hover:bg-[#3B101F]/60 border-white/10 hover:border-[#D4AF75]/50"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#D4AF75] mb-2 font-semibold">
                <span>Part 0{idx + 1}</span>
                <span>{ev.startTime}</span>
              </div>
              <h4 className="font-royal text-lg font-bold text-white mb-2 line-clamp-1">
                {ev.title}
              </h4>
              <p className="text-xs text-[#FFF9F0]/70 line-clamp-2 mb-3">
                {ev.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF75]">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{ev.venueName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
