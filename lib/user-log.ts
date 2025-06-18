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
  console.log(
    `🔍 [AUTH LOGS] Starting fetch - Page: ${page}, Limit: ${limit}, LastDocId: ${
      lastDocId ? "present" : "none"
    }`
  );

  try {
    let query = db
      .collection("userActivities")
      .where("type", "in", ["login", "logout", "register"])
      .orderBy("createdAt", "desc");

    let firestoreReads = 0;

    // Add pagination
    if (lastDocId && page > 1) {
      console.log(`📄 [AUTH LOGS] Fetching lastDoc for pagination...`);
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1; // Reading the lastDoc counts as 1 read

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
        console.log(`✅ [AUTH LOGS] LastDoc found, applying pagination`);
      } else {
        console.log(`❌ [AUTH LOGS] LastDoc not found`);
      }
    }

    query = query.limit(limit + 1); // Fetch one extra to check if there are more

    console.log(`📊 [AUTH LOGS] Executing query with limit: ${limit + 1}`);
    const authLogsSnapshot = await query.get();
    const docs = authLogsSnapshot.docs;

    // Each document read counts as 1 Firestore read
    firestoreReads += docs.length;

    // Check if there are more results
    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;
    const authLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    // Log the types found to verify filtering
    const typesFound = authLogs.map((log) => log.type);
    const uniqueTypes = [...new Set(typesFound)];
    console.log(`🏷️  [AUTH LOGS] Types found: ${uniqueTypes.join(", ")}`);
    console.log(`🏷️  [AUTH LOGS] Expected types: login, logout, register`);

    // Check for unexpected types
    const expectedTypes = ["login", "logout", "register"];
    const unexpectedTypes = uniqueTypes.filter(
      (type) => !expectedTypes.includes(type)
    );
    if (unexpectedTypes.length > 0) {
      console.warn(
        `⚠️  [AUTH LOGS] Unexpected types found: ${unexpectedTypes.join(", ")}`
      );
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`📈 [AUTH LOGS] Query completed:`);
    console.log(
      `   • Documents fetched: ${docs.length} (${actualDocs.length} returned, ${
        hasMore ? "1 extra for hasMore check" : "no extra"
      })`
    );
    console.log(`   • Firestore reads: ${firestoreReads} reads`);
    console.log(`   • Page: ${page}, Has more: ${hasMore}`);
    console.log(`   • Duration: ${duration}ms`);
    console.log(
      `   • Cache status: ${
        page === 1 && !lastDocId ? "FRESH QUERY" : "PAGINATED QUERY"
      }`
    );

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
    console.error("❌ [AUTH LOGS] Error in userLog:", error);
    return { error };
  }
};

export const fetchAuthLogs = unstable_cache(
  async (page = 1, limit = 20, lastDocId?: string) => {
    console.log(
      `🗄️  [AUTH CACHE] Cache miss - executing fetchAuthLogsInternal(${page}, ${limit}, ${
        lastDocId ? "lastDocId" : "no-lastDocId"
      })`
    );
    return await fetchAuthLogsInternal(page, limit, lastDocId);
  },
  ["auth-logs"],
  {
    revalidate: 300, // 5 minutes
    tags: ["userActivities"],
  }
);

const fetchContentLogsInternal = async (
  page = 1,
  limit = 20,
  lastDocId?: string
) => {
  const startTime = Date.now();
  console.log(
    `🔍 [CONTENT LOGS] Starting fetch - Page: ${page}, Limit: ${limit}, LastDocId: ${
      lastDocId ? "present" : "none"
    }`
  );

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

    // Add pagination
    if (lastDocId && page > 1) {
      console.log(`📄 [CONTENT LOGS] Fetching lastDoc for pagination...`);
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1; // Reading the lastDoc counts as 1 read

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
        console.log(`✅ [CONTENT LOGS] LastDoc found, applying pagination`);
      } else {
        console.log(`❌ [CONTENT LOGS] LastDoc not found`);
      }
    }

    query = query.limit(limit + 1); // Fetch one extra to check if there are more

    console.log(`📊 [CONTENT LOGS] Executing query with limit: ${limit + 1}`);
    const contentLogsSnapshot = await query.get();
    const docs = contentLogsSnapshot.docs;

    // Each document read counts as 1 Firestore read
    firestoreReads += docs.length;

    // Check if there are more results
    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;
    const contentLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    // Log the types found to verify filtering
    const typesFound = contentLogs.map((log) => log.type);
    const uniqueTypes = [...new Set(typesFound)];
    console.log(`🏷️  [CONTENT LOGS] Types found: ${uniqueTypes.join(", ")}`);
    console.log(
      `🏷️  [CONTENT LOGS] Expected types: view_course, view_content, view_project, submit_assignment, grade_submission`
    );

    // Check for unexpected types
    const expectedTypes = [
      "view_course",
      "view_content",
      "view_project",
      "submit_assignment",
      "grade_submission",
    ];
    const unexpectedTypes = uniqueTypes.filter(
      (type) => !expectedTypes.includes(type)
    );
    if (unexpectedTypes.length > 0) {
      console.warn(
        `⚠️  [CONTENT LOGS] Unexpected types found: ${unexpectedTypes.join(
          ", "
        )}`
      );
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`📈 [CONTENT LOGS] Query completed:`);
    console.log(
      `   • Documents fetched: ${docs.length} (${actualDocs.length} returned, ${
        hasMore ? "1 extra for hasMore check" : "no extra"
      })`
    );
    console.log(`   • Firestore reads: ${firestoreReads} reads`);
    console.log(`   • Page: ${page}, Has more: ${hasMore}`);
    console.log(`   • Duration: ${duration}ms`);
    console.log(
      `   • Cache status: ${
        page === 1 && !lastDocId ? "FRESH QUERY" : "PAGINATED QUERY"
      }`
    );

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
    console.error("❌ [CONTENT LOGS] Error in contentLog:", error);
    return { error };
  }
};

// Cached version with 5-minute cache duration for content logs
export const fetchContentLogs = unstable_cache(
  async (page = 1, limit = 20, lastDocId?: string) => {
    console.log(
      `🗄️  [CONTENT CACHE] Cache miss - executing fetchContentLogsInternal(${page}, ${limit}, ${
        lastDocId ? "lastDocId" : "no-lastDocId"
      })`
    );
    return await fetchContentLogsInternal(page, limit, lastDocId);
  },
  ["content-logs"],
  {
    revalidate: 300, // 5 minutes
    tags: ["userActivities"],
  }
);

// New system logs functions
const fetchSystemLogsInternal = async (
  page = 1,
  limit = 20,
  lastDocId?: string
) => {
  const startTime = Date.now();
  console.log(
    `🔍 [SYSTEM LOGS] Starting fetch - Page: ${page}, Limit: ${limit}, LastDocId: ${
      lastDocId ? "present" : "none"
    }`
  );

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

    // Add pagination
    if (lastDocId && page > 1) {
      console.log(`📄 [SYSTEM LOGS] Fetching lastDoc for pagination...`);
      const lastDoc = await db
        .collection("userActivities")
        .doc(lastDocId)
        .get();
      firestoreReads += 1; // Reading the lastDoc counts as 1 read

      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
        console.log(`✅ [SYSTEM LOGS] LastDoc found, applying pagination`);
      } else {
        console.log(`❌ [SYSTEM LOGS] LastDoc not found`);
      }
    }

    query = query.limit(limit + 1); // Fetch one extra to check if there are more

    console.log(`📊 [SYSTEM LOGS] Executing query with limit: ${limit + 1}`);
    const systemLogsSnapshot = await query.get();
    const docs = systemLogsSnapshot.docs;

    // Each document read counts as 1 Firestore read
    firestoreReads += docs.length;

    // Check if there are more results
    const hasMore = docs.length > limit;
    const actualDocs = hasMore ? docs.slice(0, limit) : docs;

    const systemLogs = actualDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (UserActivity & { id: string })[];

    // Log the types found to verify filtering
    const typesFound = systemLogs.map((log) => log.type);
    const uniqueTypes = [...new Set(typesFound)];
    console.log(`🏷️  [SYSTEM LOGS] Types found: ${uniqueTypes.join(", ")}`);
    console.log(
      `🏷️  [SYSTEM LOGS] Expected types: update_profile, enroll_course, ticket_created`
    );

    // Check for unexpected types
    const expectedTypes = ["update_profile", "enroll_course", "ticket_created"];
    const unexpectedTypes = uniqueTypes.filter(
      (type) => !expectedTypes.includes(type)
    );
    if (unexpectedTypes.length > 0) {
      console.warn(
        `⚠️  [SYSTEM LOGS] Unexpected types found: ${unexpectedTypes.join(
          ", "
        )}`
      );
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`📈 [SYSTEM LOGS] Query completed:`);
    console.log(
      `   • Documents fetched: ${docs.length} (${actualDocs.length} returned, ${
        hasMore ? "1 extra for hasMore check" : "no extra"
      })`
    );
    console.log(`   • Firestore reads: ${firestoreReads} reads`);
    console.log(`   • Page: ${page}, Has more: ${hasMore}`);
    console.log(`   • Duration: ${duration}ms`);
    console.log(
      `   • Cache status: ${
        page === 1 && !lastDocId ? "FRESH QUERY" : "PAGINATED QUERY"
      }`
    );

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
    console.error("❌ [SYSTEM LOGS] Error in systemLog:", error);
    return { error };
  }
};

// Cached version with 5-minute cache duration for system logs
export const fetchSystemLogs = unstable_cache(
  async (page = 1, limit = 20, lastDocId?: string) => {
    console.log(
      `🗄️  [SYSTEM CACHE] Cache miss - executing fetchSystemLogsInternal(${page}, ${limit}, ${
        lastDocId ? "lastDocId" : "no-lastDocId"
      })`
    );
    return await fetchSystemLogsInternal(page, limit, lastDocId);
  },
  ["system-logs"],
  {
    revalidate: 300, // 5 minutes
    tags: ["userActivities"],
  }
);

// Cache revalidation functions
export const revalidateAuthLogsCache = async () => {
  "use server";
  console.log("🔄 [CACHE] Revalidating auth logs cache...");
  revalidateTag("userActivities");
};

export const revalidateContentLogsCache = async () => {
  "use server";
  console.log("🔄 [CACHE] Revalidating content logs cache...");
  revalidateTag("userActivities");
};

export const revalidateSystemLogsCache = async () => {
  "use server";
  console.log("🔄 [CACHE] Revalidating system logs cache...");
  revalidateTag("userActivities");
};
