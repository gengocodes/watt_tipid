export interface UserProfileUpdateRequest {
  first_name: string;
  last_name: string;
}

export interface UserProfileResponse {
  first_name: string;
  last_name: string;
}

export interface UserEmailUpdateRequest {
  current_password: string;
  new_email: string;
}

export interface UserEmailResponse {
  email: string;
}

export interface UserPasswordUpdateRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UserPasswordResponse {
  message: string;
}
