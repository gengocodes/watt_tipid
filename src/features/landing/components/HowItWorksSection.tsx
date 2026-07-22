import { FC, ReactElement } from "react";
import { SectionHeader } from "./SectionHeader";
import { HowItWorksStepCard, StepItem } from "./HowItWorksStepCard";

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Register your appliances",
    description:
      "Enter each appliance, its wattage, and your average daily hours of use. WattTipid supports common Philippine household appliances with pre-filled defaults.",
    bullets: ["Takes under 5 minutes", "Pre-filled wattage database"],
  },
  {
    number: "02",
    title: "Get your energy report",
    description:
      "Your personalised dashboard shows estimated monthly kWh, projected bill, and a breakdown by appliance category — all updated in real time.",
    bullets: ["Live calculations", "VECO rate support"],
  },
  {
    number: "03",
    title: "Follow your AI roadmap",
    description:
      "WattTipid ranks savings opportunities by potential impact. Follow the highest-leverage changes first and watch your estimated bill drop month over month.",
    bullets: ["Ranked by savings", "Effort difficulty rating"],
  },
];

export const HowItWorksSection: FC = (): ReactElement => {
  return (
    <section id="works" className="bg-muted/5">
      <div className="mx-auto max-w-7xl px-10 py-28">
        <SectionHeader
          badge="How WattTipid Works"
          title="From signup to savings in three steps"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-8 left-0 right-[28%] h-0.5 bg-muted -z-10" />

          {STEPS.map((step) => (
            <HowItWorksStepCard key={step.number} step={step} />
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-emerald-900 to-primary text-background py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold">₱520</p>
            <p className="text-sm mt-1">avg. monthly savings per household</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">12,000+</p>
            <p className="text-sm mt-1">Filipino families using WattTipid</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">25%</p>
            <p className="text-sm mt-1">
              average reduction in carbon footprint
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">4.9 / 5</p>
            <p className="text-sm mt-1">user satisfaction rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};
