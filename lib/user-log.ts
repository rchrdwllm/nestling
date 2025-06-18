"use server";

import { UserActivity } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

interface PaginatedAuthLogs {
  logs: UserActivity[];
  pagination: {
    currentPage: number;
    hasMore: boolean;
    lastDocId?: string;
    totalFetched: number;
  };
}

const fetchAuthLogsInternal = async (
  page = 1,
  limit = 20,
  lastDocId?: string
) => {
  try {
    let query = db
      .collection("userActivities")
      .where("type", "in", ["login", "logout", "register"])
      .orderBy("createdAt", "desc");

    // Add pagination
    if (lastDocId && page > 1) {
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(limit + 1); // Fetch one extra to check if there are more

    const authLogsSnapshot = await query.get();
    const docs = authLogsSnapshot.docs;

    // Check if there are more results
    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;

    const authLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    const result: PaginatedAuthLogs = {
      logs: authLogs,
      pagination: {
        currentPage: page,
        hasMore,
        lastDocId:
          actualDocs.length > 0
            ? actualDocs[actualDocs.length - 1].id
            : undefined,
        totalFetched: actualDocs.length,
      },
    };

    return { success: result };
  } catch (error) {
    console.error("Error in userLog:", error);
    return { error };
  }
};

export const fetchAuthLogs = unstable_cache(
  fetchAuthLogsInternal,
  ["auth-logs"],
  {
    revalidate: 300, // 5 minutes
    tags: ["userActivities"],
  }
);
