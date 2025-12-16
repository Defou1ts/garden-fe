import { adviceApi } from '@/api/advice.api';
import { adviceKeys } from '@/query/advice.keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAdvice = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: adviceApi.deleteAdvice,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adviceKeys.all });
    },
  });
};
