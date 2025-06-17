"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteDiscussionBtn from "./delete-discussion-btn";
import ArchiveDiscussionBtn from "./archive-discussion-btn";
import { Discussion } from "@/types";

type DiscussionDetailsBtnProps = {
  discussion: Discussion;
};

const DiscussionDetailsBtn = ({ discussion }: DiscussionDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <ArchiveDiscussionBtn
            discussionId={discussion.id}
            discussion={discussion}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteDiscussionBtn discussionId={discussion.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DiscussionDetailsBtn;
