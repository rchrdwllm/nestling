"use server";

import { File } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getFile = unstable_cache(
  async (public_id: string) => {
    try {
      const doc = await db.collection("files").doc(public_id).get();
      const data = doc.data() as File;

      return { success: data };
    } catch (error) {
      console.error("File retrieval failed:", error);

      return { error: JSON.stringify(error) };
    }
  },
  ["files"],
  { revalidate: 3600 }
);
