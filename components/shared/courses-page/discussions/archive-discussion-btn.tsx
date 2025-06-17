import { Button } from "@/components/ui/button";
import { archiveDiscussion } from "@/server/actions/archive-discussion";
import { Discussion } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type ArchiveDiscussionProps = {
  discussionId: string;
  discussion: Discussion;
};

const ArchiveDiscussionBtn = ({
  discussionId,
  discussion,
}: ArchiveDiscussionProps) => {
  const { execute } = useAction(archiveDiscussion, {
    onSuccess: ({ data }) => {
      toast.dismiss();
      if (data?.error) {
        toast.error(JSON.stringify(data.error));
      }

      if (data?.success) {
        toast.success(data.success);
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        `An error occurred while ${
          discussion.isArchived ? "unarchiving" : "archiving"
        } the discussion: ${error}`
      );
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading(
        `${discussion.isArchived ? "Unarchiving" : "Archiving"} discussion...`
      );
    },
  });

  return (
    <Button
      notAnimated
      variant="ghost"
      className="block px-2 py-1.5 w-full font-normal text-sm text-left"
      onClick={() => execute({ discussionId })}
    >
      {discussion.isArchived ? "Unarchive" : "Archive"}
    </Button>
  );
};

export default ArchiveDiscussionBtn;
