import type { Metadata } from "next";
import { Cinzel_Decorative, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  variable: "--font-royal",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radhika & Devansh | The Royal Wedding Celebrations",
  description: "Join us in celebrating the royal union of Radhika and Devansh in the City of Lakes, Udaipur. Digital invitation, events schedule, gallery, and personalized guest RSVP.",
  keywords: ["Royal Wedding", "Indian Wedding Invitation", "Radhika and Devansh", "Udaipur Palace Wedding", "Wedding RSVP"],
  authors: [{ name: "Royal Wedding Concierge" }],
  openGraph: {
    title: "Radhika & Devansh | Royal Wedding Invitation",
    description: "Together with our families, we cordially invite you to witness our royal wedding in Udaipur, Rajasthan.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Radhika & Devansh Royal Wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FFF9F0] text-[#211A19] antialiased selection:bg-[#D4AF75]/30 selection:text-[#3B101F]">
        {children}
      </body>
    </html>
  );
}
