"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ReplyDiscussionForm from "./reply-discussion-form";

type DiscussionReplyBtnProps = {
  courseId: string;
  discussionId: string;
};

const DiscussionReplyBtn = ({
  courseId,
  discussionId,
}: DiscussionReplyBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="-ml-4 w-max text-muted-foreground"
          variant="ghost"
        >
          <Plus className="size-4" /> Add reply
        </Button>
      )}
      {isOpen && (
        <ReplyDiscussionForm
          courseId={courseId}
          discussionId={discussionId}
          setIsOpen={setIsOpen}
        />
      )}
    </section>
  );
};

export default DiscussionReplyBtn;
