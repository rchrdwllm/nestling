"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  GanttCreateMarkerTrigger,
  GanttFeatureItem,
  GanttFeatureList,
  GanttHeader,
  GanttProvider,
  GanttSidebar,
  GanttSidebarItem,
  GanttTimeline,
  GanttToday,
} from "@/components/ui/gantt";
import { EyeIcon, LinkIcon, Plus, TrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { addMonths, endOfMonth, startOfMonth } from "date-fns";
import { Project, User } from "@/types";
import { useProjectsTimelineStore } from "@/context/projects-timeline-context";
import { useAction } from "next-safe-action/hooks";
import { createProject } from "@/server/actions/create-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProjectsTimelineProps = {
  admins: string;
  instructors: string;
  projects: Project[];
};

const ProjectsTimeline = ({
  admins,
  instructors,
  projects,
}: ProjectsTimelineProps) => {
  const { setFormToggled, setSelectedStartDate, setSelectedEndDate } =
    useProjectsTimelineStore();
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<"monthly" | "quarterly">("monthly");
  const adminsData = useMemo(() => JSON.parse(admins) as User[], [admins]);
  const instructorsData = useMemo(
    () => JSON.parse(instructors) as User[],
    [instructors]
  );
  const router = useRouter();
  const projectsWithOwners = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        owner:
          [...adminsData, ...instructorsData].find((user) => {
            return user.id === project.ownerId;
          }) || null,
      })),
    [projects, adminsData, instructorsData]
  );
  const [features, setFeatures] = useState(projectsWithOwners);
  const { execute } = useAction(createProject, {
    onExecute: () => {
      toast.dismiss("Updating project...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Project updated successfully!");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error updating project: ${error}`);
    },
  });

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setFeatures(projectsWithOwners);
  }, [projectsWithOwners]);

  if (!isMounted) return null;

  const handleViewFeature = (id: string) => {
    router.push(`/projects/${id}`);
  };

  const handleCopyLink = (id: string) => console.log(`Copy link: ${id}`);

  const handleRemoveFeature = (id: string) =>
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));

  const handleCreateWithDate = (date: Date) => {
    setFormToggled(true);

    const startDate = date;
    const endDate = addMonths(date, 1);

    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleMoveFeature = (
    id: string,
    startDate: Date,
    endDate: Date | null
  ) => {
    if (!endDate) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id
          ? {
              ...feature,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            }
          : feature
      )
    );

    execute({
      ...features.find((feature) => feature.id === id)!,
      endDate: endDate,
      startDate: startDate,
      isEdit: true,
      projectId: id,
    });
  };

  const handleAddFeature = (date: Date) => {
    setFormToggled(true);

    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center gap-4">
        <Select
          value={view}
          onValueChange={(val) => setView(val as "monthly" | "quarterly")}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" title="Go to today">
          <CalendarIcon size={18} className="mr-2" />
          Today
        </Button>
        <Button className="ml-auto">
          <Plus className="size-4" />
          New project
        </Button>
      </div>
      <GanttProvider
        className="border border-input rounded-xl shadow-sm"
        onAddItem={handleAddFeature}
        range={view}
        zoom={100}
      >
        <GanttSidebar>
          {features.map((feature) => {
            return (
              <GanttSidebarItem
                key={feature.id}
                feature={feature}
                onSelectItem={handleViewFeature}
              />
            );
          })}
        </GanttSidebar>
        <GanttTimeline>
          <GanttHeader />
          <GanttFeatureList>
            {features.map((feature) => {
              return (
                <div className="flex" key={feature.id}>
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <button
                        type="button"
                        onClick={() => handleViewFeature(feature.id)}
                      >
                        <GanttFeatureItem
                          onMove={handleMoveFeature}
                          {...feature}
                        >
                          <p className="flex-1 truncate text-xs">
                            {feature.title}
                          </p>
                          {feature.owner && feature.owner.image ? (
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={feature.owner.image} />
                              <AvatarFallback>
                                {feature.owner.name?.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex items-center justify-center size-6 bg-muted rounded-full">
                              <p className="text-xs font-semibold">
                                {feature.owner!.name![0]}
                              </p>
                            </div>
                          )}
                        </GanttFeatureItem>
                      </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        className="flex items-center gap-2"
                        onClick={() => handleViewFeature(feature.id)}
                      >
                        <EyeIcon size={16} className="text-muted-foreground" />
                        View feature
                      </ContextMenuItem>
                      <ContextMenuItem
                        className="flex items-center gap-2"
                        onClick={() => handleCopyLink(feature.id)}
                      >
                        <LinkIcon size={16} className="text-muted-foreground" />
                        Copy link
                      </ContextMenuItem>
                      <ContextMenuItem
                        className="flex items-center gap-2 text-destructive"
                        onClick={() => handleRemoveFeature(feature.id)}
                      >
                        <TrashIcon size={16} />
                        Remove from roadmap
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              );
            })}
          </GanttFeatureList>
          <GanttToday />
          <GanttCreateMarkerTrigger onCreateMarker={handleCreateWithDate} />
        </GanttTimeline>
      </GanttProvider>
    </div>
  );
};

export default ProjectsTimeline;
