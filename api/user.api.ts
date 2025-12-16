import { buildFormData } from "../utils/formData";
import { api } from "./axios";
import { UpdateUserProfileRequest, UserProfile } from "./user.types";

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get("/api/users/profile");
    return res.data;
  },

  updateProfile: async (
    data: UpdateUserProfileRequest
  ): Promise<UserProfile> => {
    const formData = buildFormData(data);

    const res = await api.put("/api/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
};
