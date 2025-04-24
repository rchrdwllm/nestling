import { Button } from "@/components/ui/button";
import { Notification } from "@/types";
import { Mail } from "lucide-react";
import Link from "next/link";

type InboxNotificationProps = Notification;

const InboxNotification = ({ title, message, url }: InboxNotificationProps) => {
  return (
    <article className="flex items-center gap-2">
      <div>
        <Mail size={24} />
      </div>
      <div className="flex-1 w-full">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <Link href={url}>
        <Button variant="secondary">View message</Button>
      </Link>
    </article>
  );
};

export default InboxNotification;
