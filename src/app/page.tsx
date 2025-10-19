import { CTASection } from "@/components/home/cta";
import { FeaturesSection } from "@/components/home/feature-selection";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/home/hero";
import { HowItWorksSection } from "@/components/home/how-it-works";
import { ProblemSection } from "@/components/home/problem-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
