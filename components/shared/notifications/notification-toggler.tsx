"use client";

import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateNotifPref } from "@/server/actions/update-notif-pref";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

const NotificationToggler = () => {
  const { user } = useCurrentUser();
  const { update, data } = useSession();
  const [isToggled, setIsToggled] = useState(user.notifsEnabled);
  const { execute } = useAction(updateNotifPref, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success ?? "Notification preference updated");

      // TODO: Nagrerefresh pag nag update dapat nde
      update().then((data) => console.log("Session updated", data));
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to update notification preference");

      setIsToggled((prev) => !prev);
    },
  });

  const handleToggle = (e: any) => {
    e.stopPropagation();

    setIsToggled((prev) => !prev);

    execute({ userId: user.id });
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Bell className="size-4" />
        <span>Notifications</span>
      </div>
      <Switch checked={isToggled} onClick={(e) => handleToggle(e)} />
    </div>
  );
};

export default NotificationToggler;
