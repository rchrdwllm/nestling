"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteDiscussionBtn from "./delete-discussion-btn";

type DiscussionDetailsBtnProps = {
  discussionId: string;
};

const DiscussionDetailsBtn = ({ discussionId }: DiscussionDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DeleteDiscussionBtn discussionId={discussionId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DiscussionDetailsBtn;
