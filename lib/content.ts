import { Content, File } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getModuleContents = unstable_cache(
  async (moduleId: string) => {
    try {
      const snapshot = await db
        .collection("contents")
        .where("moduleId", "==", moduleId)
        .orderBy("createdAt", "asc")
        .get();
      const contents = snapshot.docs.map((doc) => doc.data() as Content);

      return { success: contents };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  },
  ["contents"],
  { revalidate: 3600 }
);

export const getContentFile = unstable_cache(
  async (contentId: string) => {
    try {
      const snapshot = await db
        .collection("contents")
        .doc(contentId)
        .collection("files")
        .get();
      const file = snapshot.docs[0].data() as File;

      return { success: file };
    } catch (error) {
      return { error: "Error fetching file" };
    }
  },
  ["contents"],
  { revalidate: 3600 }
);

export const getModuleContent = unstable_cache(
  async (contentId: string) => {
    try {
      const snapshot = await db.collection("contents").doc(contentId).get();
      const content = snapshot.data() as Content;

      return { success: content };
    } catch (error) {
      return { error: "Error fetching content" };
    }
  },
  ["contents"],
  { revalidate: 3600 }
);
