import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PreviewSection from "@/components/PreviewSection";

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
