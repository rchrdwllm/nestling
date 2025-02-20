import { Content } from "@/types";
import { db } from "./firebase";

export const getModuleContents = async (moduleId: string) => {
  try {
    const snapshot = await db
      .collection("modules")
      .doc(moduleId)
      .collection("contents")
      .get();
    const contentIds = snapshot.docs.map((doc) => doc.id);
    const contents = await Promise.all(
      contentIds.map(async (contentId) => {
        const contentSnapshot = await db
          .collection("contents")
          .doc(contentId)
          .get();

        return contentSnapshot.data() as Content;
      })
    );

    return { success: contents };
  } catch (error) {
    return { error: "Error fetching contents" };
  }
};
