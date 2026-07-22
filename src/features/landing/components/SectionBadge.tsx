import { FC, ReactElement, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: ReactNode;
  className?: string;
}

export const SectionBadge: FC<SectionBadgeProps> = ({
  children,
  className,
}): ReactElement => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto p-4 py-1 text-xs rounded-full border-none font-semibold bg-chart-2/5 text-primary/80",
        className,
      )}
    >
      {children}
    </Badge>
  );
};
