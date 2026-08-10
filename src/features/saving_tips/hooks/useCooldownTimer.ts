import { useState, useEffect } from "react";

export function useCooldownTimer(
  nextAllowedAt: string | null | undefined,
  isCooldownActive: boolean | undefined,
): string {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    if (!nextAllowedAt || !isCooldownActive) {
      return;
    }

    const updateTimer = () => {
      const target = new Date(nextAllowedAt).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeRemaining("");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimeRemaining(`${hours}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextAllowedAt, isCooldownActive]);

  return timeRemaining;
}
