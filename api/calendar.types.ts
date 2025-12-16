export type CalendarTask = {
  gardenId: string;
  gardenName: string;
  plantId: string;
  plantName: string;
  x: number;
  y: number;
};

export type CalendarTodayResponse = CalendarTask[];

export type CalendarDay = {
  date: string; // YYYY-MM-DD
  tasks: CalendarTask[];
};

export type CalendarMonthResponse = {
  year: number;
  month: number;
  days: CalendarDay[];
};
