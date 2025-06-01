import { deleteNotif } from "@/server/actions/delete-notif";
import { readNotif } from "@/server/actions/read-notif";
import { Notification } from "@/types";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";

const NotificationCard = ({ title, message, url, id }: Notification) => {
  const { execute } = useAction(readNotif, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Notifications marked as read");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to mark notifications as read");
    },
  });

  const handleNotifClick = async () => {
    execute({ notifId: id });
  };

  return (
    <Link
      onClick={handleNotifClick}
      href={url}
      className="text-sm cursor-pointer"
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
    </Link>
  );
};

export default NotificationCard;
