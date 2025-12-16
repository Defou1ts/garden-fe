export const weatherKeys = {
  all: ["weather"] as const,
  byCoords: (lat: number, lon: number) =>
    [...weatherKeys.all, lat, lon] as const,
};
