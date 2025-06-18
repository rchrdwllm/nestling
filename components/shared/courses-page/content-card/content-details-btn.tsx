"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import DeleteContentBtn from "./delete-content-btn";
import Link from "next/link";

type ContentDetailsBtnProps = {
  contentId: string;
  moduleId: string;
  courseId: string;
};

const ContentDetailsBtn = ({
  contentId,
  moduleId,
  courseId,
}: ContentDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link
          href={`/courses/${courseId}/create?moduleId=${moduleId}&contentId=${contentId}`}
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem asChild>
          <DeleteContentBtn contentId={contentId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentDetailsBtn;
