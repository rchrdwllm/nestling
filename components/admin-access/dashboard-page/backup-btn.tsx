"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { backupFirestore } from "@/lib/backup";
import { Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const BackupBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackupData = async () => {
    try {
      setIsLoading(true);
      toast.loading(
        "Creating backup. You may continue working while this runs..."
      );

      const res = await backupFirestore();

      if (res.success) {
        const data = res.success;
        const blob = new Blob([data], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "firestore-backup.json";
        a.click();

        window.URL.revokeObjectURL(url);

        toast.dismiss();
        toast.success("Backup created successfully!");

        setIsOpen(false);
        setIsLoading(false);
      } else {
        toast.dismiss();
        console.error("Error creating backup:", res.error);
        toast.error(
          "An error occurred while creating the backup: " + res.error
        );
        setIsLoading(false);
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error creating backup:", error);
      toast.error("An error occurred while creating the backup: " + error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Share className="size-4" /> Backup data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Backup the data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will create a backup of the current data in a JSON file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleBackupData}>
            Backup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BackupBtn;
