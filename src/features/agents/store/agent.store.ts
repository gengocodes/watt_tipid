import { create } from "zustand";
import { ChatMessageItem } from "../types/agent.types";

interface AgentState {
  messages: ChatMessageItem[];
  addMessage: (msg: ChatMessageItem) => void;
  resetMessages: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  messages: [],

  addMessage: (msg: ChatMessageItem) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  resetMessages: () =>
    set({
      messages: [],
    }),
}));
