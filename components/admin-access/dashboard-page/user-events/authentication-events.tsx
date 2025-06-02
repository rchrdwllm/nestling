"use client";

import { clientDb } from "@/lib/firebase-client";
import { UserActivity } from "@/types";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import LogsTable from "./logs-table";
import { logsTableCols } from "./logs-table-def";

const AuthenticationEvents = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(clientDb, "userActivities"),
      (snapshot) => {
        const activities = snapshot.docs.map((doc) =>
          doc.data()
        ) as UserActivity[];

        setLogs(activities);
      }
    );

    return () => unsubscribe();
  }, []);

  return <LogsTable columns={logsTableCols} data={logs} />;
};

export default AuthenticationEvents;
