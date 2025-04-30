"use server";

import { File as FileType } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { getSHA256 } from "./sha-256";

export const getFile = unstable_cache(
  async (public_id: string) => {
    try {
      const doc = await db.collection("files").doc(public_id).get();
      const data = doc.data() as FileType;

      return { success: data };
    } catch (error) {
      console.error("File retrieval failed:", error);

      return { error: JSON.stringify(error) };
    }
  },
  ["files"],
  { revalidate: 3600 }
);

export const verifyFileIntegrity = async (
  fileUrl: string,
  originalHash: string
) => {
  const res = await fetch(fileUrl);
  const blob = await res.blob();
  const hash = await getSHA256(blob as File);

  return hash === originalHash;
};
