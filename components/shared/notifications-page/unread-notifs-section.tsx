"use client";

import { Notification } from "@/types";
import NotifCard from "./notif-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUnreadNotifs } from "@/lib/notification";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

type UnreadNotifsSectionProps = {
  notifications: Notification[];
  lastDocId: string | null;
  hasMore?: boolean;
};

const UnreadNotifsSection = ({
  notifications,
  lastDocId,
  hasMore,
}: UnreadNotifsSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(notifications);
  const [newLastDocId, setNewLastDocId] = useState<string | null>(lastDocId);
  const [hasMoreNotifs, setHasMoreNotifs] = useState(hasMore ?? false);

  const { user } = useCurrentUser();

  useEffect(() => {
    if (!notifications.length) {
      setNotifs([]);
      setNewLastDocId(null);
    } else {
      setNotifs((prev) => {
        const existingIds = new Set(prev.map((notif) => notif.id));
        return [
          ...prev,
          ...notifications.filter((notif) => !existingIds.has(notif.id)),
        ];
      });
    }
  }, [notifications]);

  useEffect(() => {
    setNewLastDocId(lastDocId || null);
    setHasMoreNotifs(hasMore ?? false);
  }, [lastDocId, hasMore]);

  const handleFetchMore = async () => {
    if (newLastDocId) {
      if (isLoading) return;

      setIsLoading(true);

      const { success, error, lastDocId, hasMore } = await getUnreadNotifs(
        user.id,
        5,
        newLastDocId
      );

      if (error) {
        console.error("Error fetching more notifications:", error);
        toast.error("Error fetching more notifications: " + error);

        setIsLoading(false);

        return;
      }

      if (success) {
        setNotifs((prev) => [...prev, ...success]);
        setNewLastDocId(lastDocId);
        setHasMoreNotifs(hasMore);
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center gap-4">
      {!notifs.length ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground text-sm">No notifications</p>
        </div>
      ) : (
        notifs.map((notif) => <NotifCard key={notif.id} {...notif} />)
      )}
      {notifs.length ? (
        <Button
          disabled={!lastDocId || isLoading || !hasMoreNotifs}
          variant="outline"
          onClick={handleFetchMore}
        >
          {isLoading ? "Loading..." : "Show more"}
        </Button>
      ) : null}
    </section>
  );
};

export default UnreadNotifsSection;
