"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { viewCourse } from "@/server/actions/view-course";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

type TrackCourseEngagementProps = {
  courseId: string;
};

const TrackCourseEngagement = ({ courseId }: TrackCourseEngagementProps) => {
  const { execute: logCourseView } = useAction(logUserActivity);
  const { execute: trackCourseView } = useAction(viewCourse);
  const { user } = useCurrentUser();

  useEffect(() => {
    logCourseView({ type: "view_course", targetId: courseId, userId: user.id });
    trackCourseView({ courseId });
  }, [courseId]);

  return null;
};

export default TrackCourseEngagement;
