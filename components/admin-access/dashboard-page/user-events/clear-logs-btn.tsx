import { Button } from "@/components/ui/button";
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
import { deleteUserLogs } from "@/server/actions/delete-user-logs";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useState } from "react";

type ClearLogsBtnProps = {
  table: Table<unknown>;
  types: any;
};

const ClearLogsBtn = ({ table, types }: ClearLogsBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute } = useAction(deleteUserLogs, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Clearing logs...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logs deleted successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting logs:", error);
      toast.dismiss();
      toast.error("Error deleting logs");
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          notAnimated
          disabled={!table.getRowModel().rows.length}
          variant="outline"
          className="hover:text-primary"
        >
          <X className="size-4" /> Clear logs
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete all logs. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => execute({ types })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearLogsBtn;
