import { adviceApi } from "@/api/advice.api";
import { adviceKeys } from "@/query/advice.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Params = {
  id: string;
  isFavorite: boolean;
};

export const useToggleAdviceFavorite = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFavorite }: Params) =>
      isFavorite
        ? adviceApi.removeFromFavorites(id)
        : adviceApi.addToFavorites(id),

    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: adviceKeys.favoriteStatus(vars.id),
      });
      qc.invalidateQueries({
        queryKey: adviceKeys.favorites(),
      });
    },
  });
};
