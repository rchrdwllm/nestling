"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import ArchiveAnnouncementBtn from "./archive-announcement-btn";
import EditAnnouncementBtn from "./edit-announcement-btn";
import { Announcement } from "@/types";
import DeleteAnnouncementBtn from "./delete-announcement-btn";

type AnnouncementDetailsBtnProps = {
  announcementId: string;
  isArchived: boolean;
  announcement: Announcement;
};

const AnnouncementDetailsBtn = ({
  announcementId,
  isArchived,
  announcement,
}: AnnouncementDetailsBtnProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={handleClick}>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <EditAnnouncementBtn announcement={announcement} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ArchiveAnnouncementBtn
            announcementId={announcementId}
            isArchived={isArchived}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteAnnouncementBtn announcementId={announcementId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnouncementDetailsBtn;
