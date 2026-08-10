"use client";

import { Lightbulb } from "lucide-react";
import { SavingTipPriority } from "../types/types";
import { PRIORITY_AVATAR_STYLES } from "../constants/constants";
import { cn } from "@/lib/utils";

interface SavingTipAvatarProps {
  priority: SavingTipPriority;
}

export function SavingTipAvatar({
  priority,
}: Readonly<SavingTipAvatarProps>) {
  const avatarStyles = PRIORITY_AVATAR_STYLES[priority];
  return (
    <div
      className={cn(
        "size-11 rounded-full flex items-center justify-center shrink-0 mt-0.5",
        avatarStyles,
      )}
    >
      <Lightbulb className="size-5" />
    </div>
  );
}
