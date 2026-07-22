import { FC } from "react";
import { Spinner } from "@/components/ui/spinner";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  message = "Verifying session...",
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Spinner className="w-8 h-8 text-primary mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
