"use client";

import { useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/authentication";
import { useTourControls } from "@oqlet/react-driver";
import { ROUTE_TOUR_MAP } from "../constants/pageTours.constants";

const emptySubscribe = () => () => {};

export const usePageTour = () => {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const userId = user?.id;

  const getStorageKey = useCallback((): string => {
    if (!userId) return "watt_tipid_tour_seen_anonymous";
    return `watt_tipid_tour_seen_${userId}`;
  }, [userId]);

  const hasAnsweredPrompt = useCallback((): boolean => {
    if (!isClient || typeof window === "undefined") return true;
    const key = getStorageKey();
    return localStorage.getItem(key) === "true";
  }, [isClient, getStorageKey]);

  const markPromptAnswered = useCallback(() => {
    if (typeof window === "undefined") return;
    const key = getStorageKey();
    localStorage.setItem(key, "true");
  }, [getStorageKey]);

  const activeTourId = ROUTE_TOUR_MAP[pathname] || null;
  const activeControls = useTourControls(activeTourId || "");

  const startActivePageTour = useCallback(() => {
    if (!activeTourId || !activeControls) return;

    try {
      activeControls.start();
    } catch {
      // Graceful error recovery if element missing
    }
  }, [activeTourId, activeControls]);

  return {
    isClient,
    isAuthenticated,
    user,
    pathname,
    activeTourId,
    hasAnsweredPrompt,
    markPromptAnswered,
    startActivePageTour,
  };
};
