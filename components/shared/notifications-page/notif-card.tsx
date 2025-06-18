import { Card } from "@/components/ui/card";
import { Notification } from "@/types";
import NotifActions from "./notif-actions";
import DateDisplay from "@/components/ui/date-display";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotifCard = ({
  title,
  message,
  createdAt,
  id,
  url,
  isRead,
}: Notification) => {
  return (
    <Card className="flex justify-between items-center p-4">
      <div className="flex flex-col gap-2">
        <Link href={url}>
          <Button
            variant="link"
            className="px-0 font-semibold text-foreground text-xl"
          >
            {title}
          </Button>
        </Link>
        <p className="text-muted-foreground">{message}</p>
        <p className="text-muted-foreground text-sm">
          <DateDisplay date={createdAt} outputFormat="MMMM d, yyyy h:mm a" />
        </p>
      </div>
      <NotifActions notifId={id} isRead={isRead} />
    </Card>
  );
};

export default NotifCard;
