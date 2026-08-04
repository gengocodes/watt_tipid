import { apiClient, apiStream } from "@/shared/api";
import {
  AgentServiceContract,
  AgentStreamEvent,
  ChatRequest,
  ChatResponse,
  StreamEventCallback,
} from "../types/agent.types";

export const agentService: AgentServiceContract = {
  async sendMessage(payload: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(
      "/agents/chat",
      payload,
    );
    return response.data;
  },

  async streamMessage(
    payload: ChatRequest,
    onEvent: StreamEventCallback,
    signal?: AbortSignal,
  ): Promise<void> {
    return apiStream<AgentStreamEvent>(
      "/agents/chat/stream",
      payload,
      onEvent,
      signal,
    );
  },
};
