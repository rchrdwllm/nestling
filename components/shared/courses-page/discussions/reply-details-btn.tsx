"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteDiscussionBtn from "./delete-discussion-btn";
import DeleteReplyBtn from "./delete-reply-btn";

type ReplyDetailsBtnProps = {
  replyId: string;
};

const ReplyDetailsBtn = ({ replyId }: ReplyDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DeleteReplyBtn replyId={replyId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReplyDetailsBtn;
