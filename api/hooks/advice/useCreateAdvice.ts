import { adviceApi } from "@/api/advice.api";
import { adviceKeys } from "@/query/advice.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAdvice = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: adviceApi.createAdvice,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adviceKeys.list() });
    },
  });
};
