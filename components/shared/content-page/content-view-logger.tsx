"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { Content } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

type ContentViewLoggerProps = {
  content: Content;
};

const ContentViewLogger = ({ content }: ContentViewLoggerProps) => {
  const { execute } = useAction(logUserActivity);
  const { user } = useCurrentUser();

  useEffect(() => {
    execute({
      userId: user.id,
      type: "view_content",
      targetId: content.id,
      details: {
        courseId: content.courseId,
        title: content.title,
      },
    });
  }, [content]);

  return null;
};

export default ContentViewLogger;
