"use client";

import { UserActivity } from "@/types";
import { useEffect, useState } from "react";
import LogsTable from "./logs-table";
import { logsTableCols } from "./logs-table-def";
import { fetchSystemLogs, revalidateSystemLogsCache } from "@/lib/user-log";
import { Button } from "@/components/ui/button";

const SystemEvents = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasMore: false,
    lastDocId: undefined as string | undefined,
    totalFetched: 0,
  });

  const loadLogs = async (page: number = 1, append: boolean = false) => {
    console.log(
      `🔄 [CLIENT] Loading system logs - Page: ${page}, Append: ${append}`
    );
    setLoading(true);

    try {
      const result = await fetchSystemLogs(
        page,
        20,
        page > 1 ? pagination.lastDocId : undefined
      );

      if (result.success) {
        const { logs: newLogs, pagination: newPagination } = result.success;

        console.log(
          `✅ [CLIENT] Received ${newLogs.length} system logs from server`
        );
        console.log(
          `📊 [CLIENT] Total system logs now: ${
            append ? logs.length + newLogs.length : newLogs.length
          }`
        );

        setLogs((prev) => (append ? [...prev, ...newLogs] : newLogs));
        setPagination({
          ...newPagination,
          lastDocId: newPagination.lastDocId ?? undefined,
        });
      } else {
        console.error("❌ [CLIENT] Failed to fetch system logs:", result.error);
      }
    } catch (error) {
      console.error("❌ [CLIENT] Error loading system logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(1, false);
  }, []);

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      loadLogs(pagination.currentPage + 1, true);
    }
  };

  const handleRefresh = async () => {
    console.log(
      "🔄 [CLIENT] System refresh button clicked - invalidating cache"
    );
    await revalidateSystemLogsCache();
    loadLogs(1, false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-base">System Events</h3>
        <Button
          onClick={handleRefresh}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <LogsTable
        columns={logsTableCols}
        data={logs}
        types={["update_profile", "enroll_course", "ticket_created"]}
        loading={loading}
      />

      {pagination.hasMore && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} disabled={loading} variant="outline">
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      <div className="text-muted-foreground text-sm text-center">
        Showing {logs.length} events
      </div>
    </div>
  );
};

export default SystemEvents;
