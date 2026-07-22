import { FC, ReactElement } from "react";
import { SectionBadge } from "./SectionBadge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}): ReactElement => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "space-y-4 mb-16 max-w-2xl",
        isCenter ? "text-center mx-auto" : "",
        className,
      )}
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2
        className={cn(
          "text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-sm md:text-base leading-relaxed",
            isCenter ? "max-w-lg mx-auto" : "",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
