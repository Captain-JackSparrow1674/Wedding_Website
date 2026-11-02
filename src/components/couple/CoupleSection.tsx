"use client";

import React from "react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Heart, Sparkles, MapPin, Calendar } from "lucide-react";

interface CoupleSectionProps {
  brideName?: string;
  groomName?: string;
  brideParents?: string;
  groomParents?: string;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  brideName = "Radhika Singhania",
  groomName = "Devansh Rathore",
  brideParents = "Smt. Sunita & Shri Vikramaditya Singhania",
  groomParents = "Smt. Rajeshwari & Shri Mahendra Pratap Rathore",
}) => {
  const storyMilestones = [
    {
      year: "Autumn 2019",
      title: "First Meeting at Oxford",
      location: "Oxford, United Kingdom",
      description:
        "A chance encounter over heritage architectural manuscripts in the Bodleian library sparked an endless conversation that never truly ended.",
    },
    {
      year: "Monsoon 2022",
      title: "Monsoons & Melody",
      location: "Nahargarh, Jaipur",
      description:
        "Overlooking the pink city under twilight rain showers, they realized their shared reverence for family heritage, music, and simple moments together.",
    },
    {
      year: "Winter 2024",
      title: "The Royal Palace Proposal",
      location: "Lake Pichola, Udaipur",
      description:
        "A private boat lit by floating lamps on Lake Pichola against the backdrop of the illuminated City Palace, where Devansh asked for her hand with an heirloom ring.",
    },
    {
      year: "December 2026",
      title: "The Sacred Vows (Phere)",
      location: "Zenana Mahal, Udaipur",
      description:
        "Surrounded by the holy fire, sacred Vedic chants, beloved family elders, and cherished friends, taking the seven eternal steps together.",
    },
  ];

  return (
    <section id="story" className="py-24 bg-[#FFF9F0] text-[#211A19] relative overflow-hidden">
      {/* Decorative Damask Texture Overlay */}
      <div className="absolute inset-0 bg-ivory-damask opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#641C32]">
            Two Souls, Two Families, One Destiny
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B101F] mt-2">
            The Royal Couple
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-lg text-[#211A19]/80 italic">
            With the graceful blessings of our ancestors and the divine love of our parents.
          </p>
        </div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          {/* Bride Card */}
          <div className="relative group bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#D4AF75]/50 shadow-royal hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-[#D4AF75]/40">
              <img
                src="/images/gallery/couple-1.jpg"
                alt={brideName}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B101F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#FFF9F0]">
                <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-semibold">
                  The Bride
                </span>
                <h3 className="font-royal text-2xl font-bold text-white">
                  {brideName}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-xs text-[#641C32] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
                Singhania Dynasty
              </div>
              <p className="text-xs sm:text-sm text-[#211A19]/75 leading-relaxed font-sans">
                Daughter of {brideParents}. An architect with a passion for preserving classical Rajasthani heritage, classical kathak dance, and fine arts.
              </p>
              <blockquote className="font-serif-luxury italic text-sm text-[#641C32] pt-2 border-t border-[#D4AF75]/20">
                “In his patience and strength, I discovered my safest home.”
              </blockquote>
            </div>
          </div>

          {/* Groom Card */}
          <div className="relative group bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#D4AF75]/50 shadow-royal hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-[#D4AF75]/40">
              <img
                src="/images/gallery/couple-2.jpg"
                alt={groomName}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B101F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#FFF9F0]">
                <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-semibold">
                  The Groom
                </span>
                <h3 className="font-royal text-2xl font-bold text-white">
                  {groomName}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-xs text-[#641C32] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
                Rathore Dynasty
              </div>
              <p className="text-xs sm:text-sm text-[#211A19]/75 leading-relaxed font-sans">
                Son of {groomParents}. An entrepreneur, polo enthusiast, and collector of classical Indian instruments who treasures honour and chivalry.
              </p>
              <blockquote className="font-serif-luxury italic text-sm text-[#641C32] pt-2 border-t border-[#D4AF75]/20">
                “Her laughter brings light to the grandest halls of Rajasthan.”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Love Story Timeline */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs tracking-widest uppercase font-semibold text-[#641C32]">
              Chapters of Our Love
            </span>
            <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#3B101F] mt-1">
              Our Journey Together
            </h3>
            <GoldDivider variant="diamond" />
          </div>

          <div className="relative border-l-2 border-[#D4AF75]/60 ml-4 sm:ml-32 md:ml-40 pl-6 sm:pl-10 space-y-12">
            {storyMilestones.map((milestone) => (
              <div key={milestone.title} className="relative group">
                {/* Year Marker Badge */}
                <div className="sm:absolute sm:-left-36 md:-left-44 top-0.5 mb-2 sm:mb-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#3B101F] text-[#D4AF75] text-xs font-bold tracking-widest uppercase shadow-md border border-[#D4AF75]/40">
                    {milestone.year}
                  </span>
                </div>

                {/* Timeline Node Bullet */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#FFF9F0] border-2 border-[#D4AF75] flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#641C32]" />
                </span>

                {/* Milestone Content Card */}
                <div className="bg-[#FFFDF9] rounded-xl p-5 sm:p-6 border border-[#D4AF75]/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="font-royal text-lg sm:text-xl font-bold text-[#3B101F]">
                      {milestone.title}
                    </h4>
                    <span className="flex items-center gap-1 text-xs text-[#641C32] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF75]" />
                      {milestone.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#211A19]/80 font-sans leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
