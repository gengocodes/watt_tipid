"use client";

import { useAuth } from "@/features/authentication";
import { toast } from "react-toastify";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  const { user } = useAuth();

  const getInitials = (firstName?: string, lastName?: string) => {
    const f = firstName?.charAt(0) ?? "";
    const l = lastName?.charAt(0) ?? "";
    return (f + l).toUpperCase() || "WT";
  };

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b bg-sidebar px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground" />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer relative h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => toast.info("Coming soon...")}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-sidebar-primary" />
        </button>

        <Separator orientation="vertical" />
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end md:flex">
            <span className="text-sm font-semibold text-foreground leading-none">
              {user ? `${user.first_name} ${user.last_name}` : "Juan Dela Cruz"}
            </span>
            <span className="text-xxs text-muted-foreground mt-1">
              {user?.email ?? "juandelacruz@email.com"}
            </span>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background font-bold text-sm">
            {getInitials(user?.first_name, user?.last_name)}
          </div>
        </div>
      </div>
    </header>
  );
}
