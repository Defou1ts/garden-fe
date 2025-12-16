import { api } from "./axios";
import { CalendarMonthResponse, CalendarTodayResponse } from "./calendar.types";

export const calendarApi = {
  getToday: async (): Promise<CalendarTodayResponse> => {
    const res = await api.get("/api/calendar/today");
    return res.data;
  },

  getMonth: async (
    year: number,
    month: number
  ): Promise<CalendarMonthResponse> => {
    const res = await api.get("/api/calendar/month", {
      params: { year, month },
    });
    return res.data;
  },
};
