import { apiClient } from "@/shared/api";
import { ChatRequest, ChatResponse } from "../types/agent.types";

export const agentService = {
  async sendMessage(payload: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(
      "/agents/chat",
      payload,
    );
    return response.data;
  },
};
