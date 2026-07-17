"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      Hi
      <Button onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/register")}>Register</Button>
    </div>
  );
}
