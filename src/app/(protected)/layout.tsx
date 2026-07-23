"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/authentication/store/auth.store";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";
import { AppSidebar } from "@/shared/layout/AppSidebar";
import { AppHeader } from "@/shared/layout/AppHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
