"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, Check, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

export const ContactPageClient: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Airport Transfer & Travel Support");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(data.message || "Your message has been received by our concierge desk.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setIsError(true);
        setStatusMessage(data.error || "Failed to submit inquiry.");
      }
    } catch (err) {
      setIsError(true);
      setStatusMessage("Network error. Please try again or call the helpline directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Coordinators */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D4AF75]/50 shadow-royal">
            <span className="text-xs uppercase tracking-widest text-[#641C32] font-bold block mb-1">
              Direct Contact Channels
            </span>
            <h2 className="font-royal text-xl sm:text-2xl font-bold text-[#3B101F] mb-4">
              Royal Concierge &amp; Hospitality
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#211A19]/85">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3B101F] text-[#D4AF75] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#3B101F]">24x7 Wedding Helpline</strong>
                  <a href="tel:+919820012345" className="text-[#641C32] hover:underline font-semibold">
                    +91 98200 12345
                  </a>
                  <span className="text-[11px] text-gray-500 block">Round-the-clock coordinator desk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#3B101F]">WhatsApp Guest Concierge</strong>
                  <a
                    href="https://wa.me/919820012345?text=Hello%20Royal%20Wedding%20Concierge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    Chat with Wedding Desk
                  </a>
                  <span className="text-[11px] text-gray-500 block">Instant responses for flight pickups</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3B101F] text-[#D4AF75] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#3B101F]">Email Concierge</strong>
                  <a href="mailto:concierge@royalwedding.com" className="text-[#641C32] hover:underline font-semibold">
                    concierge@royalwedding.com
                  </a>
                  <span className="text-[11px] text-gray-500 block">Formal queries &amp; RSVP updates</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3B101F] text-[#D4AF75] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#3B101F]">Principal Venue Coordinates</strong>
                  <span>City Palace Complex, Old City, Udaipur, Rajasthan 313001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coordinators Cards */}
          <div className="bg-[#2A0C16] text-[#FFF9F0] rounded-3xl p-6 sm:p-8 border border-[#D4AF75]/40 shadow-royal">
            <h3 className="font-royal text-lg font-bold text-[#D4AF75] mb-3">
              Family Hospitality Coordinators
            </h3>
            <div className="space-y-3 text-xs">
              <div className="border-b border-white/10 pb-2.5">
                <span className="font-semibold text-white block">Singhania Family Hospitality (Bride Side)</span>
                <span className="text-white/70">Kunwar Raghav Singhania • +91 98450 11223</span>
              </div>
              <div className="border-b border-white/10 pb-2.5">
                <span className="font-semibold text-white block">Rathore Family Hospitality (Groom Side)</span>
                <span className="text-white/70">Thakur Ranvijay Rathore • +91 99280 44556</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Airport Chauffeurs &amp; Boat Jetty In-charge</span>
                <span className="text-white/70">Udaipur Royal Transports Desk • +91 98290 88990</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#D4AF75]/50 shadow-royal">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#641C32] uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-[#D4AF75]" />
            24x7 Assistance
          </div>
          <h2 className="font-royal text-2xl font-bold text-[#3B101F] mb-6">
            Send an Inquiry to the Concierge
          </h2>

          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm mb-6 ${
                isError
                  ? "bg-rose-50 text-rose-900 border border-rose-300"
                  : "bg-emerald-50 text-emerald-900 border border-emerald-300"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1">
                  Subject / Nature of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                >
                  <option value="Airport Transfer & Travel Support">Airport / Railway Chauffeur Pickup</option>
                  <option value="Hotel Accommodations & Suite Booking">Hotel Accommodations &amp; Suite Booking</option>
                  <option value="Dietary & Special Care">Dietary Preferences &amp; Medical Care</option>
                  <option value="Dress Code & Safa/Saree Styling">Dress Code &amp; Stylist Assistance</option>
                  <option value="RSVP Modification">RSVP Modification</option>
                  <option value="General Inquiry">General Hospitality Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1">
                Your Message / Specific Requirements *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Kindly let us know your flight details, number of guests, or special requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Dispatching to Concierge...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Concierge</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

