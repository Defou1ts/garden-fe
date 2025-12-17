import { authApi } from "@/api/auth.api";
import { tokenStorage } from "@/storage/tokenStorage";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSuccess: async () => {
      await tokenStorage.clear();
    },
  });
};
