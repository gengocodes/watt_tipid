import { FC, ReactElement } from "react";
import { Check } from "lucide-react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  bullets: string[];
}

interface HowItWorksStepCardProps {
  step: StepItem;
}

export const HowItWorksStepCard: FC<HowItWorksStepCardProps> = ({
  step,
}): ReactElement => {
  return (
    <div className="flex flex-col items-start text-left space-y-4">
      <div className="h-16 w-16 rounded-xl bg-primary text-background font-bold flex items-center justify-center shadow-md shadow-primary/10 text-xl">
        {step.number}
      </div>

      <h3 className="text-lg font-bold pt-1">{step.title}</h3>

      <p className="text-xs md:text-sm text-muted-foreground max-w-sm leading-relaxed">
        {step.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-primary font-semibold mt-1">
        {step.bullets.map((bullet, idx) => (
          <div key={bullet} className="flex items-center gap-1.5">
            {idx > 0 && (
              <span className="text-primary font-extrabold select-none">·</span>
            )}
            {idx === 0 && <Check className="h-4 w-4" />}
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
