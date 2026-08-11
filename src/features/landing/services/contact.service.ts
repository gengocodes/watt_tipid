import { apiClient } from "@/shared/api";

export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  async sendContact(data: ContactData): Promise<ContactResponse> {
    const response = await apiClient.post<ContactResponse>("/contact", {
      full_name: data.fullName,
      email: data.email,
      message: data.message,
    });
    return response.data;
  },
};
