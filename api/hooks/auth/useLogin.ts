import { authApi, AuthResponse, LoginRequest } from "@/api/auth.api";
import { tokenStorage } from "@/storage/tokenStorage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ErrorResponse = {
  errors: {
    email: string;
    password: string;
    details: string;
  };
};

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
    },
  });
};
