import { FC, ReactElement } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="text-center mt-2 text-xs text-muted-foreground">
      {promptText}
      <Button variant="link" onClick={onAction} className="text-xs pl-1">
        {actionLabel}
      </Button>
    </div>
  );
};
