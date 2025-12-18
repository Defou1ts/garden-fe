import { userApi } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email: string) => userApi.checkEmail(email),
  });
};
