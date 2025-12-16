import { plantApi } from "@/api/plant.api";
import { plantKeys } from "@/query/plant.keys";
import { useQuery } from "@tanstack/react-query";

export const useVerifiedPlants = (isVerified: boolean) => {
  return useQuery({
    queryKey: plantKeys.verified(isVerified),
    queryFn: () => plantApi.getVerifiedPlants(isVerified),
  });
};
