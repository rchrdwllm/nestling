import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChatChannelName(
  senderId: string,
  receiverId: string
): string {
  const sortedIds = [senderId, receiverId].sort();
  return `chat-channel-${sortedIds[0]}-${sortedIds[1]}`;
}
