"use client";

import { Switch } from "@/components/ui/switch";
import { publishModule } from "@/server/actions/publish-module";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type PublishModuleSwitchProps = {
  moduleId: string;
  defaultPublished: boolean;
};

const PublishModuleSwitch = ({
  moduleId,
  defaultPublished,
}: PublishModuleSwitchProps) => {
  const { execute } = useAction(publishModule, {
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
    execute({ moduleId, defaultPublished });
  };

  return (
    <Switch onCheckedChange={handleChange} defaultChecked={defaultPublished} />
  );
};

export default PublishModuleSwitch;
