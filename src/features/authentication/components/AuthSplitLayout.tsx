import { FC, ReactElement } from "react";
import { AppLogo } from "@/shared/ui/AppLogo";
import {
  Leaf,
  TrendingDown,
  MessageSquare,
  Shield,
  MoveLeft,
} from "lucide-react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { RegisterVerifyForm } from "./RegisterVerifyForm";
import { AuthDecorCircles } from "./AuthDecorCircles";
import { AuthFeatureItem } from "./AuthFeatureItem";
import { AuthStatItem } from "./AuthStatItem";
import { AuthTabToggle } from "./AuthTabToggle";
import { AuthSwitchFooter } from "./AuthSwitchFooter";

interface AuthSplitLayoutProps {
  view: "login" | "register" | "verify_register";
  onViewChange: (view: "login" | "register" | "verify_register") => void;
  onBack: () => void;
}

const FEATURES = [
  { icon: TrendingDown, text: "Average ₱520 saved per household monthly" },
  { icon: Leaf, text: "Reduces carbon footprint by up to 25%" },
  {
    icon: MessageSquare,
    text: "24/7 AI advisor in Filipino-friendly language",
  },
  { icon: Shield, text: "Your data stays private and encrypted" },
];

const STATS = [
  { value: "12K+", label: "households" },
  { value: "₱520", label: "avg savings" },
  { value: "4.9★", label: "rating" },
];

export const AuthSplitLayout: FC<AuthSplitLayoutProps> = ({
  view,
  onViewChange,
  onBack,
}): ReactElement => {
  const isLogin = view === "login";

  return (
    <div className="flex min-h-screen md:h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="relative flex flex-col justify-between w-full md:w-5/12 md:h-full bg-primary p-8 md:p-12 text-white overflow-hidden flex-shrink-0">
        <AuthDecorCircles className="top-0 right-0 translate-x-1/4 -translate-y-1/4" />
        <AuthDecorCircles className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />

        <div className="flex items-center gap-2">
          <AppLogo size={40} />
          <span className="text-xl font-bold tracking-tight">WattTipid</span>
        </div>

        <div className="my-auto py-12 md:py-0 z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Your Smart Energy Companion for Every Filipino Home
          </h2>
          <p className="text-muted text-md mb-8">
            Monitor, analyze, and reduce electricity consumption with the power
            of AI.
          </p>

          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <AuthFeatureItem
                key={feature.text}
                icon={feature.icon}
                text={feature.text}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-24 border-t border-muted/20 pt-8 mt-12 text-center">
            {STATS.map((stat) => (
              <AuthStatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        <div className="text-xs text-muted/50 z-10">
          © 2026 WattTipid · Web-Based GenAI Energy Advisory
        </div>
      </div>

      <div className="flex flex-col w-full md:w-7/12 md:h-full md:overflow-y-auto p-6 md:p-12">
        <div className="w-full max-w-lg p-6 mx-auto my-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
          >
            <MoveLeft className="h-3 w-3" />
            Back to website
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-primary">
              {view === "verify_register"
                ? "Verify your email"
                : isLogin
                  ? "Welcome back!"
                  : "Create your account"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {view === "verify_register"
                ? "Verify registration code"
                : isLogin
                  ? "Sign in to your WattTipid account"
                  : "Start your energy-saving journey today"}
            </p>
          </div>

          {view !== "verify_register" && (
            <AuthTabToggle activeView={view} onViewChange={onViewChange} />
          )}

          {view === "login" && (
            <div>
              <LoginForm />
              <AuthSwitchFooter
                promptText="Don't have an account?"
                actionLabel="Register"
                onAction={() => onViewChange("register")}
              />
            </div>
          )}

          {view === "register" && (
            <div>
              <RegisterForm />
              <AuthSwitchFooter
                promptText="Already have an account?"
                actionLabel="Log in"
                onAction={() => onViewChange("login")}
              />
            </div>
          )}

          {view === "verify_register" && (
            <div>
              <RegisterVerifyForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
