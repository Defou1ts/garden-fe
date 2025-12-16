import { userApi } from "@/api/user.api";
import { userKeys } from "@/query/user.keys";
import { useQuery } from "@tanstack/react-query";
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getProfile,
  });
};
