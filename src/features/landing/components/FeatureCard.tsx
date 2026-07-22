import { FC, ReactElement, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export interface FeatureItem {
  title: string;
  tag: string;
  description: string;
  icon: ReactNode;
}

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  feature,
}): ReactElement => {
  return (
    <div className="cursor-pointer group border border-muted hover:border-primary hover:bg-primary/5 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="h-11 w-11 rounded-xl bg-chart-1/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <Badge
            variant="outline"
            className="h-auto text-xxxs font-semibold text-muted-foreground/60 bg-muted border-none px-3 py-1 rounded-full group-hover:scale-110"
          >
            {feature.tag}
          </Badge>
        </div>

        <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
