import { plantApi } from "@/api/plant.api";
import { plantKeys } from "@/query/plant.keys";
import { useQuery } from "@tanstack/react-query";

export const usePlants = () => {
  return useQuery({
    queryKey: plantKeys.list(),
    queryFn: plantApi.getPlants,
  });
};
