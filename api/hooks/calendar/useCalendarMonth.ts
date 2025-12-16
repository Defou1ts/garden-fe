import { calendarApi } from "@/api/calendar.api";
import { calendarKeys } from "@/query/calendar.keys";
import { useQuery } from "@tanstack/react-query";

export const useCalendarMonth = (year: number, month: number) => {
  return useQuery({
    queryKey: calendarKeys.month(year, month),
    queryFn: () => calendarApi.getMonth(year, month),
    enabled: !!year && !!month,
    staleTime: 60 * 60 * 1000, // месяц редко меняется
  });
};
