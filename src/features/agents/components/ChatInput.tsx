"use client";

import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  isSending?: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onCancel,
  isSending,
  disabled,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180,
      )}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || disabled || isSending) return;
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
      <div className="relative flex items-end gap-2 border border-border/70 rounded-3xl md:rounded-[28px] bg-card p-2 md:p-2.5 shadow-md shadow-black/5 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gorlock about your appliances, electricity bill, or energy saving tips..."
          disabled={disabled}
          rows={1}
          className="flex-1 min-h-10 max-h-40 resize-none border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-base md:text-sm px-2 md:px-3 py-2 bg-transparent text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
        />

        {isSending ? (
          <Button
            size="icon"
            variant="secondary"
            onClick={onCancel}
            title="Stop generating"
            className="rounded-full shrink-0 h-8 w-8 md:h-9 md:w-9 bg-foreground text-background hover:bg-foreground/90 transition-all cursor-pointer mb-0.5"
          >
            <Square className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            title="Send message"
            className="rounded-full shrink-0 h-8 w-8 md:h-9 md:w-9 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:bg-muted disabled:text-muted-foreground transition-all cursor-pointer mb-0.5"
          >
            <ArrowUp className="h-4 w-4 stroke-[2.5]" />
          </Button>
        )}
      </div>

      <p className="text-center text-xxs text-muted-foreground/60 select-none px-2">
        WattTipid AI can make mistakes. Verify important figures with your
        electricity bill.
      </p>
    </div>
  );
};
