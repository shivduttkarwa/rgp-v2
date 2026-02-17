import HeroSection from "../sections/HeroSection";
import About from "../sections/About";

import PortfolioShowcase from "../extra/Home/PortfolioShowcase";
import PropertyListingSection from "@/sections/PropertyListingSection";
import ServiceSelection from "@/sections/ServiceSelection";
import PhilosophyPillars from "@/sections/Philosophy";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <PropertyListingSection />
      <ServiceSelection />
      <PhilosophyPillars />
      <PortfolioShowcase />
    </>
  );
}
