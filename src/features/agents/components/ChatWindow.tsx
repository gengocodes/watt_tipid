"use client";

import React, { useRef, useEffect } from "react";
import { useAgent } from "../hooks/useAgent";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { AgentAvatar } from "./AgentAvatar";
import { SuggestedPrompts } from "./SuggestedPrompts";

export const ChatWindow: React.FC = () => {
  const { messages, sendMessage, isSending } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden relative">
      <div className="flex-1 overflow-y-auto w-full px-4 md:px-6 py-6 scroll-smooth">
        <div className="max-w-3xl md:max-w-4xl mx-auto w-full space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {messages.length === 0 && (
            <div className="pt-6 pb-4 flex flex-col items-center justify-center text-center animate-in fade-in-50 duration-500 max-w-2xl mx-auto">
              <AgentAvatar size="lg" className="mb-4" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                How can Gorlock help you save energy today?
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">
                Select a suggested prompt below or type your question to
                calculate appliance costs, get bill-lowering advice, and
                optimize usage.
              </p>

              <SuggestedPrompts
                onSelectPrompt={sendMessage}
                disabled={isSending}
              />
            </div>
          )}

          {isSending && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="w-full border-t border-border/60 bg-background/80 backdrop-blur-md px-4 md:px-6 py-4 shrink-0">
        <div className="max-w-3xl md:max-w-4xl mx-auto w-full">
          <ChatInput onSend={sendMessage} disabled={isSending} />
        </div>
      </footer>
    </div>
  );
};
