"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/authentication";
import { AppLogo } from "@/shared/ui/AppLogo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import {
  ChartNoAxesColumn,
  Zap,
  MessageSquare,
  Lightbulb,
  Settings,
  LogOut,
  TextAlignJustify,
  Circle,
  X,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { state, isMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const menuItems: {
    title: string;
    url: string;
    icon: typeof ChartNoAxesColumn;
    disabled?: boolean;
  }[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartNoAxesColumn,
    },
    {
      title: "Appliances",
      url: "/appliances",
      icon: Zap,
    },
    {
      title: "AI Advisor",
      url: "/chat",
      icon: MessageSquare,
    },
    {
      title: "Savings Tips",
      url: "/savings-tips",
      icon: Lightbulb,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader
        className={cn(
          "h-20 border-b flex flex-row items-center transition-all duration-200",
          isCollapsed ? "px-0 justify-center" : "px-4 sm:px-6 justify-between"
        )}
      >
        <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "gap-3")}>
          <AppLogo size={isCollapsed ? 32 : 40} />

          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base">WattTipid</span>
              <span className="text-xxs leading-none text-muted-foreground font-medium">
                GenAI Energy Advisory
              </span>
            </div>
          )}
        </div>

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(false)}
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer shrink-0"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </Button>
        )}
      </SidebarHeader>


      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="gap-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  size="lg"
                  render={
                    item.disabled ? (
                      <button
                        onClick={() => toast.info("Coming soon...")}
                        className={cn(
                          "flex items-center w-full gap-3 text-muted-foreground/40 cursor-pointer",
                          isCollapsed ? "justify-center" : "",
                        )}
                        title="Coming soon..."
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                        className={cn(
                          "flex items-center w-full gap-3",
                          isCollapsed ? "justify-center" : "",
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />

                        {!isCollapsed && (
                          <span className="font-medium text-sm flex-1">
                            {item.title}
                          </span>
                        )}

                        {isActive && !isCollapsed && (
                          <Circle className="h-2 w-2 rounded-full bg-sidebar-primary" />
                        )}
                      </Link>
                    )
                  }
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t py-3 flex flex-col gap-1">
        <SidebarMenuButton
          tooltip={state === "collapsed" ? "Expand" : "Collapse"}
          onClick={toggleSidebar}
          className="flex items-center gap-3 w-full py-2.5 rounded-xl text-foreground transition-colors"
          render={
            <button
              className={cn(
                "flex items-center gap-3 w-full",
                isCollapsed && "justify-center",
              )}
            >
              <TextAlignJustify className="h-5 w-5" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Collapse</span>
              )}
            </button>
          }
        />

        <SidebarMenuButton
          tooltip="Log Out"
          onClick={() => logout()}
          className="flex items-center gap-3 w-full py-2.5 rounded-xl text-foreground hover:bg-destructive/5 hover:text-destructive transition-colors"
          render={
            <button
              className={cn(
                "flex items-center gap-3 w-full text-left",
                isCollapsed && "justify-center",
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Log Out</span>
              )}
            </button>
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
