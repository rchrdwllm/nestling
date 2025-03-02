import { Image } from "@/types";
import { db } from "./firebase";

export const getImage = async (public_id: string) => {
  try {
    const doc = await db.collection("images").doc(public_id).get();
    const data = doc.data() as Image;

    return { success: data };
  } catch (error) {
    console.error("Image retrieval failed:", error);

    return { error };
  }
};
