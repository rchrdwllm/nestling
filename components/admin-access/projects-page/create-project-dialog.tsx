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
import CreateProjectForm from "./create-project-form";
import { useProjectsTimelineStore } from "@/context/projects-timeline-context";

type CreateProjectDialogProps = {
  admins: string;
  instructors: string;
};

const CreateProjectDialog = ({
  admins,
  instructors,
}: CreateProjectDialogProps) => {
  const { formToggled, setFormToggled } = useProjectsTimelineStore();
  const { setSelectedEndDate, setSelectedStartDate } =
    useProjectsTimelineStore();

  return (
    <Dialog open={formToggled} onOpenChange={setFormToggled}>
      <DialogTrigger
        onClick={() => {
          setFormToggled(true);
          setSelectedStartDate(new Date());
          setSelectedEndDate(new Date());
        }}
        asChild
      >
        {null}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new project
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm
          admins={admins}
          instructors={instructors}
          setIsOpen={setFormToggled}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
