"use client";

import React, { useRef, useEffect } from "react";
import { useAgent } from "../hooks/useAgent";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";

export const ChatWindow: React.FC = () => {
  const { messages, sendMessage, cancelStream, isSending } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden relative">
      <div data-tour="chat-messages" className="flex-1 overflow-y-auto w-full px-3 md:px-6 py-4 md:py-6 scroll-smooth flex flex-col">
        <div className="max-w-3xl md:max-w-4xl mx-auto w-full space-y-6 flex-1 flex flex-col">
          {messages.map((msg) => {
            const hasData =
              Boolean(msg.content) ||
              Boolean(msg.activities && msg.activities.length > 0) ||
              Boolean(msg.tools && msg.tools.length > 0);

            return msg.role === "assistant" && !hasData ? null : (
              <ChatMessage key={msg.id} message={msg} />
            );
          })}

          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in-50 duration-500 max-w-3xl mx-auto px-2 py-8 my-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-2xl">
                What can{" "}
                <span className="bg-linear-to-r from-chart-5 via-chart-3 to-chart-4 bg-clip-text text-transparent">
                  Gorlock
                </span>{" "}
                help you save today?
              </h1>

              <p className="text-sm md:text-base text-muted-foreground mt-3.5 max-w-lg leading-relaxed font-normal">
                Ask about your appliance costs, electricity bill calculations,
                or personalized energy saving advice.
              </p>

              <div data-tour="chat-prompts" className="w-full">
                <SuggestedPrompts
                  onSelectPrompt={sendMessage}
                  disabled={isSending}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer data-tour="chat-input" className="w-full px-3 md:px-6 pt-2 pb-4 shrink-0">
        <div className="max-w-3xl md:max-w-4xl mx-auto w-full">
          <ChatInput
            onSend={sendMessage}
            onCancel={cancelStream}
            isSending={isSending}
          />
        </div>
      </footer>
    </div>
  );
};
