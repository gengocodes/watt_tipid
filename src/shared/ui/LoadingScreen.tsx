import { FC } from "react";
import { AppLogo } from "./AppLogo";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  message = "Verifying session...",
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 select-none">
      <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-sm max-w-xs w-full space-y-4 animate-in fade-in-50 duration-200">
        <AppLogo size={40} />

        <div className="space-y-1">
          <span className="font-bold tracking-tight text-foreground text-base block">
            WattTipid
          </span>
          <span className="text-xs text-muted-foreground font-medium block">
            {message}
          </span>
        </div>

        <div className="w-full pt-1">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
