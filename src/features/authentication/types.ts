export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  barangay_city: string;
  created_at: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface VerifyRegisterResponse {
  message: string;
  user_id: string;
}

export type LoginResponse = User;
