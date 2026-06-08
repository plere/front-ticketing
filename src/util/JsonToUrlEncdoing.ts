export function JsonToUrlEncoding<T extends Record<string, any>>(obj: T): string {
  const stringifiedParams = Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);

  return encodeURIComponent(new URLSearchParams(stringifiedParams).toString());
}