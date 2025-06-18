"use server";

import { UserActivity } from "@/types";
import { db } from "./firebase";
import { unstable_cache, revalidateTag } from "next/cache";

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
  const startTime = Date.now();

  try {
    let query = db
      .collection("userActivities")
      .where("type", "in", ["login", "logout", "register"])
      .orderBy("createdAt", "desc");

    let firestoreReads = 0;

    if (lastDocId && page > 1) {
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1;

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(limit + 1);

    const authLogsSnapshot = await query.get();
    const docs = authLogsSnapshot.docs;

    firestoreReads += docs.length;

    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;
    const authLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    const typesFound = authLogs.map((log) => log.type);
    const uniqueTypes = [...new Set(typesFound)];

    const endTime = Date.now();
    const duration = endTime - startTime;

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
  async (page = 1, limit = 20, lastDocId?: string) => {
    return await fetchAuthLogsInternal(page, limit, lastDocId);
  },
  ["auth-logs"],
  {
    revalidate: 300,
    tags: ["userActivities"],
  }
);

const fetchContentLogsInternal = async (
  page = 1,
  limit = 20,
  lastDocId?: string
) => {
  const startTime = Date.now();

  try {
    let query = db
      .collection("userActivities")
      .where("type", "in", [
        "view_course",
        "view_content",
        "view_project",
        "submit_assignment",
        "grade_submission",
      ])
      .orderBy("createdAt", "desc");

    let firestoreReads = 0;

    if (lastDocId && page > 1) {
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1;

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(limit + 1);

    const contentLogsSnapshot = await query.get();
    const docs = contentLogsSnapshot.docs;

    firestoreReads += docs.length;

    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;
    const contentLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    const typesFound = contentLogs.map((log) => log.type);
    const uniqueTypes = [...new Set(typesFound)];

    // Check for unexpected types
    const expectedTypes = [
      "view_course",
      "view_content",
      "view_project",
      "submit_assignment",
      "grade_submission",
    ];

    const endTime = Date.now();

    const result: PaginatedAuthLogs = {
      logs: contentLogs,
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
    console.error("Error in contentLog:", error);

    return { error };
  }
};

export const fetchContentLogs = unstable_cache(
  async (page = 1, limit = 20, lastDocId?: string) => {
    return await fetchContentLogsInternal(page, limit, lastDocId);
  },
  ["content-logs"],
  {
    revalidate: 300,
    tags: ["userActivities"],
  }
);

const fetchSystemLogsInternal = async (
  page = 1,
  limit = 20,
  lastDocId?: string
) => {
  const startTime = Date.now();

  try {
    let query = db
      .collection("userActivities")
      .where("type", "in", [
        "update_profile",
        "enroll_course",
        "ticket_created",
      ])
      .orderBy("createdAt", "desc");

    let firestoreReads = 0;

    if (lastDocId && page > 1) {
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1;

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(limit + 1);

    const systemLogsSnapshot = await query.get();
    const docs = systemLogsSnapshot.docs;

    firestoreReads += docs.length;

    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;

    const systemLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    const endTime = Date.now();

    const result: PaginatedAuthLogs = {
      logs: systemLogs,
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
    console.error("Error in systemLog:", error);

    return { error };
  }
};

export const fetchSystemLogs = unstable_cache(
  async (page = 1, limit = 20, lastDocId?: string) => {
    return await fetchSystemLogsInternal(page, limit, lastDocId);
  },
  ["system-logs"],
  {
    revalidate: 300,
    tags: ["userActivities"],
  }
);

export const revalidateAuthLogsCache = async () => {
  "use server";

  revalidateTag("userActivities");
};

export const revalidateContentLogsCache = async () => {
  "use server";

  revalidateTag("userActivities");
};

export const revalidateSystemLogsCache = async () => {
  "use server";

  revalidateTag("userActivities");
};
