import { apiClient } from "@/shared/api";
import { AUTH_ENDPOINTS } from "../constants";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import {
  LoginResponse,
  RegisterResponse,
  VerifyRegisterResponse,
  User,
} from "../types";

export const authService = {
  async register(data: RegisterInput): Promise<RegisterResponse> {
    const { firstName, lastName, barangayCity, email, password } = data;

    const response = await apiClient.post<RegisterResponse>(
      AUTH_ENDPOINTS.REGISTER,
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        barangay_city: barangayCity,
      },
    );
    return response.data;
  },

  async login(data: LoginInput): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      data,
    );
    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>("/auth/logout");
    return response.data;
  },

  async refresh(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>("/auth/refresh");
    return response.data;
  },

  async me(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },

  async verifyRegister(
    email: string,
    code: string,
  ): Promise<VerifyRegisterResponse> {
    const response = await apiClient.post<VerifyRegisterResponse>(
      "/auth/register/verify",
      {
        email,
        code,
      },
    );
    return response.data;
  },

  async resendRegisterCode(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      "/auth/register/resend",
      {
        email,
      },
    );
    return response.data;
  },
};
