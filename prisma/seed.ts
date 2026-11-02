import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Royal Wedding database...");

  // 1. Settings
  await prisma.weddingSettings.upsert({
    where: { id: "settings-1" },
    update: {},
    create: {
      id: "settings-1",
      brideName: "Radhika",
      groomName: "Devansh",
      brideParents: "Smt. Sunita & Shri Vikramaditya Singhania",
      groomParents: "Smt. Rajeshwari & Shri Mahendra Pratap Rathore",
      weddingDate: new Date("2026-12-18T18:00:00Z"),
      weddingCity: "Udaipur, Rajasthan",
      heroTagline: "Together with our families, we cordially invite you to witness and celebrate our royal union.",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b939db20.mp3?filename=indian-flute-and-sitar-ambient-110825.mp3",
    },
  });

  // 2. Admin Users
  await prisma.admin.upsert({
    where: { email: "admin@royalwedding.com" },
    update: {},
    create: {
      email: "admin@royalwedding.com",
      name: "Maharaj Devansh (Super Admin)",
      passwordHash: "royal2026",
      role: "SUPER_ADMIN",
    },
  });

  await prisma.admin.upsert({
    where: { email: "concierge@royalwedding.com" },
    update: {},
    create: {
      email: "concierge@royalwedding.com",
      name: "Udaipur Palace Hospitality Team",
      passwordHash: "royal2026",
      role: "CONCIERGE",
    },
  });

  // 3. Wedding Events
  const eventsData = [
    {
      title: "Ganesh Sthapana & Auspicious Haldi",
      slug: "haldi-ceremony",
      ceremonyDate: new Date("2026-12-16T10:00:00Z"),
      startTime: "10:30 AM",
      endTime: "02:00 PM",
      venueName: "The Courtyard of Marigolds, Jagmandir Island Palace",
      venueAddress: "Lake Pichola, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur",
      description: "An auspicious morning invoking Lord Ganesha's blessings followed by joyful haldi rituals, fragrant flower petal showers, and organic ubtan with traditional Manganiyar folk singers.",
      dressCode: "Sunshine Yellow, Ochre & Floral Pastels",
      dressCodeColors: "#EAB308,#F59E0B,#FEF08A,#FFFFFF",
      imageUrl: "/images/gallery/haldi-1.jpg",
      orderIndex: 1,
    },
    {
      title: "Mehendi by the Lake & Royal Bazaar",
      slug: "mehendi-ceremony",
      ceremonyDate: new Date("2026-12-16T16:00:00Z"),
      startTime: "04:30 PM",
      endTime: "09:00 PM",
      venueName: "Sunset Terrace, The Leela Palace",
      venueAddress: "Pichola, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      description: "Intricate henna artistry adorned on hands, artisanal bangle bazaar, fragrant ittar perfume counters, Rajasthani chaat stalls, and soulful sufi sitar melodies as the sun sets over the lake.",
      dressCode: "Emerald Green, Mint, Peacock Teal & Festive Kurtas",
      dressCodeColors: "#047857,#10B981,#0D9488,#FDE047",
      imageUrl: "/images/gallery/mehendi-1.jpg",
      orderIndex: 2,
    },
    {
      title: "Sangeet Night: The Royal Musical Gala",
      slug: "sangeet-night",
      ceremonyDate: new Date("2026-12-17T19:00:00Z"),
      startTime: "07:30 PM",
      endTime: "01:00 AM",
      venueName: "The Grand Darbar Hall, City Palace",
      venueAddress: "City Palace Complex, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=City+Palace+Udaipur",
      description: "An evening of dazzling family choreography, musical showdowns, live celebrity performance, high-energy dhol beats, royal cocktails, and an opulent royal feast.",
      dressCode: "Regal Burgundy, Champagne Gold, Sequins & Velvet Bandhgalas",
      dressCodeColors: "#641C32,#D4AF75,#B45309,#1E1B4B",
      imageUrl: "/images/gallery/sangeet-1.jpg",
      orderIndex: 3,
    },
    {
      title: "The Royal Wedding: Varmala & Sacred Phere",
      slug: "royal-wedding-phere",
      ceremonyDate: new Date("2026-12-18T16:00:00Z"),
      startTime: "04:00 PM",
      endTime: "10:30 PM",
      venueName: "The Lakeside Royal Mandap, Zenana Mahal",
      venueAddress: "City Palace, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=Zenana+Mahal+Udaipur",
      description: "The grand royal procession (Baraat) with royal brass band and vintage carriages, the divine Varmala under a shower of 10,000 red roses, followed by sacred Vedic Phere by the sacred fire.",
      dressCode: "Traditional Regal Red, Antique Gold, Ivory Sherwanis & Royal Turbans",
      dressCodeColors: "#881337,#D4AF75,#FFFBEB,#7F1D1D",
      imageUrl: "/images/gallery/wedding-1.jpg",
      orderIndex: 4,
    },
    {
      title: "The Royal Grand Reception & Banquet",
      slug: "royal-reception",
      ceremonyDate: new Date("2026-12-19T19:30:00Z"),
      startTime: "07:30 PM",
      endTime: "11:30 PM",
      venueName: "The Manek Chowk & Mewar Ballroom",
      venueAddress: "City Palace, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=Manek+Chowk+Udaipur",
      description: "An aristocratic evening celebrating the newlyweds with global symphony orchestra, champagne toasts, multi-course imperial dinner, and royal fireworks illuminating the Udaipur skyline.",
      dressCode: "Black Tie, Western Tuxedo, Imperial Evening Gowns or Formal Sherwani",
      dressCodeColors: "#18181B,#D4AF75,#4C1D95,#FFFFFF",
      imageUrl: "/images/gallery/reception-1.jpg",
      orderIndex: 5,
    },
  ];

  for (const ev of eventsData) {
    await prisma.weddingEvent.upsert({
      where: { slug: ev.slug },
      update: ev,
      create: ev,
    });
  }

  // 4. Guests & Personalized Invitations
  const guestsData = [
    {
      name: "The Kapoor Family",
      email: "kapoor.family@gmail.com",
      phone: "+91 98201 54321",
      familyName: "Kapoor Family",
      guestLimit: 4,
      token: "royal-kapoor-family",
      customMessage: "Honored elders and family, your presence and blessings mean the universe to Radhika and Devansh as we begin this sacred voyage.",
      status: "OPENED",
      notes: "VIP family suite reserved at The Leela Palace",
    },
    {
      name: "Dr. Rajesh & Sunita Sharma",
      email: "dr.sharma@healthclinic.org",
      phone: "+91 98110 99887",
      familyName: "Sharma Family",
      guestLimit: 2,
      token: "royal-sharma-couple",
      customMessage: "Dear Uncle & Aunty, we cannot wait to dance together at the Sangeet and receive your gracious blessings.",
      status: "RSVP_COMPLETED",
      notes: "Requires ground floor access / wheelchair assistance at Mandap",
    },
    {
      name: "Vikramaditya & Gayatri Rathore",
      email: "vikram.rathore@royalheritage.in",
      phone: "+91 99280 11223",
      familyName: "Rathore Family",
      guestLimit: 5,
      token: "royal-rathore-family",
      customMessage: "Beloved family, join us in Udaipur for three days of royal ceremonies, traditions, and unforgettable memories.",
      status: "SENT",
      notes: "Attending all events with 5 members",
    },
    {
      name: "Aarav Singhania & Guest",
      email: "aarav.singhania@venture.co",
      phone: "+91 98450 77654",
      familyName: "Singhania",
      guestLimit: 2,
      token: "royal-aarav-singhania",
      customMessage: "Brother Aarav, the baraat is waiting for your dance entrance! Pack your most royal sherwani.",
      status: "RSVP_COMPLETED",
      notes: "Groom's best friend and college roommate",
    },
    {
      name: "Pooja & Rohan Mehra",
      email: "pooja.mehra@designstudio.in",
      phone: "+91 98765 43210",
      familyName: "Mehra Family",
      guestLimit: 3,
      token: "royal-mehra-family",
      customMessage: "Dearest Pooja and Rohan, your artistic taste has inspired so much of our wedding decor. Come celebrate with us!",
      status: "OPENED",
      notes: "Strict Jain dietary preferences",
    },
    {
      name: "Ananya Sen",
      email: "ananya.sen@oxfordalumni.org",
      phone: "+91 99001 22334",
      familyName: "Sen",
      guestLimit: 1,
      token: "royal-ananya-sen",
      customMessage: "Dear Ananya, from study sessions in Oxford to the royal palaces of Rajasthan, let us make magic together!",
      status: "SENT",
      notes: "Bride's closest childhood friend travelling from London",
    },
  ];

  const dbEvents = await prisma.weddingEvent.findMany({ orderBy: { orderIndex: "asc" } });

  for (const g of guestsData) {
    const existingGuest = await prisma.guest.findFirst({
      where: { name: g.name },
    });

    let guestId = existingGuest?.id;
    if (!guestId) {
      const createdGuest = await prisma.guest.create({
        data: {
          name: g.name,
          email: g.email,
          phone: g.phone,
          familyName: g.familyName,
          guestLimit: g.guestLimit,
          notes: g.notes,
        },
      });
      guestId = createdGuest.id;
    }

    const invitation = await prisma.invitation.upsert({
      where: { token: g.token },
      update: {
        status: g.status,
        customMessage: g.customMessage,
      },
      create: {
        guestId,
        token: g.token,
        customMessage: g.customMessage,
        status: g.status,
        openedAt: g.status !== "SENT" ? new Date() : null,
        sentAt: new Date(),
        rsvpAt: g.status === "RSVP_COMPLETED" ? new Date() : null,
      },
    });

    // Create sample RSVPs for completed ones
    if (g.status === "RSVP_COMPLETED") {
      const existingRsvp = await prisma.rsvp.findFirst({
        where: { invitationId: invitation.id },
      });

      if (!existingRsvp) {
        const rsvp = await prisma.rsvp.create({
          data: {
            invitationId: invitation.id,
            guestId,
            attending: true,
            totalAttending: g.guestLimit,
            dietaryPreference: g.name.includes("Mehra") ? "Jain (Strict, no root veggies)" : "Pure Vegetarian",
            allergies: "None",
            needsHotelStay: true,
            needsShuttle: true,
            songRequest: "Gallan Goodiyaan & London Thumakda",
            specialRequests: "Looking forward to an extraordinary weekend!",
          },
        });

        for (const ev of dbEvents) {
          await prisma.rsvpEvent.create({
            data: {
              rsvpId: rsvp.id,
              weddingEventId: ev.id,
              attending: true,
              count: g.guestLimit,
            },
          });
        }
      }
    }
  }

  // 5. Gallery Images & Videos
  const galleryMedia = [
    {
      title: "Royal Palace Portrait",
      category: "couple",
      imageUrl: "/images/gallery/couple-1.jpg",
      mediaType: "image",
      caption: "Radhika and Devansh at the historic courtyards of Udaipur",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      title: "Golden Hour Romance",
      category: "pre-wedding",
      imageUrl: "/images/gallery/prewedding-1.jpg",
      mediaType: "image",
      caption: "Sunset over Lake Pichola during pre-wedding shoot",
      isFeatured: true,
      orderIndex: 2,
    },
    {
      title: "Royal Wedding Teaser & Highlights",
      category: "highlights",
      imageUrl: "/images/gallery/highlights-1.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      caption: "Cinematic trailer of the royal wedding celebrations in the City of Lakes",
      isFeatured: true,
      orderIndex: 3,
    },
    {
      title: "Intricate Henna Rituals",
      category: "mehendi",
      imageUrl: "/images/gallery/mehendi-1.jpg",
      mediaType: "image",
      caption: "Traditional dark Rajasthani mehendi inscribed with secret initials",
      isFeatured: false,
      orderIndex: 4,
    },
    {
      title: "Mehendi Festivities & Laughter",
      category: "mehendi",
      imageUrl: "/images/gallery/mehendi-2.jpg",
      mediaType: "image",
      caption: "Family joy, folk music, and colourful lehengas by the sunset terrace",
      isFeatured: false,
      orderIndex: 5,
    },
    {
      title: "Auspicious Marigold Glow",
      category: "haldi",
      imageUrl: "/images/gallery/haldi-1.jpg",
      mediaType: "image",
      caption: "Fragrant turmeric pastes and yellow flower petal showers",
      isFeatured: false,
      orderIndex: 6,
    },
    {
      title: "Joyful Haldi Moments",
      category: "haldi",
      imageUrl: "/images/gallery/haldi-2.jpg",
      mediaType: "image",
      caption: "Playful turmeric rituals with cousins and family elders",
      isFeatured: false,
      orderIndex: 7,
    },
    {
      title: "The Regal Varmala",
      category: "wedding",
      imageUrl: "/images/gallery/wedding-1.jpg",
      mediaType: "image",
      caption: "Exchanging fragrant Mogra garlands under the palace stars",
      isFeatured: true,
      orderIndex: 8,
    },
    {
      title: "Sacred Phere & Seven Vows",
      category: "wedding",
      imageUrl: "/images/gallery/wedding-2.jpg",
      mediaType: "image",
      caption: "Circling the sacred Agni kund with eternal promises of love and duty",
      isFeatured: false,
      orderIndex: 9,
    },
    {
      title: "Sangeet Beats & Joy",
      category: "sangeet",
      imageUrl: "/images/gallery/sangeet-1.jpg",
      mediaType: "image",
      caption: "Celebratory choreography under crystal chandeliers",
      isFeatured: false,
      orderIndex: 10,
    },
    {
      title: "Royal Sangeet Celebration",
      category: "sangeet",
      imageUrl: "/images/gallery/sangeet-2.jpg",
      mediaType: "image",
      caption: "Dynamic dance performances and live percussion beats",
      isFeatured: false,
      orderIndex: 11,
    },
    {
      title: "Imperial Reception Ballroom",
      category: "reception",
      imageUrl: "/images/gallery/reception-1.jpg",
      mediaType: "image",
      caption: "The majestic banquet setting adorned in gold and candlelights",
      isFeatured: false,
      orderIndex: 12,
    },
    {
      title: "Toast to New Beginnings",
      category: "reception",
      imageUrl: "/images/gallery/reception-2.jpg",
      mediaType: "image",
      caption: "Imperial toasts, symphony melodies, and greetings from distinguished guests",
      isFeatured: false,
      orderIndex: 13,
    },
    {
      title: "Lakeside Sunset Vows",
      category: "pre-wedding",
      imageUrl: "/images/gallery/prewedding-2.jpg",
      mediaType: "image",
      caption: "Quiet reflections beside the marble jharokhas of Udaipur",
      isFeatured: false,
      orderIndex: 14,
    },
    {
      title: "Royal Glance of Forever",
      category: "couple",
      imageUrl: "/images/gallery/couple-2.jpg",
      mediaType: "image",
      caption: "A timeless glance captured within the heritage Mewar corridor",
      isFeatured: false,
      orderIndex: 15,
    },
  ];

  await prisma.galleryImage.deleteMany();
  for (const media of galleryMedia) {
    await prisma.galleryImage.create({ data: media });
  }

  // 6. Heartfelt Wishes
  const wishesData = [
    {
      guestName: "Maharaj Gajendra Singh & Family",
      relation: "Family Elder",
      message: "May the divine grace of Shree Eklingji always illuminate your path together. Congratulations Radhika and Devansh on this grand royal union!",
      isApproved: true,
    },
    {
      guestName: "Aditi Rao & Siddharth",
      relation: "College Friends",
      message: "From college cafeteria chats to witnessing you both getting married in a 400-year-old palace! So thrilled and can't wait for Sangeet night!",
      isApproved: true,
    },
    {
      guestName: "Dr. Alok Verma",
      relation: "Well-wisher",
      message: "Heartiest congratulations to the Singhania and Rathore families. Looking forward to celebrating this timeless bond.",
      isApproved: true,
    },
    {
      guestName: "Mira & Kabir Oberoi",
      relation: "Close Friend",
      message: "Sending both of you endless love, joy, and laughter. You two are made for each other. See you in Udaipur!",
      isApproved: true,
    },
  ];

  await prisma.guestWish.deleteMany();
  for (const w of wishesData) {
    await prisma.guestWish.create({ data: w });
  }

  // 7. Sample Concierge Contact Inquiries
  await prisma.contactMessage.deleteMany();
  await prisma.contactMessage.create({
    data: {
      name: "Mrs. Meenakshi Singhania",
      email: "meenakshi@familytrust.org",
      phone: "+91 98200 44556",
      subject: "Private Airport Chauffeur Request",
      message: "Arriving at Udaipur Airport on Dec 16 at 11:30 AM via Indigo 6E-204. Kindly confirm our airport transfer car to The Leela Palace.",
      status: "UNREAD",
    },
  });

  console.log("Database seeded successfully with complete royal wedding data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
