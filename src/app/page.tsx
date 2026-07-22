"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, AuthSplitLayout } from "@/features/authentication";
import { LandingView } from "@/features/landing";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

export default function RootPage() {
  const { isAuthenticated, isLoading, authView, setAuthView } = useAuthStore();
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

  if (authView === "landing") {
    return (
      <LandingView
        onLoginClick={() => setAuthView("login")}
        onRegisterClick={() => setAuthView("register")}
      />
    );
  }

  return (
    <AuthSplitLayout
      view={authView}
      onViewChange={setAuthView}
      onBack={() => setAuthView("landing")}
    />
  );
}
