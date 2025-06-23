"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteAllNotif } from "@/server/actions/delete-all-notif";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const ClearAllBtn = () => {
  const { user } = useCurrentUser();
  const { execute } = useAction(deleteAllNotif, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Notifications deleted");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to delete notifications");
      console.error("Error deleting notifications");
    },
    onExecute: () => {
      toast.loading("Deleting notifications...");
    },
  });

  return (
    <Button onClick={() => execute({ userId: user.id })} variant="outline">
      Clear all
    </Button>
  );
};

export default ClearAllBtn;
