import { clsx, type ClassValue } from "clsx";
import { differenceInCalendarDays, isPast, isToday } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChannelId(
  senderId: string,
  receiverId: string
): string {
  const sortedIds = [senderId, receiverId].sort();

  return `chat-channel-${sortedIds[0]}-${sortedIds[1]}`;
}

export async function streamToString(stream: any) {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

export const addAttachmentFlag = (cloudinaryUrl: string): string => {
  if (!cloudinaryUrl.includes("cloudinary.com")) {
    return cloudinaryUrl;
  }

  const urlParts = cloudinaryUrl.split("/upload/");

  if (urlParts.length === 2) {
    return `${urlParts[0]}/upload/fl_attachment/${urlParts[1]}`;
  }

  return cloudinaryUrl;
};

export const getDueText = (endDate: string) => {
  if (!endDate) return "";

  const end = new Date(endDate);

  if (isToday(end)) {
    return "Due today";
  }

  if (isPast(end) && !isToday(end)) {
    return "Overdue";
  }

  const days = differenceInCalendarDays(end, new Date());
  return `Due in ${days} day${days === 1 ? "" : "s"}`;
};
