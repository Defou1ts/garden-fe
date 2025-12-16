import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  gardenId: string;
  x: number;
  y: number;
};

export const useRemovePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gardenId, x, y }: Params) =>
      gardenApi.removePlant(gardenId, x, y),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: gardenKeys.detail(variables.gardenId),
      });
    },
  });
};
