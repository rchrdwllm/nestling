import { deleteNotif } from "@/server/actions/delete-notif";
import { Notification } from "@/types";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotificationCard = ({ title, message, url, id }: Notification) => {
  const { execute } = useAction(deleteNotif);
  const router = useRouter();

  const handleNotifClick = async () => {
    execute({ notificationId: id });
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
