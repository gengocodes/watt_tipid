import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { AUTH_KEYS } from "../constants";
import { User } from "../types";

export const useAuthMe = () => {
  return useQuery<User, Error>({
    queryKey: AUTH_KEYS.ME,
    queryFn: () => authService.me(),
    retry: false,
  });
};
