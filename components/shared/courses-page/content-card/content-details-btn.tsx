"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import DeleteContentBtn from "./delete-content-btn";

type ContentDetailsBtnProps = {
  contentId: string;
};

const ContentDetailsBtn = ({ contentId }: ContentDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DeleteContentBtn contentId={contentId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentDetailsBtn;
