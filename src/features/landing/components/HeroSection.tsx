import { FC, ReactElement } from "react";
import { Leaf, ArrowRight, ChevronDown } from "lucide-react";
import { DashboardMockup } from "./DashboardMockup";
import { SectionBadge } from "./SectionBadge";
import { Button } from "@/components/ui/button";
import DotField from "@/components/DotField";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
  onRegisterClick,
}): ReactElement => {
  const handleScrollDown = (): void => {
    const nextSection = document.getElementById("features");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between pt-24 md:pt-32 pb-8">
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={20}
          bulgeStrength={100}
          glowRadius={0}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={50}
          cursorForce={0.1}
          bulgeOnly
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 w-full flex flex-col md:flex-row items-center gap-12 md:gap-16 grow z-10">
        <div className="flex-1 space-y-6">
          <SectionBadge className="px-5 py-2 gap-2">
            <Leaf />
            WattTipid · GenAI-Powered · For Filipino Households
          </SectionBadge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Cut Your <span className="text-primary">Electricity Bill</span> —
            The Smart Way
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            WattTipid helps Filipino households track appliance usage, estimate
            monthly bills, and get personalized AI recommendations to save on
            every VECO statement.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              onClick={onRegisterClick}
              className="w-full sm:w-auto font-semibold text-md px-6 py-8 rounded-2xl gap-2 shadow-lg"
            >
              Start Saving Free
              <ArrowRight />
            </Button>

            <Button
              variant="oppposite"
              onClick={handleScrollDown}
              className="w-full sm:w-auto font-semibold text-md px-8 py-8 rounded-2xl gap-2 shadow-lg"
            >
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-3 pt-10 border-t border-muted-foreground/20 mt-12">
            <div>
              <p className="text-2xl font-bold text-primary">₱500+</p>
              <p className="text-xs text-muted-foreground/80">
                avg monthly savings
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">12K+</p>
              <p className="text-xs text-muted-foreground/80">
                households served
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">4.9★</p>
              <p className="text-xs text-muted-foreground/80">user rating</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center relative w-full max-w-lg md:max-w-none">
          <DashboardMockup />
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 z-10">
        <button
          type="button"
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
