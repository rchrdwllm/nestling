"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import ArchiveAnnouncementBtn from "./archive-announcement-btn";

type AnnouncementDetailsBtnProps = {
  announcementId: string;
  isArchived: boolean;
};

const AnnouncementDetailsBtn = ({
  announcementId,
  isArchived,
}: AnnouncementDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <ArchiveAnnouncementBtn
            announcementId={announcementId}
            isArchived={isArchived}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnouncementDetailsBtn;
