"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { viewCourse } from "@/server/actions/view-course";
import { Course } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

type TrackCourseEngagementProps = {
  course: Course;
};

const TrackCourseEngagement = ({ course }: TrackCourseEngagementProps) => {
  const { execute: logCourseView } = useAction(logUserActivity);
  const { execute: trackCourseView } = useAction(viewCourse);
  const { user } = useCurrentUser();

  useEffect(() => {
    logCourseView({
      type: "view_course",
      targetId: course.id,
      userId: user.id,
      details: { title: course.name, courseId: course.id },
    });
    trackCourseView({ courseId: course.id });
  }, [course]);

  return null;
};

export default TrackCourseEngagement;
