import { Button } from "@/components/ui/button";
import { Module } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteModule } from "@/server/actions/delete-module";

type DeleteModuleBtnProps = {
  module: string;
};

const DeleteModuleBtn = ({ module }: DeleteModuleBtnProps) => {
  const moduleData = JSON.parse(module) as Module;
  const { execute, isExecuting } = useAction(deleteModule, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Module deleted successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error deleting module: ${error}`);
    },
    onExecute: () => {
      toast.dismiss();
      toast.loading("Deleting module...");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="block px-2 py-1.5 w-full font-normal text-primary hover:text-primary text-sm text-left"
        >
          Delete module
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently this course
            module along with all its contents and associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isExecuting}
            onClick={() => execute({ moduleId: moduleData.id })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModuleBtn;
