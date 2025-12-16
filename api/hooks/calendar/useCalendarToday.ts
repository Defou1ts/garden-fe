import { calendarApi } from '@/api/calendar.api';
import { calendarKeys } from '@/query/calendar.keys';
import { useQuery } from '@tanstack/react-query';

export const useCalendarToday = () => {
  return useQuery({
    queryKey: calendarKeys.today(),
    queryFn: calendarApi.getToday,
    refetchInterval: 5 * 60 * 1000, // каждые 5 минут
  });
};
