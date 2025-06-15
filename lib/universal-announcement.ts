"use server";

import { UniversalAnnouncement } from "@/types";
import { firebase } from "@/lib/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { parseISO } from "date-fns";
import { db } from "./firebase";
import { FormEvent } from "react";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";

const db2 = getFirestore(firebase);

function flattenUniversalAnnouncement(doc: any): UniversalAnnouncement {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt
      ? parseISO(
          typeof data.createdAt === "string"
            ? data.createdAt
            : data.createdAt.toDate().toISOString()
        )
      : null,
  };
}

export const getAllUniversalAnnouncements = unstable_cache(
  async (limit: number = 10) => {
    try {
      const announcementsRef = await db
        .collection("universalAnnouncements")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();

      const announcements = announcementsRef.docs.map(flattenUniversalAnnouncement);

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching universal announcements:", error);
      return { error: "Failed to fetch universal announcements" };
    }
  },
  ["universalAnnouncements"],
  { revalidate: 60 * 60, tags: ["universalAnnouncements"] }
);

//modify here kapag iffetch na to other dashboards
export const getArchivedUniversalAnnouncements = unstable_cache(
  async (limit: number = 10) => {
    try {
      const announcementsRef = await db
        .collection("universalAnnouncements")
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();

      const announcements = announcementsRef.docs.map(flattenUniversalAnnouncement);

      return { success: announcements };
    } catch (error) {
      console.error("Error fetching archived universal announcements:", error);
      return { error: "Failed to fetch archived universal announcements" };
    }
  },
  ["archivedUniversalAnnouncements"],
  { revalidate: 60 * 60, tags: ["universalAnnouncements"] }
);

export async function createUniversalAnnouncement({
  jsonString,
}: {
  jsonString: string;
  
}) {
  console.log("Creating universal announcement with JSON:", jsonString);
  const myObject = JSON.parse(jsonString);
  const docRef = await addDoc(collection(db2, "universalAnnouncements"), {
    title:myObject.title,
    description: myObject.description,
    image: myObject.image,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isArchived: myObject.isArchived || false,
    archivedAt: null,
  });
  console.log("Created announcement with ID:", docRef.id); //test
}


export async function uploadUniversalAnnouncementImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nestling");
  formData.append("resource_type", "auto");

  const response = await fetch("https://api.cloudinary.com/v1_1/nestling-lan/auto/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudinary error:", errorText);
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url as string;
}


export async function processImageUpload(imageFile: File) {
  let loading = true;
  let imageUrl = "";

  if (imageFile) {
    const file = imageFile;
    const result = await uploadImgToCloudinary(file);
    if (result.success) {
      imageUrl = result.success.url; 
    } else {
      throw new Error("Failed to upload image");
    }
    loading = false;
  }

  return imageUrl;
}