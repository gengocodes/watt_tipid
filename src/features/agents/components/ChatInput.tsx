"use client";

import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-end gap-2 border rounded-3xl bg-card p-2 shadow-md">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gorlock AI about your appliances, electricity bill, or saving tips..."
          disabled={disabled}
          rows={1}
          className="flex-1 min-h-10 max-h-40 resize-none border-0 focus:outline-none focus:ring-0 text-sm px-3 py-2.5 bg-transparent text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="rounded-full shrink-0 h-9 w-9 disabled:opacity-40 mb-0.5"
        >
          {disabled ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4 stroke-[2.5]" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between px-3 text-xxs text-muted-foreground/60">
        <span>
          Use{" "}
          <kbd className="px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
            Enter ↵
          </kbd>{" "}
          to send,{" "}
          <kbd className="px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
            Shift + Enter ↵
          </kbd>{" "}
          for line break
        </span>
        <span className="hidden sm:inline-block">Gorlock the Advisor v1</span>
      </div>
    </div>
  );
};
