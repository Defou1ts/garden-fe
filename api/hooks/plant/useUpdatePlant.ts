import { plantApi } from "@/api/plant.api";
import { plantKeys } from "@/query/plant.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  id: string;
  data: any;
};

export const useUpdatePlant = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: Params) => plantApi.updatePlant(id, data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: plantKeys.detail(vars.id),
      });
      qc.invalidateQueries({
        queryKey: plantKeys.list(),
      });
    },
  });
};
