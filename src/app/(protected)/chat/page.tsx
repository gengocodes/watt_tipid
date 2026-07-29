import { ChatWindow } from "@/features/agents";

export default function ChatPage() {
  return (
    <div className="-m-6 md:-m-8 h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      <ChatWindow />
    </div>
  );
}
