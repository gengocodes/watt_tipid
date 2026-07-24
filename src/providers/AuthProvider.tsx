"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore, useAuthMe } from "@/features/authentication";

export default function AuthProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const setUser = useAuthStore((state) => state.setUser);
  const clear = useAuthStore((state) => state.clear);
  const setLoading = useAuthStore((state) => state.setLoading);

  const { data: user, isLoading, isError } = useAuthMe();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else if (isError) {
      clear();
    }
    if (!isLoading) {
      setLoading(false);
    }
  }, [user, isError, isLoading, setUser, clear, setLoading]);

  return <>{children}</>;
}

