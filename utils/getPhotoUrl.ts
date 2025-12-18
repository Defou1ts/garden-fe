import { API_URL } from "@/api/axios";

export const getPhotoUrl = (photoUrl: string) => {
  return `${API_URL}${photoUrl}`;
};
