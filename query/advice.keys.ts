export const adviceKeys = {
  all: ["advices"] as const,

  lists: () => [...adviceKeys.all, "list"] as const,
  list: () => adviceKeys.lists(),

  details: () => [...adviceKeys.all, "detail"] as const,
  detail: (id: string) => [...adviceKeys.details(), id] as const,

  favorites: () => [...adviceKeys.all, "favorites"] as const,

  favoriteStatus: (id: string) => [...adviceKeys.all, "favorite", id] as const,
};
