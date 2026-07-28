import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();
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

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (userData) => {
      setUser(userData);
      router.push("/dashboard");
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
    registeredEmail,

    // Login Action
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

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
