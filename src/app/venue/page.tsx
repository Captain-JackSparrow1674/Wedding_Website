import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { VenueSection } from "@/components/venue/VenueSection";


export default function VenueDedicatedPage() {
  return (
    <main className="min-h-screen bg-[#211A19]">
      <Navbar />
      <div className="pt-20">
        <VenueSection />
      </div>
      <Footer />
    </main>
  );
}
