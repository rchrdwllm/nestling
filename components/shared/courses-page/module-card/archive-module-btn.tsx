import { Button } from "@/components/ui/button";
import { archiveModule } from "@/server/actions/archive-module";
import { Module } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type ArchiveModuleBtnProps = {
  module: string;
};

const ArchiveModuleBtn = ({ module }: ArchiveModuleBtnProps) => {
  const moduleData = JSON.parse(module) as Module;
  const { execute } = useAction(archiveModule, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(data.error as string);
      }
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));
    },
  });

  return (
    <Button
      onClick={() =>
        execute({ moduleId: moduleData.id, courseId: moduleData.courseId })
      }
      variant="ghost"
      className="text-sm text-left block w-full px-2 py-1.5 font-normal"
    >
      {moduleData.isArchived ? "Unarchive" : "Archive"} module
    </Button>
  );
};

export default ArchiveModuleBtn;
