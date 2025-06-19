import {
  uploadFileToCloudinary,
  uploadImgToCloudinary,
} from "@/server/actions/upload-to-cloudinary";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSHA256 } from "./sha-256";

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

export const duplicateCloudinaryImage = async (
  originalUrl: string,
  fileName: string
) => {
  try {
    const response = await fetch(originalUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    const file = new File([blob], fileName, { type: blob.type });

    return await uploadImgToCloudinary(file);
  } catch (error) {
    console.error("Image duplication failed:", error);
    return { error };
  }
};

export const duplicateCloudinaryFile = async (
  originalUrl: string,
  fileName: string
) => {
  try {
    const response = await fetch(originalUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();

    const file = new File([blob], fileName, { type: blob.type });

    return await uploadFileToCloudinary(file);
  } catch (error) {
    console.error("File duplication failed:", error);
    return { error };
  }
};
