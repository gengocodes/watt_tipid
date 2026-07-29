"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { agentService } from "../services/agent.service";
import { ChatMessageItem } from "../types/agent.types";
import { useAgentStore } from "../store/agent.store";

export const useAgent = () => {
  const { messages, addMessage, resetMessages } = useAgentStore();

  const sendMutation = useMutation({
    mutationFn: (messageText: string) =>
      agentService.sendMessage({ message: messageText }),
    onSuccess: (data) => {
      const assistantMsg: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
        createdAt: new Date(),
      };
      addMessage(assistantMsg);
    },
    onError: (err: unknown) => {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string } } }).response
              ?.data?.detail ||
            "Failed to reach AI assistant. Please try again."
          : "An unexpected error occurred.";

      toast.error(errorMessage);

      addMessage({
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I encountered an error generating a response. Please try again.",
        createdAt: new Date(),
      });
    },
  });

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || sendMutation.isPending) return;

    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    };

    addMessage(userMsg);
    sendMutation.mutate(trimmed);
  };

  return {
    messages,
    sendMessage,
    resetChat: resetMessages,
    isSending: sendMutation.isPending,
    error: sendMutation.error,
  };
};
