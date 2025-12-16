import { plantApi } from "@/api/plant.api";
import { plantKeys } from "@/query/plant.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePlant = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: plantApi.createPlant,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: plantKeys.all });
    },
  });
};
