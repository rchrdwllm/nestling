"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import EditModuleBtn from "./edit-module-btn";
import ArchiveModuleBtn from "./archive-module-btn";

type ModuleDetailsBtnProps = {
  module: string;
};

const ModuleDetailsBtn = ({ module }: ModuleDetailsBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <EditModuleBtn module={module} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ArchiveModuleBtn module={module} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModuleDetailsBtn;
