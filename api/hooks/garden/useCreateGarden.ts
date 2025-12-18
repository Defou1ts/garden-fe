import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  name: string;
  type?: "PLOT";
};

export const useCreateGarden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, type = "PLOT" }: Params) =>
      gardenApi.createGarden({ name, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gardenKeys.lists() });
    },
  });
};

