"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, AuthSplitLayout } from "@/features/authentication";
import { LandingView } from "@/features/landing";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

export default function RootPage() {
  const [view, setView] = useState<"landing" | "login" | "register">("landing");
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (view === "landing") {
    return (
      <LandingView
        onLoginClick={() => setView("login")}
        onRegisterClick={() => setView("register")}
      />
    );
  }

  return (
    <AuthSplitLayout
      view={view}
      onViewChange={setView}
      onBack={() => setView("landing")}
    />
  );
}
