import { plantApi } from "@/api/plant.api";
import { plantKeys } from "@/query/plant.keys";
import { useQuery } from "@tanstack/react-query";

export const usePlant = (id?: string) => {
  return useQuery({
    queryKey: plantKeys.detail(id ?? ""),
    queryFn: () => plantApi.getPlantById(id as string),
    enabled: Boolean(id),
  });
};
