import { Button } from "@/components/ui/button";
import { Notification } from "@/types";
import { X } from "lucide-react";
import NotificationCard from "./notification-card";

type SidePanelNotifications = {
  notifications: Notification[];
};

const SidePanelNotifications = ({ notifications }: SidePanelNotifications) => {
  return (
    <div>
      <section className="flex justify-between items-center">
        <h1 className="font-semibold">Notifications</h1>
        <Button variant="outline" className="px-2">
          <X className="size-5" />
        </Button>
      </section>
      <div className="flex flex-col gap-4 mt-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default SidePanelNotifications;
