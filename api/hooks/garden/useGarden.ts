import { gardenApi } from "@/api/garden.api";
import { gardenKeys } from "@/query/garden.keys";
import { useQuery } from "@tanstack/react-query";

export const useGarden = (id: string) => {
  return useQuery({
    queryKey: gardenKeys.detail(id),
    queryFn: () => gardenApi.getGardenById(id),
    enabled: !!id,
  });
};
