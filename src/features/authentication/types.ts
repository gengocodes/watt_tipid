export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  barangay_city: string;
}

export interface RegisterResponse {
  message: string;
  user_id: string;
}

export type LoginResponse = User;
