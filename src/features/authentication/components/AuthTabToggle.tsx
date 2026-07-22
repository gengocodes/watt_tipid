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
  const isRegister = activeView === "register";

  return (
    <div className="relative flex bg-muted p-1 rounded-lg mb-8 select-none">
      <div
        className={cn(
          "absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-primary rounded-lg shadow-sm transition-transform duration-300 ease-in-out",
          isRegister ? "translate-x-full" : "translate-x-0",
        )}
      />

      <button
        type="button"
        onClick={() => onViewChange("login")}
        className={cn(
          "relative z-10 flex-1 text-center py-3 text-sm font-semibold rounded-lg transition-colors duration-300 cursor-pointer focus:outline-hidden",
          activeView === "login" ? "text-muted" : "text-muted-foreground",
        )}
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => onViewChange("register")}
        className={cn(
          "relative z-10 flex-1 text-center py-3 text-sm font-semibold rounded-lg transition-colors duration-300 cursor-pointer focus:outline-hidden",
          activeView === "register" ? "text-muted" : "text-muted-foreground",
        )}
      >
        Register
      </button>
    </div>
  );
};
