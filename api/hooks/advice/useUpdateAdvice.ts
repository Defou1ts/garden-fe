import { adviceApi } from "@/api/advice.api";
import { UpdateAdviceRequest } from "@/api/advice.types";
import { adviceKeys } from "@/query/advice.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  id: string;
  data: UpdateAdviceRequest;
};

export const useUpdateAdvice = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: Params) => adviceApi.updateAdvice(id, data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: adviceKeys.detail(vars.id),
      });
      qc.invalidateQueries({
        queryKey: adviceKeys.list(),
      });
    },
  });
};
