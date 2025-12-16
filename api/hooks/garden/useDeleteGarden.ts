import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGarden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gardenApi.deleteGarden,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: gardenKeys.all,
      });
    },
  });
};
