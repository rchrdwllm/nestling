import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChannelId(
  senderId: string,
  receiverId: string
): string {
  const sortedIds = [senderId, receiverId].sort();
  return `presence-chat-channel-${sortedIds[0]}-${sortedIds[1]}`;
}

export async function streamToString(stream: any) {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}
