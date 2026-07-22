import { FC, ReactElement } from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";

interface LandingViewProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const LandingView: FC<LandingViewProps> = ({
  onLoginClick,
  onRegisterClick,
}): ReactElement => {
  return (
    <div className="min-h-screen bg-primary/5">
      <Header onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <HeroSection onRegisterClick={onRegisterClick} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onRegisterClick={onRegisterClick} />
      <ContactSection />
      <FooterSection />
    </div>
  );
};
