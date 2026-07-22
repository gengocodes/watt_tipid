import { FC, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface AuthTabToggleProps {
  activeView: "login" | "register";
  onViewChange: (view: "login" | "register") => void;
}

export const AuthTabToggle: FC<AuthTabToggleProps> = ({
  activeView,
  onViewChange,
}): ReactElement => {
  return (
    <div className="flex bg-muted p-1 rounded-lg mb-8">
      <button
        onClick={() => onViewChange("login")}
        className={cn(
          "flex-1 text-center py-3 text-sm font-semibold rounded-lg transition-all cursor-pointer",
          activeView === "login"
            ? "bg-primary text-muted"
            : "text-muted-foreground",
        )}
      >
        Log In
      </button>
      <button
        onClick={() => onViewChange("register")}
        className={cn(
          "flex-1 text-center py-3 text-sm font-semibold rounded-lg transition-all cursor-pointer",
          activeView === "register"
            ? "bg-primary text-muted"
            : "text-muted-foreground",
        )}
      >
        Register
      </button>
    </div>
  );
};
