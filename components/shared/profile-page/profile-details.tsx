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
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center">
        {!toggleEdit &&
          (user.image ? (
            <Avatar className="size-32">
              <AvatarImage src={user.image} className="object-cover" />
              <AvatarFallback>
                <div className="flex items-center justify-center size-32 bg-muted rounded-full">
                  <p className="text-xl font-bold">{user.name![0]}</p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center justify-center size-32 bg-muted rounded-full">
              <p className="text-xl font-bold">{user.name![0]}</p>
            </div>
          ))}
        <h1 className="text-3xl font-semibold mt-6 text-center">
          {user.name || `${user.firstName} ${user.lastName}`}
        </h1>
        <p className="text-muted-foreground mt-2">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
      {user.role !== "admin" && !toggleEdit && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 cursor-pointer bg-secondary rounded-lg border border-border flex flex-col gap-2 items-center">
              <h1 className="font-mono text-2xl font-semibold">
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
              <DialogDescription>
                {user.role === "instructor"
                  ? "Courses created"
                  : "Courses enrolled in"}{" "}
                by {user.name}:
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[400px]">
              {courses.length > 0 ? (
                <ul className="list-disc pl-5">
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
      <div className="flex flex-col gap-4 items-start">
        <Link href={`mailto:${user.email}`}>
          <Button
            variant="link"
            className="p-0 h-[unset] text-base font-normal text-foreground flex items-center gap-3"
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
      <div className="flex flex-col gap-4 items-center w-full">
        {!toggleEdit ? (
          (isCurrentUser || currentUser.role === "admin") && (
            <Button
              className="w-full"
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
            className="block w-full"
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
