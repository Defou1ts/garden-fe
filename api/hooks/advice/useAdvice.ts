import { adviceApi } from '@/api/advice.api';
import { adviceKeys } from '@/query/advice.keys';
import { useQuery } from '@tanstack/react-query';

export const useAdvice = (id: string) => {
  return useQuery({
    queryKey: adviceKeys.detail(id),
    queryFn: () => adviceApi.getAdviceById(id),
    enabled: !!id,
  });
};
