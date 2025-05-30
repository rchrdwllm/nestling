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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  LinkIcon,
  Plus,
  TrashIcon,
} from "lucide-react";
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
import { format } from "date-fns";
import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { Project, Task, User } from "@/types";
import { useTasksTimelineStore } from "@/context/tasks-timeline-context";
import { useAction } from "next-safe-action/hooks";
import { createProject } from "@/server/actions/create-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createTask } from "@/server/actions/create-task";

type TasksTimelineProps = {
  tasks: Task[];
};

const TasksTimeline = ({ tasks }: TasksTimelineProps) => {
  const { setFormToggled, setSelectedStartDate, setSelectedEndDate } =
    useTasksTimelineStore();
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<"daily" | "monthly" | "quarterly">(
    "monthly"
  );
  const router = useRouter();
  const [features, setFeatures] = useState(tasks);
  const { execute } = useAction(createTask, {
    onExecute: () => {
      toast.dismiss("Updating task...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Error updating task: ${error}`);
    },
  });
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date());

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setFeatures(tasks);
  }, [tasks]);

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
    let endDate;

    if (view === "daily") {
      endDate = addDays(date, 1);
    } else {
      endDate = addMonths(date, 1);
    }

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
      taskId: id,
    });
  };
  const handleAddFeature = (date?: Date) => {
    setFormToggled(true);

    let startDate, endDate;

    if (date) {
      if (view === "daily") {
        startDate = startOfDay(date);
        endDate = endOfDay(date);
      } else {
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
      }
    } else {
      startDate = new Date();

      if (view === "daily") {
        endDate = addDays(startDate, 1);
      } else {
        endDate = addMonths(startDate, 1);
      }
    }

    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handlePrevMonth = () => {
    if (view === "daily") {
      const prevMonth = new Date(currentDisplayMonth);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setCurrentDisplayMonth(prevMonth);

      const firstDayOfMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        1
      );
      setSelectedStartDate(firstDayOfMonth);
      setSelectedEndDate(addDays(firstDayOfMonth, 1));
    }
  };

  const handleNextMonth = () => {
    if (view === "daily") {
      const nextMonth = new Date(currentDisplayMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentDisplayMonth(nextMonth);

      const firstDayOfMonth = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1
      );
      setSelectedStartDate(firstDayOfMonth);
      setSelectedEndDate(addDays(firstDayOfMonth, 1));
    }
  };

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
        {view === "daily" && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              title="Previous month"
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="text-xs font-medium">
              {format(currentDisplayMonth, "MMMM yyyy")}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              title="Next month"
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        )}
        <Button type="button" variant="outline" title="Go to today">
          <CalendarIcon size={18} className="mr-2" />
          Today
        </Button>
      </div>
      <GanttProvider
        key={`gantt-view-${view}-${currentDisplayMonth.getMonth()}-${currentDisplayMonth.getFullYear()}`}
        className="border border-input rounded-xl shadow-sm"
        onAddItem={handleAddFeature}
        range={view}
        zoom={100}
        currentMonth={currentDisplayMonth}
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

export default TasksTimeline;
