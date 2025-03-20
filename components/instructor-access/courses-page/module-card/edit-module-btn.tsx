import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateModuleForm from "../create-module-form";
import { Module } from "@/types";

type EditModuleBtnProps = {
  module: string;
};

const EditModuleBtn = ({ module }: EditModuleBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const moduleData = JSON.parse(module) as Module;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-left block w-full px-2 py-1.5 font-normal"
        >
          Edit module
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit module</DialogTitle>
          <DialogDescription>Edit module details below</DialogDescription>
        </DialogHeader>
        <CreateModuleForm
          courseId={moduleData.courseId}
          setIsOpen={setIsOpen}
          module={moduleData}
          isEdit
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditModuleBtn;
