"use client";

import { Button } from "@/components/ui/button";
import { deleteNotif } from "@/server/actions/delete-notif";
import { readNotif } from "@/server/actions/read-notif";
import { Check, X } from "lucide-react";
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
};

const NotifActions = ({ notifId }: NotifActionsProps) => {
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
      toast.error("Failed to mark notification as read");
      console.error("Error marking notification as read");
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Marking as read...");
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
              <Check className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as read</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default NotifActions;
