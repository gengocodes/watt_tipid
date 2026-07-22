import { FC, ReactElement } from "react";
import { MoveRight   } from "lucide-react";
import { SectionBadge } from "./SectionBadge";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onRegisterClick: () => void;
}

export const CTASection: FC<CTASectionProps> = ({
  onRegisterClick,
}): ReactElement => {
  const scrollToFeatures = (): void => {
    const features = document.getElementById("features");
    if (features) {
      features.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-chart-1/5 border-t border-b border-muted">
      <div className="mx-auto max-w-7xl px-6 text-center space-y-6">
        <SectionBadge>Free to Get Started</SectionBadge>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
          Your next VECO bill could be{" "}
          <span className="text-primary">₱500 lighter</span>
        </h2>

        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Join over 12,000 Filipino households that have already reduced their
          electricity costs. No hardware required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={onRegisterClick}
            className="w-full sm:w-auto text-base font-semibold p-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            Create Your Free Account
            <MoveRight className="w-4 h-4" />
          </Button>

          <Button
            variant="oppposite"
            onClick={scrollToFeatures}
            className="w-full sm:w-auto text-base font-semibold p-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            Explore Features
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/50 pt-2">
          No credit card needed · Works with any Philippine electricity provider
        </p>
      </div>
    </section>
  );
};
