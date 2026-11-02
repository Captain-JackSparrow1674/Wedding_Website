"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Crown, Heart, Sparkles, ShieldCheck, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenRsvp?: () => void;
  onOpenCard?: () => void;
  guestName?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRsvp, onOpenCard, guestName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "/story" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Venue & Travel", href: "/venue" },
    { label: "Guestbook", href: "/guestbook" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#3B101F]/95 backdrop-blur-md py-3 shadow-royal border-b border-[#D4AF75]/30"
          : "bg-gradient-to-b from-[#211A19]/90 via-[#211A19]/60 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#D4AF75] flex items-center justify-center bg-[#3B101F] shadow-gold group-hover:scale-105 transition-transform duration-300">
            <Crown className="w-5 h-5 text-[#D4AF75]" />
          </div>
          <div className="flex flex-col">
            <span className="font-royal text-lg sm:text-xl font-bold tracking-widest text-[#FFF9F0] group-hover:text-[#D4AF75] transition-colors">
              Radhika &amp; Devansh
            </span>
            <span className="text-[9px] tracking-widest uppercase text-[#D4AF75]">
              The Royal Union • Udaipur
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs xl:text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? "text-[#D4AF75] font-semibold after:w-full"
                    : "text-[#FFF9F0]/85 hover:text-[#D4AF75]"
                } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#D4AF75] hover:after:w-full after:transition-all`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenCard ? (
            <button
              onClick={onOpenCard}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-[#D4AF75]/60 text-[#D4AF75] hover:bg-[#D4AF75]/10 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
              Digital Pass
            </button>
          ) : (
            <Link
              href="/#hero"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-[#D4AF75]/60 text-[#D4AF75] hover:bg-[#D4AF75]/10 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF75]" />
              Digital Pass
            </Link>
          )}

          {onOpenRsvp ? (
            <button
              onClick={onOpenRsvp}
              className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] shadow-gold hover:shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-[#211A19]" />
              RSVP
            </button>
          ) : (
            <Link
              href="/rsvp"
              className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] shadow-gold hover:shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-[#211A19]" />
              RSVP
            </Link>
          )}

          <Link
            href="/admin"
            title="Royal Admin Dashboard"
            className="p-2 rounded-full border border-[#D4AF75]/30 text-[#FFF9F0]/60 hover:text-[#D4AF75] hover:border-[#D4AF75] transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          {onOpenRsvp ? (
            <button
              onClick={onOpenRsvp}
              className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#D4AF75] text-[#211A19]"
            >
              RSVP
            </button>
          ) : (
            <Link
              href="/rsvp"
              className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#D4AF75] text-[#211A19]"
            >
              RSVP
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#FFF9F0] hover:text-[#D4AF75]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#D4AF75]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#3B101F] border-b border-[#D4AF75]/30 px-6 py-6 animate-fadeIn shadow-2xl">
          {guestName && (
            <div className="mb-4 pb-3 border-b border-[#D4AF75]/20 text-xs text-[#D4AF75]">
              Invited: <strong className="text-white">{guestName}</strong>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#FFF9F0]/90 hover:text-[#D4AF75] py-1 border-b border-white/5"
            >
              Home (Invitation)
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-[#FFF9F0]/90 hover:text-[#D4AF75] py-1 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              {onOpenCard && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCard();
                  }}
                  className="w-full py-2.5 rounded-full border border-[#D4AF75] text-[#D4AF75] text-center text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF75]" />
                  View Digital Card &amp; Pass
                </button>
              )}

              {onOpenRsvp ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRsvp();
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-wider text-center"
                >
                  RSVP To Celebrations
                </button>
              ) : (
                <Link
                  href="/rsvp"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-wider text-center"
                >
                  RSVP To Celebrations
                </Link>
              )}

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-center text-[#FFF9F0]/60 hover:text-[#D4AF75] pt-2"
              >
                Admin Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
