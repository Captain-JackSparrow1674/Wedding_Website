"use client";

import React, { useState } from "react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { GalleryImageItem } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Play, Video } from "lucide-react";

interface GallerySectionProps {
  images: GalleryImageItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Memories" },
    { id: "highlights", label: "Film & Teasers" },
    { id: "couple", label: "Royal Couple" },
    { id: "pre-wedding", label: "Pre-Wedding" },
    { id: "mehendi", label: "Mehendi" },
    { id: "haldi", label: "Haldi Glow" },
    { id: "sangeet", label: "Sangeet Gala" },
    { id: "wedding", label: "The Mandap" },
    { id: "reception", label: "Reception" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category.toLowerCase() === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  const currentItem = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#FFF9F0] text-[#211A19] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#641C32]">
            Glimpses of Timeless Moments
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#3B101F] mt-2">
            The Royal Gallery &amp; Cinema
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#211A19]/80 italic">
            Memories etched against the sandstone arches, sunset waters, and royal palace halls.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? images.length
                : images.filter((img) => img.category.toLowerCase() === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-[#641C32] text-[#FFF9F0] shadow-md scale-105 border border-[#D4AF75]"
                    : "bg-[#EDE0CD]/60 text-[#211A19]/80 hover:bg-[#EDE0CD] border border-transparent"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-[#D4AF75] text-[#3B101F] font-bold"
                      : "bg-[#211A19]/10 text-[#211A19]/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16 bg-[#EDE0CD]/20 rounded-2xl border border-[#D4AF75]/30">
            <Sparkles className="w-8 h-8 text-[#D4AF75] mx-auto mb-3" />
            <p className="font-royal text-lg text-[#3B101F] font-semibold">
              No photos currently in this album
            </p>
            <p className="text-xs text-[#211A19]/70 mt-1">
              Select &apos;All Memories&apos; or another ceremony to explore more moments.
            </p>
          </div>
        )}

        {/* Masonry / Grid Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img, index) => {
            const isVideo = img.mediaType === "video" || !!img.videoUrl;
            return (
              <div
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF75]/40 shadow-sm hover:shadow-royal transition-all duration-500 aspect-[4/5] bg-[#EDE0CD]/40"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes("/images/gallery/couple-1.jpg")) {
                      target.src = "/images/gallery/couple-1.jpg";
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Video Indicator Badge */}
                {isVideo && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF75] text-[#D4AF75] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-10 shadow-md">
                    <Video className="w-3 h-3 text-[#D4AF75]" />
                    <span>Cinema</span>
                  </div>
                )}

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#3B101F]/80 border-2 border-[#D4AF75] text-[#D4AF75] flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#3B101F]/95 via-[#3B101F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#FFF9F0]">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF75] font-bold">
                    {img.category}
                  </span>
                  <h4 className="font-royal text-base sm:text-lg font-bold text-white mb-1">
                    {img.title}
                  </h4>
                  {img.caption && (
                    <p className="text-xs text-[#FFF9F0]/80 font-serif-luxury line-clamp-2">
                      {img.caption}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-[#D4AF75]">
                    {isVideo ? <Play className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{isVideo ? "Click to play film" : "Click to view photo"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {currentItem && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous item"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white z-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next item"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white z-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.mediaType === "video" && currentItem.videoUrl ? (
                <div className="w-full max-h-[70vh] aspect-video bg-black rounded-xl overflow-hidden border border-[#D4AF75]/50 shadow-2xl">
                  <video
                    src={currentItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes("/images/gallery/couple-1.jpg")) {
                      target.src = "/images/gallery/couple-1.jpg";
                    }
                  }}
                  className="max-h-[75vh] w-auto object-contain rounded-xl border border-[#D4AF75]/40 shadow-2xl"
                />
              )}

              <div className="mt-4 text-center text-[#FFF9F0]">
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#D4AF75]">
                  {currentItem.title}
                </h3>
                {currentItem.caption && (
                  <p className="text-sm text-[#FFF9F0]/80 font-serif-luxury mt-1 max-w-xl">
                    {currentItem.caption}
                  </p>
                )}
                <span className="text-xs text-[#FFF9F0]/50 block mt-2">
                  Item {(lightboxIndex ?? 0) + 1} of {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
