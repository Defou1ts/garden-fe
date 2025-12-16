import { weatherApi } from "@/api/weather.api";
import { weatherKeys } from "@/query/weather.keys";
import { useQuery } from "@tanstack/react-query";

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey:
      lat !== undefined && lon !== undefined
        ? weatherKeys.byCoords(lat, lon)
        : ["weather", "disabled"],
    queryFn: () => weatherApi.getByCoordinates(lat!, lon!),
    enabled: lat !== undefined && lon !== undefined,
    staleTime: 10 * 60 * 1000, // 10 минут — разумно для погоды
  });
};
