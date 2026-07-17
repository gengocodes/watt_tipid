import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, clear } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (userData) => {
      setUser(userData);
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterInput, "confirmPassword">) =>
      authService.register(data),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clear();
      router.push("/");
    },
    onError: () => {
      // In case api logout fails, clean up client state and redirect anyway
      clear();
      router.push("/");
    },
  });

  return {
    // Session State
    user,
    isAuthenticated,
    isLoading,

    // Login Action
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register Action
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    // Logout Action
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
