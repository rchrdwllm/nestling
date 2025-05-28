"use client";

import { formatInTimeZone } from "date-fns-tz";

type DateDisplayProps = {
  date: Date | string;
  outputFormat?: string;
};

const DateDisplay = ({
  date,
  outputFormat = "MMMM d, yyyy",
}: DateDisplayProps) => {
  if (typeof date === "string") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = formatInTimeZone(date, timeZone, outputFormat);

    return <span>{formattedDate}</span>;
  }

  const dateString = date.toISOString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = formatInTimeZone(dateString, timeZone, outputFormat);

  return <span>{formattedDate}</span>;
};

export default DateDisplay;
