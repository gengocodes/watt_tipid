"use client";

import React from "react";
import { AgentAvatar } from "./AgentAvatar";
import { ASSISTANT_NAME } from "../constants/agent.constants";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 md:gap-4 items-start w-full animate-in fade-in-50 slide-in-from-bottom-2">
      <AgentAvatar size="md" className="mt-0.5" />

      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs font-semibold text-foreground px-1">
          {ASSISTANT_NAME}
        </span>

        <div className="bg-card text-card-foreground border border-border/70 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
          <div className="flex items-center gap-1.5 h-4">
            <span className="h-2 w-2 rounded-full bg-sidebar-primary animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-sidebar-primary animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-sidebar-primary animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
