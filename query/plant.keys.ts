export const plantKeys = {
  all: ["plants"] as const,

  lists: () => [...plantKeys.all, "list"] as const,
  list: () => plantKeys.lists(),

  details: () => [...plantKeys.all, "detail"] as const,
  detail: (id: string) => [...plantKeys.details(), id] as const,

  verified: (isVerified: boolean) =>
    [...plantKeys.all, "verified", isVerified] as const,
};
