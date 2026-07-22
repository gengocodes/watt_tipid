import { FC, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface AuthDecorCirclesProps {
  className?: string;
}

export const AuthDecorCircles: FC<AuthDecorCirclesProps> = ({
  className,
}): ReactElement => {
  return (
    <div className={cn("absolute opacity-10 pointer-events-none", className)}>
      <svg width="400" height="400" viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
