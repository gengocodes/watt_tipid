"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Calculator,
  Lightbulb,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { SUGGESTED_PROMPTS } from "../constants/agent.constants";
import { cn } from "@/lib/utils";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onSelectPrompt,
  disabled,
}) => {
  const getPromptIcon = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return <Zap className="size-4 text-amber-500 shrink-0" />;
      case "calculator":
        return <Calculator className="size-4 text-blue-500 shrink-0" />;
      case "lightbulb":
        return <Lightbulb className="size-4 text-emerald-500 shrink-0" />;
      case "clock":
        return <Clock className="size-4 text-purple-500 shrink-0" />;
      default:
        return <Sparkles className="size-4 text-primary shrink-0" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5 w-full mt-8 text-left">
      {SUGGESTED_PROMPTS.map((promptItem) => (
        <button
          key={promptItem.title}
          type="button"
          onClick={() => onSelectPrompt(promptItem.prompt)}
          disabled={disabled}
          className={cn(
            "group relative flex flex-col justify-between p-4 rounded-2xl border border-border/40 bg-card/60 hover:bg-muted/50 hover:border-border/80 transition-all duration-200 cursor-pointer text-left select-none shadow-2xs hover:shadow-sm",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <div className="flex items-center gap-2">
              {getPromptIcon(promptItem.icon)}
              <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {promptItem.title}
              </span>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground/70 line-clamp-2 leading-relaxed">
            {promptItem.desc}
          </p>
        </button>
      ))}
    </div>
  );
};
