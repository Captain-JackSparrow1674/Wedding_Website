# 👑 Radhika & Devansh — The Royal Wedding & Guest Management Platform

A production-quality digital Indian wedding invitation, personalized guest portal, and comprehensive event management SaaS platform. Crafted with a royal palace aesthetic (Maroon, Royal Burgundy, Champagne Gold, and Ivory) celebrating the union of **Princess Radhika Singhania** and **Kunwar Devansh Rathore** in the City of Lakes, Udaipur, Rajasthan.

---

## ✨ Features Overview

### 1. 🏰 Main Royal Wedding Experience
- **Cinematic Royal Hero**: High-resolution palace aesthetics, traditional invocation (*॥ श्री गणेशाय नमः ॥ Shubha Vivaah*), royal gold calligraphy, and real-time live countdown timer to the wedding ceremonies.
- **Ambient Royal Music**: Embedded Indian instrumental flute & sitar player with pulsing gold badge, audio visualizer, play/pause controls, and volume handling.
- **The Royal Couple & Love Story**: Profiles of the bride & groom, ancestral dynasties (Singhania & Rathore), and interactive love story milestone timeline (*Oxford 2019 → Jaipur 2022 → Udaipur Proposal 2024 → Sacred Phere 2026*).
- **Ceremonies & Itinerary**: 5 royal events with multi-tab switching:
  1. *Ganesh Sthapana & Auspicious Haldi* (Jagmandir Island Palace)
  2. *Royal Mehendi by the Lake* (The Leela Palace)
  3. *Sangeet Night: The Royal Musical Gala* (The Grand Darbar Hall, City Palace)
  4. *The Royal Wedding: Varmala & Sacred Phere* (Zenana Mahal)
  5. *The Royal Grand Reception & Banquet* (Manek Chowk)
  - Timings, addresses, Google Maps directions, dress code guidelines with visual color swatch palette pills, and instant event-specific RSVP.
- **Royal Photo Gallery**: Masonry grid with category filters (*Royal Couple, Pre-Wedding, Mehendi, Haldi, Sangeet, The Mandap, Reception*) and full-screen lightbox modal with next/prev navigation and photo counters.
- **Venue & Travel Concierge**: Detailed logistics for Maharana Pratap Airport (UDR), Udaipur Railway Station, Lake Pichola boat transfers, room block booking codes (`ROYALUNION26`), and 24x7 WhatsApp concierge support.
- **Royal Guestbook (Wishes Wall)**: Real-time blessings submission form with instant approval, relation tags, and celebratory wall.
- **Wedding FAQ**: Royal accordion addressing dress codes, winter weather in Udaipur, gifts policy, and dietary care.

---

### 2. 💌 Personalized Invitation Links (`/invite/[token]`)
- **Unguessable Secure Tokens**: Each guest/family receives a unique URL (e.g. `/invite/royal-kapoor-family`, `/invite/royal-sharma-couple`).
- **Zero-Friction Access**: No guest account creation required.
- **Personalized VIP Banner**: Automatically displays personalized welcome greeting, custom note from the couple, and guest quota (*"Admits up to 4 Guests"*).
- **Auto Status Tracking**: Automatically transitions status from `SENT` → `OPENED` (recording timestamp) when visited, and to `RSVP_COMPLETED` upon RSVP.
- **WhatsApp Invitation Sharing**: Generates pre-formatted WhatsApp invitation messages with customized text and personalized invite link.
- **Digital Invitation Pass**: Regal digital card with Ganesha shloka, royal monogram crest, ceremony dates, and 1-click print/save pass.

---

### 3. 🎯 Smart RSVP System
- **Guest Quota Enforcement**: Allows guests to specify accompanying attendees up to their allocated limit.
- **Ceremony-by-Ceremony RSVP**: Guests can choose which specific events they will attend (Haldi, Mehendi, Sangeet, Phere, Reception).
- **Dietary Accommodations**: Pure Vegetarian (Satvik), Strict Jain (no onion/garlic/root vegetables), Non-Vegetarian (Imperial Dishes), Vegan, and specific allergy notes.
- **Logistics Assistance**: Checkboxes for hotel suite blocks and airport/railway chauffeur pickup.
- **Sangeet Song Requests**: Guests can submit favorite dance numbers to the DJ playlist.
- **Confetti Celebration**: Canvas-confetti celebration on RSVP confirmation with instant summary pass.

---

### 4. 🛡️ Comprehensive Royal Admin Portal (`/admin`)
- **Protected Administrator Login**:
  - **Email**: `admin@royalwedding.com`
  - **Password**: `royal2026`
- **Real-Time KPI Dashboard**:
  - Total Invited Guests
  - Confirmed Attendees & Total Headcount
  - Pending Responses
  - Declined Invitations
  - Hotel Rooms & Airport Shuttle Requests
- **Visual Analytics**:
  - Ceremony-wise headcount progress bars across all 5 events.
- **Guest & Invitation Management**:
  - Real-time search across names, families, emails, and phones.
  - Filter by status (`ALL`, `RSVP_COMPLETED`, `OPENED`, `SENT`, `PENDING`).
  - 1-Click WhatsApp invitation sender with personalized text.
  - 1-Click invite link copier.
  - Regenerate or revoke invitation tokens.
  - Add new guest with custom message and quota.
  - Delete guest.
  - **CSV Export**: 1-click download of all guest and RSVP data as formatted CSV.
- **Event & Gallery Management**:
  - View ceremonies, timings, and map links.
  - Upload new gallery photos with category tags and delete photos.
  - View and moderate guest wishes.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, Turbopack, TypeScript) |
| **Styling** | Tailwind CSS v4, Custom Royal Palettes, Gold Gradients & Frames |
| **Icons & UI** | Lucide React, Canvas Confetti |
| **Database & ORM** | Prisma ORM with SQLite (zero-config, PostgreSQL ready) |
| **Typography** | Google Fonts: Cinzel Decorative, Cormorant Garamond, Plus Jakarta Sans |
| **Audio** | HTML5 Audio API with custom Indian Sitar/Flute Shehnai player |

---

## 🚀 Quickstart & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed Royal Demo Data
The project uses Prisma ORM configured out-of-the-box with SQLite (`prisma/dev.db`):
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🔑 Demo Access & Test Links

### 👑 Admin Dashboard
- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email**: `admin@royalwedding.com`
- **Password**: `royal2026`

### 💌 Sample Personalized Invitation Links
- **The Kapoor Family** (4 Guests, Status: Opened): [http://localhost:3000/invite/royal-kapoor-family](http://localhost:3000/invite/royal-kapoor-family)
- **Dr. Rajesh & Sunita Sharma** (2 Guests, Status: RSVP Completed): [http://localhost:3000/invite/royal-sharma-couple](http://localhost:3000/invite/royal-sharma-couple)
- **Vikramaditya & Gayatri Rathore** (5 Guests, Status: Sent): [http://localhost:3000/invite/royal-rathore-family](http://localhost:3000/invite/royal-rathore-family)
- **Aarav Singhania** (2 Guests, Groom's Friend): [http://localhost:3000/invite/royal-aarav-singhania](http://localhost:3000/invite/royal-aarav-singhania)
- **Pooja & Rohan Mehra** (3 Guests, Jain Dietary): [http://localhost:3000/invite/royal-mehra-family](http://localhost:3000/invite/royal-mehra-family)
- **Ananya Sen** (1 Guest, International Traveler): [http://localhost:3000/invite/royal-ananya-sen](http://localhost:3000/invite/royal-ananya-sen)

---

## 🗄️ Database Architecture (`prisma/schema.prisma`)

- **`Admin`**: Authorized platform administrators.
- **`Guest`**: Invited guests, family names, contact info, allocated guest limit.
- **`Invitation`**: Unique unguessable tokens, custom welcome note, status (`PENDING`, `SENT`, `OPENED`, `RSVP_COMPLETED`), timestamps (`sentAt`, `openedAt`, `rsvpAt`).
- **`WeddingEvent`**: Ceremony title, date, start/end time, venue, address, Google Maps link, dress code description, recommended color swatches, banner photo, order.
- **`Rsvp`**: Attendance decision, headcount, dietary preference (Vegetarian, Jain, Non-Veg, Vegan), allergies, hotel stay, airport shuttle, song request, special notes.
- **`RsvpEvent`**: Detailed event-by-event attendance mapping.
- **`GalleryImage`**: Curated photos categorized by event and featured flags.
- **`GuestWish`**: Blessings wall with guest name, relationship tag, and message.
- **`WeddingSettings`**: Couple names, parents' names, dates, city, and ambient wedding music URL.

---

## 🌐 Switching to PostgreSQL for Cloud Production
To switch from SQLite to PostgreSQL (e.g. Supabase, Neon, AWS RDS, Railway):
1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"` in `.env`.
3. Run `npx prisma db push` and `npx tsx prisma/seed.ts`.
