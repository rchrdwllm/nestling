import { File } from "@/types";
import { db } from "./firebase";

export const getFile = async (public_id: string) => {
  try {
    const doc = await db.collection("files").doc(public_id).get();
    const data = doc.data() as File;

    return { success: data };
  } catch (error) {
    console.error("File retrieval failed:", error);

    return { error };
  }
};
