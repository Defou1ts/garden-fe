import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  gardenId: string;
  plantId: string;
  x: number;
  y: number;
};

export const useAddPlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gardenId, ...data }: Params) =>
      gardenApi.addPlant(gardenId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: gardenKeys.detail(variables.gardenId),
      });
      queryClient.invalidateQueries({
        queryKey: gardenKeys.lists(),
      });
    },
  });
};
