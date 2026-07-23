import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { STATUS_THEMES } from "../constants/constants";

interface EnergySavingScoreGaugeProps {
  score: number;
  status: string;
}

export function EnergySavingScoreGauge({
  score,
  status,
}: Readonly<EnergySavingScoreGaugeProps>) {
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  const theme = STATUS_THEMES[status] ?? STATUS_THEMES.Poor;

  return (
    <Card className="shadow-sm rounded-3xl h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
          Energy Saving Score
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground/60 font-medium">
          vs. average PH household
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center p-6 gap-6 flex-1">
        <div className="relative flex items-center justify-center h-40 w-40">
          <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              className={cn("transition-colors duration-500 stroke-muted-foreground/5")}
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className={cn("transition-all duration-700 ease-out", theme.strokeClass)}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-black leading-none tracking-tight">
              {score}
            </span>
            <span className="text-xxxs text-muted-foreground/60 font-bold mt-1.5 uppercase">
              Score
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-1.5">
          <span className={cn("text-xl font-black tracking-tight uppercase", theme.textClass)}>
            {status}
          </span>
          <p className="text-xs font-medium text-muted-foreground max-w-50 leading-relaxed">
            {theme.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}