import { api } from "./axios";
import { WeatherResponse } from "./weather.types";

export const weatherApi = {
  getByCoordinates: async (
    lat: number,
    lon: number
  ): Promise<WeatherResponse> => {
    const res = await api.get("/api/weather/coordinates", {
      params: { lat, lon },
    });
    return res.data;
  },
};
