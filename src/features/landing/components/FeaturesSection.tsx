import { FC, ReactElement } from "react";
import {
  ChartNoAxesColumn,
  MessageSquare,
  TrendingDown,
  Award,
  Shield,
  Leaf,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { FeatureCard, FeatureItem } from "./FeatureCard";

const FEATURES: FeatureItem[] = [
  {
    title: "Real-Time Monitoring",
    tag: "Dashboard",
    description:
      "Track electricity usage across every appliance. Watch your kWh and projected bill update as you add or change usage patterns.",
    icon: <ChartNoAxesColumn className="h-5 w-5" />,
  },
  {
    title: "AI Energy Advisor",
    tag: "AI Chat",
    description:
      "Ask WattTipid anything about your consumption. It responds in natural language — including Filipino — with actionable, personalised advice.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Bill Reduction Engine",
    tag: "Savings",
    description:
      "Ranked, effort-sorted recommendations show exactly which habit changes will shave the most off your next VECO statement.",
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    title: "Energy Saving Score",
    tag: "Benchmarking",
    description:
      "Your household gets a 0–100 score benchmarked against Philippine averages. Watch it climb as you implement suggestions.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Private by Design",
    tag: "Security",
    description:
      "Your household data is encrypted and never sold or shared. You stay in control of what you share and when.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Carbon Footprint",
    tag: "Sustainability",
    description:
      "See the environmental impact of your consumption alongside your peso savings. Good for your wallet and the planet.",
    icon: <Leaf className="h-5 w-5" />,
  },
];

export const FeaturesSection: FC = (): ReactElement => {
  return (
    <section id="features" className="py-30 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Platform Features"
          title="Everything your household needs to spend less on electricity"
          subtitle="Built specifically for Philippine households and VECO billing cycles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
