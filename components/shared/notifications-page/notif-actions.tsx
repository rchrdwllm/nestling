"use client";

import { Button } from "@/components/ui/button";
import { deleteNotif } from "@/server/actions/delete-notif";
import { readNotif } from "@/server/actions/read-notif";
import { Check, CheckCheck, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type NotifActionsProps = {
  notifId: string;
  isRead: boolean;
};

const NotifActions = ({ notifId, isRead }: NotifActionsProps) => {
  const { execute: execDelete } = useAction(deleteNotif, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Notification deleted");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to delete notification");
      console.error("Error deleting notification");
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting notification...");
    },
  });
  const { execute: execRead } = useAction(readNotif, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success);
    },
    onError: () => {
      toast.dismiss();
      toast.error(
        isRead ? "Failed to mark as unread" : "Failed to mark as read"
      );
      console.error(
        isRead
          ? "Error marking notification as unread"
          : "Error marking notification as read"
      );
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading(isRead ? "Marking as unread..." : "Marking as read...");
    },
  });

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                execDelete({ notificationId: notifId });
              }}
              className="px-2 text-muted-foreground hover:text-primary"
              variant="ghost"
              notAnimated
            >
              <X className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete notification</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                execRead({ notifId: notifId });
              }}
              className="px-3 text-muted-foreground"
              variant="ghost"
              notAnimated
            >
              <CheckCheck className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as {isRead ? "unread" : "read"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default NotifActions;
