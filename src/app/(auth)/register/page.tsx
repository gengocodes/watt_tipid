"use client";

import Link from "next/link";
import { AuthCard, RegisterForm } from "@/features/authentication";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <AuthCard
        title="Create Account"
        description="Join WattTipid to start saving on your electricity bills using AI"
        footer={
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
