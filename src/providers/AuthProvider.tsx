"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/features/authentication/store/auth.store";
import { authService } from "@/features/authentication/services/auth.service";

export default function AuthProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const setUser = useAuthStore((state) => state.setUser);
  const clear = useAuthStore((state) => state.clear);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await authService.me();
        setUser(user);
      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [setUser, clear, setLoading]);

  return <>{children}</>;
}
