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
  GanttFeatureListGroup,
  GanttHeader,
  GanttMarker,
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
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
import {
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import CreateProjectBtn from "./create-project-btn";
import { projectStatuses } from "@/constants/project-statuses";
import { Project, User } from "@/types";

// Inline content
const today = new Date();

type ProjectTimelineProps = {
  admins: string;
  instructors: string;
  projects: Project[];
};

const ProjectTimeline = ({
  admins,
  instructors,
  projects,
}: ProjectTimelineProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<"daily" | "monthly" | "quarterly">(
    "monthly"
  );
  const adminsData = useMemo(() => JSON.parse(admins) as User[], [admins]);
  const instructorsData = useMemo(
    () => JSON.parse(instructors) as User[],
    [instructors]
  );
  const projectsWithOwners = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        owner:
          [...adminsData, ...instructorsData].find((user) => {
            console.log(user.id, project.ownerId);

            return user.id === project.ownerId;
          }) || null,
      })),
    [projects, adminsData, instructorsData]
  );
  const [features, setFeatures] = useState(projectsWithOwners);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setFeatures(projectsWithOwners);
  }, [projectsWithOwners]);

  if (!isMounted) return null;

  const handleViewFeature = (id: string) =>
    console.log(`Feature selected: ${id}`);

  const handleCopyLink = (id: string) => console.log(`Copy link: ${id}`);

  const handleRemoveFeature = (id: string) =>
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));

  const handleRemoveMarker = (id: string) =>
    console.log(`Remove marker: ${id}`);

  const handleCreateMarker = (date: Date) =>
    console.log(`Create marker: ${date.toISOString()}`);

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

    console.log(`Move feature: ${id} from ${startDate} to ${endDate}`);
  };
  const handleAddFeature = (date: Date) =>
    console.log(`Add feature: ${date.toISOString()}`);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center gap-4">
        <Select
          value={view}
          onValueChange={(val) =>
            setView(val as "daily" | "monthly" | "quarterly")
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" title="Go to today">
          <CalendarIcon size={18} className="mr-2" />
          Today
        </Button>
        <CreateProjectBtn admins={admins} instructors={instructors} />
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
          <GanttCreateMarkerTrigger onCreateMarker={handleCreateMarker} />
        </GanttTimeline>
      </GanttProvider>
    </div>
  );
};

export default ProjectTimeline;
