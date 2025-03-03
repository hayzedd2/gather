import FeaturesSection from "@/components/homepage/FeaturesSection";
import Footer from "@/components/homepage/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import Navbar from "@/components/homepage/Navbar";
import PreviewSection from "@/components/homepage/PreviewSection";

export default function Home() {
  return (
    <main className="max-w-[1350px] mx-auto px-4 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PreviewSection />
      <Footer />
    </main>
  );
}
