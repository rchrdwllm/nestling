"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { monthEventVariants } from "./full-calendar";
import { format } from "date-fns";
import { Book, Calendar, Clock } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import { getCourse } from "@/lib/course";

type CalendarEventCardProps = {
  title: string;
  start: Date;
  end: Date;
  url: string;
  courseId?: string;
};

const CalendarEventCard = ({
  title,
  start,
  end,
  url,
  courseId,
}: CalendarEventCardProps) => {
  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourse = async () => {
    if (courseId) {
      const { success: course, error } = await getCourse(courseId);

      if (error) {
        console.error("Error fetching course: ", error);
      } else if (course) {
        setCourse(course);
      }
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer px-1 rounded text-sm flex items-center gap-1">
          <div
            className={cn(
              "shrink-0",
              monthEventVariants({ variant: "default" })
            )}
          ></div>
          <span className="flex-1 truncate">{title}</span>
          <time className="tabular-nums text-muted-foreground/50 text-xs">
            {format(start, "HH:mm")}
          </time>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-2">
          <Calendar className="mt-1 size-4 shrink-0" />
          <div>
            <p className="text-sm font-medium">Start Date</p>
            <p className="text-sm text-muted-foreground">
              {format(start, "MMM d, yyyy h:mm a")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="mt-1 size-4 shrink-0" />
          <div>
            <p className="text-sm font-medium">End Date</p>
            <p className="text-sm text-muted-foreground">
              {format(end, "MMM d, yyyy h:mm a")}
            </p>
          </div>
        </div>
        {course && (
          <div className="flex items-start gap-2">
            <Book className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Course</p>
              <p className="text-sm text-muted-foreground">
                {course.courseCode} - {course.name}
              </p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Link href={url}>
            <Button type="button" variant="outline">
              View
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventCard;
