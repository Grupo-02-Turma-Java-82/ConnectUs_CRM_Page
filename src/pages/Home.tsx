import { ChooseUs } from "@/components/ChooseUs";
import { Features } from "@/components/Features";
import { GoDashboard } from "@/components/GoDashboard";
import { Hero } from "@/components/Hero";


export function Home() {
  return (
    <div>
      
      <Hero />
      <Features />
      <ChooseUs />
      <GoDashboard />
      
    </div>
  );
}
