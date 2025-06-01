import { Card } from "@/components/ui/card";
import { Notification } from "@/types";
import NotifActions from "./notif-actions";
import DateDisplay from "@/components/ui/date-display";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotifCard = ({ title, message, createdAt, id, url }: Notification) => {
  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Link href={url}>
          <Button
            variant="link"
            className="px-0 text-foreground text-xl font-semibold"
          >
            {title}
          </Button>
        </Link>
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
