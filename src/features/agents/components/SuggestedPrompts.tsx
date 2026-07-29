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
        return <Zap className="h-4 w-4 text-amber-500" />;
      case "calculator":
        return <Calculator className="h-4 w-4 text-blue-500" />;
      case "lightbulb":
        return <Lightbulb className="h-4 w-4 text-emerald-500" />;
      case "clock":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-emerald-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mt-8 text-left">
      {SUGGESTED_PROMPTS.map((promptItem) => (
        <button
          key={promptItem.title}
          type="button"
          onClick={() => onSelectPrompt(promptItem.prompt)}
          disabled={disabled}
          className="flex flex-col justify-between p-4 rounded-2xl border bg-card hover:bg-sidebar-primary/5 hover:border-sidebar-primary transition-all cursor-pointer group relative"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-muted group-hover:bg-sidebar-primary/10 transition-colors">
                {getPromptIcon(promptItem.icon)}
              </div>
              <span className="text-xs font-medium text-foreground group-hover:text-sidebar-primary transition-colors">
                {promptItem.title}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-sidebar-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="text-xs text-muted-foreground group-hover:text-sidebar-primary line-clamp-2 text-left">
            {promptItem.desc}
          </p>
        </button>
      ))}
    </div>
  );
};
