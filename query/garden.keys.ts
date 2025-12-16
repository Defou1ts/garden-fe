export const gardenKeys = {
  all: ["gardens"] as const,
  lists: () => [...gardenKeys.all, "list"] as const,
  details: () => [...gardenKeys.all, "detail"] as const,
  detail: (id: string) => [...gardenKeys.details(), id] as const,
};
