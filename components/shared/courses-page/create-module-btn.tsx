"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateModuleForm from "./create-module-form";
import { useState } from "react";

type CreateModuleBtnProps = {
  courseId: string;
};

const CreateModuleBtn = ({ courseId }: CreateModuleBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          New module
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create module</DialogTitle>
          <DialogDescription>Enter course module name</DialogDescription>
        </DialogHeader>
        <CreateModuleForm courseId={courseId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateModuleBtn;
