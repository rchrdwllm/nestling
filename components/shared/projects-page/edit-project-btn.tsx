"use client";

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
import CreateProjectForm from "../../admin-access/projects-page/create-project-form";
import { Pencil } from "lucide-react";

type EditProjectBtnProps = {
  admins: string;
  instructors: string;
  project: string;
};

const EditProjectBtn = ({
  admins,
  instructors,
  project,
}: EditProjectBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>Edit project details below</DialogDescription>
        </DialogHeader>
        <CreateProjectForm
          admins={admins}
          instructors={instructors}
          project={project}
          setIsOpen={setIsOpen}
          isEdit
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectBtn;
