import { authApi } from "@/api/auth.api";
import { tokenStorage } from "@/storage/tokenStorage";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
    },
  });
};
