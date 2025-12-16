export const buildFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (typeof value === "object" && value.uri) {
      formData.append(key, {
        uri: value.uri,
        name: value.name,
        type: value.type,
      } as any);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
