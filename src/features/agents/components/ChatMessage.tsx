"use client";

import React, { useState, AnchorHTMLAttributes, FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessageItem } from "../types/agent.types";
import { ASSISTANT_NAME } from "../constants/agent.constants";
import { AgentAvatar } from "./AgentAvatar";
import { UserAvatar } from "./UserAvatar";
import { AgentExecutionTimeline } from "./AgentExecutionTimeline";
import { AgentWebSources } from "./AgentWebSources";

interface ChatMessageProps {
  message: ChatMessageItem;
}

const MarkdownLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary font-medium hover:underline inline-flex items-center gap-0.5 cursor-pointer underline-offset-2"
  >
    {children}
    <ExternalLink className="size-3 inline shrink-0" />
  </a>
);

const MARKDOWN_COMPONENTS = {
  a: MarkdownLink,
};

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
        "flex gap-3 md:gap-4 items-start w-full transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-2 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {isUser ? (
        <UserAvatar size="md" className="mt-0.5" />
      ) : (
        <AgentAvatar size="md" className="mt-0.5" />
      )}

      <div
        className={cn(
          "flex flex-col gap-1 w-full max-w-full overflow-hidden",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "flex items-center w-full px-1",
            isUser ? "flex-row-reverse justify-start" : "justify-between"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              isUser && "flex-row-reverse"
            )}
          >
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

          {!isUser && message.content && (
            <button
              type="button"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-muted/60 text-xxs text-muted-foreground hover:text-foreground cursor-pointer"
              title="Copy message to clipboard"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-primary" />
                  <span className="text-primary font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        {isUser ? (
          <div className="rounded-2xl px-4 py-3 text-sm transition-all leading-relaxed relative group shadow-2xs bg-linear-to-br from-primary to-sidebar-primary text-white rounded-tr-xs">
            <p className="whitespace-pre-wrap wrap-break-words">
              {message.content}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-start w-full">
            <AgentExecutionTimeline
              activities={message.activities}
              executionTimeSeconds={message.executionTimeSeconds}
            />

            {message.content && (
              <div className="w-full flex flex-col gap-2">
                <div className="rounded-2xl rounded-tl-xs px-4 py-3 text-sm transition-all leading-relaxed relative group shadow-none border bg-card text-card-foreground">
                  <div className="prose prose-sm max-w-none space-y-2 text-foreground leading-relaxed wrap-break-words">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={MARKDOWN_COMPONENTS}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>

                <AgentWebSources content={message.content} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
