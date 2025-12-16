import { adviceApi } from "@/api/advice.api";
import { adviceKeys } from "@/query/advice.keys";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteAdvices = () => {
  return useQuery({
    queryKey: adviceKeys.favorites(),
    queryFn: adviceApi.getFavorites,
  });
};
