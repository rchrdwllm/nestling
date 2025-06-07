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
import { logsTableCols } from "./logs-table-def";

const SystemEvents = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "userActivities"),
      where("type", "in", [
        "update_profile",
        "enroll_course",
        "ticket_created",
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
      columns={logsTableCols}
      data={logs}
      types={["update_profile", "enroll_course", "ticket_created"]}
    />
  );
};

export default SystemEvents;
