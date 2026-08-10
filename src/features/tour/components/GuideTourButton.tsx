"use client";

import { HelpCircle } from "lucide-react";
import { usePageTour } from "../hooks/usePageTour";

export function GuideTourButton() {
  const { startActivePageTour } = usePageTour();

  return (
    <button
      type="button"
      onClick={startActivePageTour}
      className="cursor-pointer relative h-9 w-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all active:scale-95"
      title="Take Page Tour"
      aria-label="Take Page Tour"
    >
      <HelpCircle className="h-5 w-5" />
    </button>
  );
}
