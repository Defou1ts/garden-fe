import { adviceApi } from "@/api/advice.api";
import { adviceKeys } from "@/query/advice.keys";
import { useQuery } from "@tanstack/react-query";

export const useAdviceFavorite = (id: string) => {
  return useQuery({
    queryKey: adviceKeys.favoriteStatus(id),
    queryFn: () => adviceApi.isFavorite(id),
    enabled: !!id,
  });
};
