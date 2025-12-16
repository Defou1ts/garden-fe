import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useQuery } from "@tanstack/react-query";

export const useGardens = () => {
  return useQuery({
    queryKey: gardenKeys.lists(),
    queryFn: gardenApi.getGardens,
  });
};
