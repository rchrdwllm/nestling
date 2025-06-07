import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (
  date: Date | string,
  outputFormat: string = "MMMM d, yyyy"
) => {
  const dateString = new Date(date).toISOString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = formatInTimeZone(dateString, timeZone, outputFormat);

  return formattedDate;
};
