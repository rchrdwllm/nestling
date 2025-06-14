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

const AuthenticationEvents = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);

  useEffect(() => {
    const q = query(
      collection(clientDb, "userActivities"),
      where("type", "in", ["login", "logout", "register"]),
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
      types={["login", "logout", "register"]}
    />
  );
};

export default AuthenticationEvents;
