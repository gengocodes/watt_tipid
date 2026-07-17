"use client";

import { useAuth } from "@/features/authentication";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">
        Welcome to WattTipid,{" "}
        <span className="font-semibold text-primary">{user?.first_name}</span>!
      </p>
      <Button variant="destructive" onClick={() => logout()}>
        Sign Out
      </Button>
    </div>
  );
}
