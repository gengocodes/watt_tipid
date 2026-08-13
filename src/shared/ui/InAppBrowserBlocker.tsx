"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Compass, Copy, Check, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

const checkIsInAppBrowser = (): boolean => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor;
  return /FBAN|FBIOS|FB_IAB|FB4A|Messenger|Instagram|ByteLocale|TikTok|Line/i.test(
    ua,
  );
};

export function InAppBrowserBlocker() {
  const isInAppBrowser = useSyncExternalStore(
    emptySubscribe,
    checkIsInAppBrowser,
    () => false,
  );

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isInAppBrowser && typeof window !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor;
      if (/Android/i.test(ua)) {
        const url = window.location.href.replace(/^https?:\/\//, "");
        window.location.href = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end;`;
      }
    }
  }, [isInAppBrowser]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!isInAppBrowser) return null;

  return (
    <div className="fixed inset-0 z-99999 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-card border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Please Open in Safari / Chrome
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            WattTipid requires a secure browser session. In-app browsers
            (Facebook, Messenger, Instagram) block authentication tokens.
          </p>
        </div>

        <div className="w-full bg-muted/50 border rounded-2xl p-4 space-y-3 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            How to open:
          </div>

          <div className="flex items-start gap-3 text-xs text-foreground font-medium">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xxs font-bold">
              1
            </span>
            <span className="leading-snug">
              Tap the{" "}
              <MoreHorizontal className="inline h-4 w-4 mx-0.5 text-primary" />{" "}
              <strong>(3 dots)</strong> menu at the top or bottom right.
            </span>
          </div>

          <div className="flex items-start gap-3 text-xs text-foreground font-medium">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xxs font-bold">
              2
            </span>
            <span className="leading-snug">
              Select <strong>&quot;Open in Safari&quot;</strong> or{" "}
              <strong>&quot;Open in System Browser&quot;</strong>.
            </span>
          </div>
        </div>

        <div className="w-full pt-2 flex flex-col gap-2">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full rounded-xl gap-2 cursor-pointer font-semibold text-xs py-5"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy App Link to Paste in Browser</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
