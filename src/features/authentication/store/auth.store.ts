import { create } from "zustand";
import { User } from "../types";

type AuthView = "landing" | "login" | "register";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registeredEmail: string;
  authView: AuthView;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setRegisteredEmail: (email: string) => void;
  setAuthView: (view: AuthView) => void;
  clearRegisteredEmail: () => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  registeredEmail: "",
  authView: "landing",

  setUser: (user: User | null) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (isLoading: boolean) =>
    set({
      isLoading,
    }),

  setRegisteredEmail: (email: string) =>
    set({
      registeredEmail: email,
    }),

  setAuthView: (view: "landing" | "login" | "register") =>
    set({
      authView: view,
    }),

  clearRegisteredEmail: () =>
    set({
      registeredEmail: "",
    }),

  clear: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      registeredEmail: "",
      authView: "landing",
    }),
}));
