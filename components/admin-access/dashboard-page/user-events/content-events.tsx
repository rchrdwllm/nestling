"use client";

import { clientDb } from "@/lib/firebase-client";
import { UserActivity } from "@/types";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import LogsTable from "./logs-table";
import { logsTableColsWithDetails } from "./logs-table-def";

const ContentEvents = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "userActivities"),
      where("type", "in", [
        "view_course",
        "view_content",
        "view_project",
        "submit_assignment",
        "grade_submission",
      ]),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activities = snapshot.docs.map((doc) =>
        doc.data()
      ) as UserActivity[];

      setLogs(activities);
    });

    return () => unsubscribe();
  }, []);

  return (
    <LogsTable
      columns={logsTableColsWithDetails}
      data={logs}
      types={[
        "view_course",
        "view_content",
        "view_project",
        "submit_assignment",
        "grade_submission",
      ]}
    />
  );
};

export default ContentEvents;
