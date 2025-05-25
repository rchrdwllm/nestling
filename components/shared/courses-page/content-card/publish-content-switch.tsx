"use client";

import { Switch } from "@/components/ui/switch";
import { publishContent } from "@/server/actions/publish-content";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type PublishContentSwitchProps = {
  contentId: string;
  defaultPublished: boolean;
};

const PublishContentSwitch = ({
  contentId,
  defaultPublished,
}: PublishContentSwitchProps) => {
  const { execute } = useAction(publishContent, {
    onExecute: () => {
      toast.dismiss();
      toast.loading(defaultPublished ? "Unpublishing..." : "Publishing...");
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data?.success) {
        toast.success(data.success);
      } else if (data?.error) {
        toast.error(JSON.stringify(data.error));
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  const handleChange = () => {
    execute({ contentId, defaultPublished });
  };

  return (
    <Switch onCheckedChange={handleChange} defaultChecked={defaultPublished} />
  );
};

export default PublishContentSwitch;
