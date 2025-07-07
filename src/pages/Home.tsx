import { ChooseUs } from "@/components/ChooseUs";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { GoDashboard } from "@/components/GoDashboard";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <ChooseUs />
      <GoDashboard />
      <Footer />
    </div>
  );
}
