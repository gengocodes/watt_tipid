"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessageItem } from "../types/agent.types";
import { ASSISTANT_NAME } from "../constants/agent.constants";
import { AgentAvatar } from "./AgentAvatar";
import { UserAvatar } from "./UserAvatar";

interface ChatMessageProps {
  message: ChatMessageItem;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex gap-3 md:gap-4 items-start w-full transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {isUser ? (
        <UserAvatar size="md" className="mt-0.5" />
      ) : (
        <AgentAvatar size="md" className="mt-0.5" />
      )}

      <div
        className={cn(
          "flex flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-foreground">
            {isUser ? "You" : ASSISTANT_NAME}
          </span>
          <span className="text-xxxs text-muted-foreground/70">
            {message.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm transition-all leading-relaxed relative group shadow-2xs",
            isUser
              ? "bg-linear-to-br from-primary to-sidebar-primary text-white rounded-tr-xs"
              : "bg-card text-card-foreground border rounded-tl-xs",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap wrap-break-words">
              {message.content}
            </p>
          ) : (
            <div className="space-y-2">
              <div className="prose prose-sm max-w-none space-y-2 text-foreground leading-relaxed wrap-break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>

              <div className="flex items-center justify-end gap-1 pt-1 text-xxxs text-muted-foreground/80">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors text-xxs font-medium cursor-pointer text-muted-foreground hover:text-foreground"
                  title="Copy message to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-primary" />
                      <span className="text-primary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
