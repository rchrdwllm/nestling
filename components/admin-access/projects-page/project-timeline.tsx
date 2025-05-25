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
import { useEffect, useState } from "react";
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

// Inline content
const today = new Date();

const exampleStatuses = [
  { id: "1", name: "Planned", color: "#6B7280" },
  { id: "2", name: "In Progress", color: "#F59E0B" },
  { id: "3", name: "Done", color: "#10B981" },
];

const initialFeatures = [
  {
    id: "1",
    name: "AI Scene Analysis",
    startAt: startOfMonth(subMonths(today, 6)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[0],
    owner: {
      id: "1",
      image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1",
      name: "Alice Johnson",
    },
    initiative: { id: "1", name: "AI Integration" },
    release: { id: "1", name: "v1.0" },
  },
  {
    id: "2",
    name: "Collaborative Editing",
    startAt: startOfMonth(subMonths(today, 5)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[1],
    owner: {
      id: "2",
      image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2",
      name: "Bob Smith",
    },
    initiative: { id: "2", name: "Real-time Collaboration" },
    release: { id: "1", name: "v1.0" },
  },
  {
    id: "3",
    name: "AI-Powered Color Grading",
    startAt: startOfMonth(subMonths(today, 4)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[2],
    owner: {
      id: "3",
      image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3",
      name: "Charlie Brown",
    },
    initiative: { id: "1", name: "AI Integration" },
    release: { id: "2", name: "v1.1" },
  },
  {
    id: "4",
    name: "Real-time Video Chat",
    startAt: startOfMonth(subMonths(today, 3)),
    endAt: subDays(endOfMonth(today), 12),
    status: exampleStatuses[0],
    owner: {
      id: "4",
      image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=4",
      name: "Diana Prince",
    },
    initiative: { id: "2", name: "Real-time Collaboration" },
    release: { id: "2", name: "v1.1" },
  },
  {
    id: "5",
    name: "AI Voice-to-Text Subtitles",
    startAt: startOfMonth(subMonths(today, 2)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[1],
    owner: {
      id: "5",
      image: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=5",
      name: "Ethan Hunt",
    },
    initiative: { id: "1", name: "AI Integration" },
    release: { id: "2", name: "v1.1" },
  },
];

const ProjectTimeline = () => {
  const [features, setFeatures] = useState(initialFeatures);
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<"daily" | "monthly" | "quarterly">(
    "monthly"
  );

  useEffect(() => setIsMounted(true), []);

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

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    console.log(`Move feature: ${id} from ${startAt} to ${endAt}`);
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
        <Button
          className="ml-auto"
          onClick={() => handleAddFeature(new Date())}
        >
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
          {features.map((feature) => (
            <GanttSidebarItem
              key={feature.id}
              feature={feature}
              onSelectItem={handleViewFeature}
            />
          ))}
        </GanttSidebar>
        <GanttTimeline>
          <GanttHeader />
          <GanttFeatureList>
            {features.map((feature) => (
              <div className="flex" key={feature.id}>
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleViewFeature(feature.id)}
                    >
                      <GanttFeatureItem onMove={handleMoveFeature} {...feature}>
                        <p className="flex-1 truncate text-xs">
                          {feature.name}
                        </p>
                        {feature.owner && (
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={feature.owner.image} />
                            <AvatarFallback>
                              {feature.owner.name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
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
            ))}
          </GanttFeatureList>
          <GanttToday />
          <GanttCreateMarkerTrigger onCreateMarker={handleCreateMarker} />
        </GanttTimeline>
      </GanttProvider>
    </div>
  );
};

export default ProjectTimeline;
