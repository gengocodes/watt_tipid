import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useAgentStore } from "@/features/agents/store/agent.store";
import { authService } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    clear,
    registeredEmail,
    setRegisteredEmail,
    setAuthView,
  } = useAuthStore();
  const { resetMessages } = useAgentStore();

  const clearAllClientState = () => {
    clear();
    resetMessages();
    queryClient.clear();
  };

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (userData) => {
      setUser(userData);
      router.push("/dashboard");
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (credential: string) => authService.googleLogin(credential),
    onSuccess: (userData) => {
      setUser(userData);
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (_, variables) => {
      setRegisteredEmail(variables.email);
      setAuthView("verify_register");
    },
  });

  const verifyRegisterMutation = useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      authService.verifyRegister(data.email, data.code),
    onSuccess: () => {
      toast.success("Account created successfully!");
      setAuthView("login");
    },
  });

  const resendRegisterCodeMutation = useMutation({
    mutationFn: (email: string) => authService.resendRegisterCode(email),
    onSuccess: () => {
      toast.success("Verification code resent successfully!");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAllClientState();
      router.push("/");
    },
    onError: () => {
      // In case api logout fails, clean up client state and redirect anyway
      clearAllClientState();
      router.push("/");
    },
  });

  return {
    // Session State
    user,
    isAuthenticated,
    isLoading,
    registeredEmail,

    // Login Action
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Google Login Action
    googleLogin: googleLoginMutation.mutate,
    isGoogleLoggingIn: googleLoginMutation.isPending,
    googleLoginError: googleLoginMutation.error,

    // Register Action
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    // Verify Register Action
    verifyRegister: verifyRegisterMutation.mutate,
    isVerifyingRegister: verifyRegisterMutation.isPending,
    verifyRegisterError: verifyRegisterMutation.error,

    // Resend Register Code Action
    resendRegisterCode: resendRegisterCodeMutation.mutate,
    isResendingRegisterCode: resendRegisterCodeMutation.isPending,
    resendRegisterCodeError: resendRegisterCodeMutation.error,

    // Logout Action
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
