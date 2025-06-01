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
    console.error("Error fetching course information:", courseError);
    return <p>Error fetching course information</p>;
  }

  if (senderError || !sender) {
    console.error("Error fetching sender information:", senderError);
    return <p>Error fetching sender information</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex gap-4">
          {sender.image ? (
            <Avatar className="size-10">
              <AvatarImage src={sender.image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                  <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                    {sender.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
              <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                {sender.name![0]}
              </p>
            </div>
          )}
          <div className="cursor-pointer flex-1 flex flex-col gap-2">
            {showCourseTitle && (
              <Link href={`/courses/${course.id}`}>
                <Button variant="link" className="p-0">
                  {course.name}
                </Button>
              </Link>
            )}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              <DateDisplay
                date={announcement.createdAt}
                outputFormat="MMMM d, yyyy h:mm a"
              />
            </p>
            <p className="text-muted-foreground">{content}</p>
          </div>
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle asChild>
          <div className="flex items-center gap-4">
            {sender.image ? (
              <Avatar className="size-10">
                <AvatarImage src={sender.image} className="object-cover" />
                <AvatarFallback>
                  <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                    <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                      {sender.name![0]}
                    </p>
                  </div>
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {sender.name![0]}
                </p>
              </div>
            )}
            <div>
              <h1 className="font-semibold">{sender.name}</h1>
              <p className="text-sm text-muted-foreground mb-2">
                Posted at{" "}
                <DateDisplay
                  date={announcement.createdAt}
                  outputFormat="MMMM d, yyyy h:mm a"
                />
              </p>
            </div>
          </div>
        </DialogTitle>
        <DialogDescription asChild></DialogDescription>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p>{content}</p>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementCard;
