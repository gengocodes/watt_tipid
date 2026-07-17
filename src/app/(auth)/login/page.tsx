"use client";

import Link from "next/link";
import { AuthCard, LoginForm } from "@/features/authentication";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <AuthCard
        title="Welcome Back"
        description="Sign in to your WattTipid account"
        footer={
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
