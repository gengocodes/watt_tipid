"use client";

import { RefreshCw } from "lucide-react";

interface ErrorScreenProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  title = "Error loading data",
  description = "Please check your connection and refresh the page.",
  onRetry = () => window.location.reload(),
}: Readonly<ErrorScreenProps>) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-6 rounded-2xl">
      <span className="text-md font-semibold text-destructive">{title}</span>
      <p className="text-xs text-muted-foreground max-w-sm">{description}</p>
      <button
        onClick={onRetry}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground border rounded-xl"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}
