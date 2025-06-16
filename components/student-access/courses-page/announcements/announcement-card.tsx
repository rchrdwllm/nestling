import { Announcement } from "@/types";
import { format } from "date-fns";
import { getUserById } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import DateDisplay from "@/components/ui/date-display";
import { getCourse } from "@/lib/course";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/ui/error-toast";
import { Badge } from "@/components/ui/badge";

type AnnouncementCardProps = {
  announcement: Announcement;
  showCourseTitle?: boolean;
};

const AnnouncementCard = async ({
  announcement,
  showCourseTitle = false,
}: AnnouncementCardProps) => {
  const { title, content, senderId } = announcement;
  const { success: sender, error: senderError } = await getUserById(senderId);
  const { success: course, error: courseError } = await getCourse(
    announcement.courseId
  );

  if (courseError || !course) {
    return (
      <ErrorToast error={"Error fetching course information: " + courseError} />
    );
  }

  if (senderError || !sender) {
    return (
      <ErrorToast error={"Error fetching sender information: " + senderError} />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="flex gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
          {sender.image ? (
            <Avatar className="size-10">
              <AvatarImage src={sender.image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                  <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                    {sender.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
              <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                {sender.name![0]}
              </p>
            </div>
          )}
          <div className="flex flex-col flex-1 gap-2 cursor-pointer">
            {showCourseTitle && (
              <Link href={`/courses/${course.id}`}>
                <Button variant="link" className="p-0">
                  {course.name}
                </Button>
              </Link>
            )}
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">{title}</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              <DateDisplay
                date={announcement.createdAt}
                outputFormat="MMMM d, yyyy h:mm a"
              />
            </p>
            {sender.role === "admin" && (
              <Badge variant="secondary" className="w-max">
                From admin
              </Badge>
            )}
            <p className="text-muted-foreground">{content}</p>
          </div>
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle asChild>
          <div className="flex items-start gap-4">
            {sender.image ? (
              <Avatar className="size-10">
                <AvatarImage src={sender.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                    <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                      {sender.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                  {sender.name![0]}
                </p>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div>
                <h1 className="font-semibold">{sender.name}</h1>
                <p className="mb-2 text-muted-foreground text-sm">
                  Posted at{" "}
                  <DateDisplay
                    date={announcement.createdAt}
                    outputFormat="MMMM d, yyyy h:mm a"
                  />
                </p>
              </div>
              {sender.role === "admin" && (
                <Badge variant="secondary" className="w-max">
                  From admin
                </Badge>
              )}
            </div>
          </div>
        </DialogTitle>
        <DialogDescription asChild></DialogDescription>
        <h1 className="font-semibold text-xl">{title}</h1>
        <p>{content}</p>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementCard;
