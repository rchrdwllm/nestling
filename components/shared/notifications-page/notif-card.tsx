import { Card } from "@/components/ui/card";
import { Notification } from "@/types";
import NotifActions from "./notif-actions";
import DateDisplay from "@/components/ui/date-display";

const NotifCard = ({
  title,
  message,
  createdAt,
  id,
  senderId,
  type,
  url,
}: Notification) => {
  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        <p className="text-sm text-muted-foreground">
          <DateDisplay date={createdAt} outputFormat="MMMM d, yyyy h:mm a" />
        </p>
      </div>
      <NotifActions notifId={id} />
    </Card>
  );
};

export default NotifCard;
