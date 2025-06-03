"use client";

import { User } from "@/types";
import { Mail, PhoneCall } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditProfileForm from "./edit-profile-form";

type ProfileDetailsProps = {
  user: User;
  contentsLength: number;
};

const ProfileDetails = ({ user, contentsLength }: ProfileDetailsProps) => {
  const { user: currentUser } = useCurrentUser();
  const [toggleEdit, setToggleEdit] = useState(false);

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
        <h1 className="text-3xl font-semibold mt-6">
          {user.name || `${user.firstName} ${user.lastName}`}
        </h1>
        <p className="text-muted-foreground mt-2">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
      {user.role !== "admin" && (
        <div className="p-4 bg-secondary rounded-lg border border-border flex flex-col gap-2 items-center">
          <h1 className="font-mono text-2xl font-semibold">{contentsLength}</h1>
          <p className="text-muted-foreground text-sm">
            {user.role === "instructor" ? "Courses" : "Enrolled courses"}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-4 items-start">
        <p className="flex items-center gap-3">
          <Mail className="size-5 text-muted-foreground" /> {user.email}
        </p>
        <p className="flex items-center gap-3">
          <PhoneCall className="size-5 text-muted-foreground" />{" "}
          {user.contactNumber || "N/A"}
        </p>
      </div>
      {!toggleEdit ? (
        <Button onClick={() => setToggleEdit(true)} variant="outline">
          Edit profile
        </Button>
      ) : (
        <EditProfileForm
          setToggleEdit={setToggleEdit}
          user={user}
          contentsLength={contentsLength}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
