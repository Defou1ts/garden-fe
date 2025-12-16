import { adviceApi } from "@/api/advice.api";
import { adviceKeys } from "@/query/advice.keys";
import { useQuery } from "@tanstack/react-query";

export const useAdvices = () => {
  return useQuery({
    queryKey: adviceKeys.list(),
    queryFn: adviceApi.getAdvices,
  });
};
