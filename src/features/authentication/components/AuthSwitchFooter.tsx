import { FC, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface AuthSwitchFooterProps {
  promptText: string;
  actionLabel: string;
  onAction: () => void;
}

export const AuthSwitchFooter: FC<AuthSwitchFooterProps> = ({
  promptText,
  actionLabel,
  onAction,
}): ReactElement => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider select-none">
          <span className="bg-background px-3 text-muted-foreground/80 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleSignInButton />

      <div className="text-center mt-4 text-xs text-muted-foreground">
        {promptText}
        <Button variant="link" onClick={onAction} className="text-xs pl-1">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};
