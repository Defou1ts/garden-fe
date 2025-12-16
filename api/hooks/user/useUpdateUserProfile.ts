import { userApi } from "@/api/user.api";
import { userKeys } from "@/query/user.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: userKeys.profile(),
      });
    },
  });
};
