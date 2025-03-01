"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type CreateContentBtnProps = {
  moduleId: string;
  moduleTitle: string;
};

const CreateContentBtn = ({ moduleId, moduleTitle }: CreateContentBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Plus className="size-4" />
          New content
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add content to {moduleTitle}</DialogTitle>
        </DialogHeader>
        {/* <CreateModuleForm courseId={courseId} setIsOpen={setIsOpen} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateContentBtn;
