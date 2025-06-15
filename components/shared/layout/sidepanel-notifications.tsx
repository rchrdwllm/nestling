import { Button } from "@/components/ui/button";
import { Notification } from "@/types";
import { X } from "lucide-react";
import NotificationCard from "./notification-card";
import { useAction } from "next-safe-action/hooks";
import { deleteAllNotif } from "@/server/actions/delete-all-notif";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";

type SidePanelNotifications = {
  notifications: Notification[];
};

const SidePanelNotifications = ({ notifications }: SidePanelNotifications) => {
  const { execute } = useAction(deleteAllNotif, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Notifications cleared");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to clear notifications");
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Clearing notifications...");
    },
  });
  const { user } = useCurrentUser();

  return (
    <div>
      <section className="flex justify-between items-center">
        <h1 className="font-semibold">Notifications</h1>
        <Button
          onClick={() => {
            execute({ userId: user.id });
          }}
          variant="outline"
          className="px-2"
        >
          <X className="size-5" />
        </Button>
      </section>
      <div className="flex flex-col gap-2 mt-4">
        {notifications.length ? (
          notifications.map((notification) => (
            <NotificationCard key={notification.id} {...notification} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default SidePanelNotifications;
