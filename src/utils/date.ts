export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
};

export const parseLocalDate = (isoYMD: string): Date =>
  new Date(`${isoYMD}T00:00`);
