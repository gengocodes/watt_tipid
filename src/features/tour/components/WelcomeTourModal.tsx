"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePageTour } from "../hooks/usePageTour";

export function WelcomeTourModal() {
  const {
    isClient,
    isAuthenticated,
    user,
    hasAnsweredPrompt,
    markPromptAnswered,
    startActivePageTour,
  } = usePageTour();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isClient && isAuthenticated && user?.id) {
      const answered = hasAnsweredPrompt();
      if (!answered) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isClient, isAuthenticated, user?.id, hasAnsweredPrompt]);

  const handleStartTour = () => {
    markPromptAnswered();
    setIsOpen(false);
    setTimeout(() => {
      startActivePageTour();
    }, 300);
  };

  const handleSkip = () => {
    markPromptAnswered();
    setIsOpen(false);
  };

  if (!isClient || !isAuthenticated || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleSkip()}>
      <DialogContent className="sm:max-w-md p-6 gap-6 rounded-2xl border bg-card shadow-2xl">
        <DialogHeader className="gap-2 text-left">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            Welcome to WattTipid!
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
            Would you like a quick 1-minute guided tour to explore your energy
            dashboard and savings tools?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            className="w-full sm:w-auto rounded-xl text-muted-foreground hover:text-foreground cursor-pointer text-xs"
          >
            Skip for Now
          </Button>

          <Button
            type="button"
            onClick={handleStartTour}
            className="w-full sm:w-auto rounded-xl gap-2 cursor-pointer font-semibold shadow-xs text-xs"
          >
            <Compass className="h-4 w-4" />
            <span>Start Tour</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
