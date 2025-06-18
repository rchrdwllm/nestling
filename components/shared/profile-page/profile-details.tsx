"use client";

import { Course, User } from "@/types";
import { Mail, MapPin, MessageSquare, Pencil, PhoneCall } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import EditProfileForm from "./edit-profile-form";
import Link from "next/link";
import { generateChannelId } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type ProfileDetailsProps = {
  user: User;
  courses: Course[];
};

const ProfileDetails = ({ user, courses }: ProfileDetailsProps) => {
  const { user: currentUser } = useCurrentUser();
  const [toggleEdit, setToggleEdit] = useState(false);
  const isCurrentUser = currentUser?.id === user.id;
  const channelId = useMemo(
    () => generateChannelId(currentUser.id, user.id),
    [currentUser.id, user.id]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        {!toggleEdit &&
          (user.image ? (
            <Avatar className="size-32">
              <AvatarImage src={user.image} className="object-cover" />
              <AvatarFallback>
                <div className="flex justify-center items-center bg-muted rounded-full size-32">
                  <p className="font-bold text-xl">{user.name![0]}</p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex justify-center items-center bg-muted rounded-full size-32">
              <p className="font-bold text-xl">{user.name![0]}</p>
            </div>
          ))}
        <h1 className="mt-6 font-semibold text-3xl text-center">
          {user.name || `${user.firstName} ${user.lastName}`}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
      {user.role !== "admin" && !toggleEdit && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center gap-2 bg-muted-secondary p-4 border border-border rounded-lg cursor-pointer">
              <h1 className="font-mono font-semibold text-2xl">
                {courses.length}
              </h1>
              <p className="text-muted-foreground text-sm">
                {user.role === "instructor" ? "Courses" : "Enrolled courses"}
              </p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Courses</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[400px]">
              {courses.length > 0 ? (
                <ul className="pl-5 list-disc">
                  {courses.map((course) => (
                    <li key={course.id}>
                      {course.courseCode} - {course.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No courses found.</p>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
      <div className="flex flex-col items-start gap-4">
        <Link href={`mailto:${user.email}`}>
          <Button
            variant="link"
            className="flex items-center gap-3 p-0 h-[unset] font-normal text-foreground text-base"
          >
            <Mail className="size-4 text-muted-foreground" /> {user.email}
          </Button>
        </Link>
        <p className="flex items-center gap-3">
          <PhoneCall className="size-4 text-muted-foreground" />{" "}
          {user.contactNumber || "N/A"}
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="size-4 text-muted-foreground" />{" "}
          {user.address || "N/A"}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        {!toggleEdit ? (
          (isCurrentUser || currentUser.role === "admin") && (
            <Button
              className="w-full max-w-[180px]"
              onClick={() => setToggleEdit(true)}
              variant="outline"
            >
              <Pencil className="size-4" /> Edit profile
            </Button>
          )
        ) : (
          <EditProfileForm
            setToggleEdit={setToggleEdit}
            user={user}
            contentsLength={courses.length}
          />
        )}
        {!isCurrentUser && (
          <Link
            href={`/inbox/${channelId}?senderId=${currentUser.id}&receiverId=${user.id}`}
            className="block w-full max-w-[180px]"
          >
            <Button variant="outline" className="w-full">
              <MessageSquare className="size-4" /> Send message
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
