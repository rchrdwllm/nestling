"use client";

import { Button } from "@/components/ui/button";
import { archiveAnnouncement } from "@/server/actions/archive-announcement";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type ArchiveAnnouncementBtnProps = {
  announcementId: string;
  isArchived: boolean;
};

const ArchiveAnnouncementBtn = ({
  announcementId,
  isArchived,
}: ArchiveAnnouncementBtnProps) => {
  const { execute } = useAction(archiveAnnouncement, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      toast.success(data?.success);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to archive announcement: " + JSON.stringify(error));
    },
  });

  return (
    <Button
      variant="ghost"
      className="text-sm text-left block w-full px-2 py-1.5 font-normal"
      onClick={() => execute({ announcementId })}
    >
      {isArchived ? "Unarchive" : "Archive"}
    </Button>
  );
};

export default ArchiveAnnouncementBtn;
