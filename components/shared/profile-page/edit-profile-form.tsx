"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MAX_SIZE } from "@/constants/file";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateProfileSchema } from "@/schemas/UpdateProfileSchema";
import { updateProfile } from "@/server/actions/update-profile";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type EditProfileFormProps = {
  user: User;
  contentsLength: number;
  setToggleEdit?: (value: boolean) => void;
};

const EditProfileForm = ({
  user,
  contentsLength,
  setToggleEdit,
}: EditProfileFormProps) => {
  const { user: currentUser } = useCurrentUser();
  const [img, setImg] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    defaultValues: {
      email: user.email,
      currentPassword: "",
      newPassword: "",
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      address: user.address,
      image: user.image ?? "",
      userId: user.id,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });
  const { execute, isExecuting } = useAction(updateProfile, {
    onExecute: () => {
      setIsLoading(true);
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data?.success) {
        toast.success(data.success);
      } else if (data?.error) {
        toast.error(JSON.stringify(data.error));
      }

      setIsLoading(false);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));

      setIsLoading(false);
    },
  });
  const isUser = useMemo(() => {
    return user.id === currentUser.id;
  }, [user, currentUser]);

  useEffect(() => {
    form.setValue("firstName", user.firstName ?? "");
    form.setValue("middleName", user.middleName ?? "");
    form.setValue("lastName", user.lastName ?? "");
    form.setValue("contactNumber", user.contactNumber ?? "");
    form.setValue("address", user.address ?? "");
    form.setValue("email", user.email ?? "");
    form.setValue("image", user.image ?? undefined);
  }, []);

  const handleSubmit = async (data: z.infer<typeof UpdateProfileSchema>) => {
    setIsLoading(true);
    toast.dismiss();
    toast.loading("Updating profile...");

    if (img) {
      const { success: uploadedImg, error } = await uploadImgToCloudinary(img);

      if (uploadedImg) {
        execute({
          ...data,
          image: uploadedImg.secure_url,
        });
      } else if (error) {
        toast.error(JSON.stringify(error));
      }

      return;
    }

    execute(data);
  };

  const handleImageChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      console.log({ fileSize: file.size, maxSize: MAX_SIZE });

      if (file.size > MAX_SIZE) {
        toast.error("File size exceeds 10MB limit.");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        form.setValue("image", reader.result as string);
      };

      reader.readAsDataURL(file);
      setImg(file);
    }
  };

  return (
    <section className="min-w-full lg:min-w-[600px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 py-8"
        >
          <FormField
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col justify-center items-center gap-4">
                    {form.getValues("image") ? (
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer"
                      >
                        <Avatar className="size-32">
                          <AvatarImage
                            src={form.getValues("image")}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            <div className="flex justify-center items-center bg-muted rounded-full size-32">
                              <p className="font-bold text-xl">
                                {user.name![0]}
                              </p>
                            </div>
                          </AvatarFallback>
                        </Avatar>
                        <Pencil className="right-0 bottom-2 absolute size-6 text-muted-foreground" />
                      </label>
                    ) : (
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer"
                      >
                        <div className="flex justify-center items-center bg-muted rounded-full size-32">
                          <p className="font-bold text-xl">{user.name![0]}</p>
                        </div>
                        <Pencil className="right-0 bottom-2 absolute size-6 text-muted-foreground" />
                      </label>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {!setToggleEdit && (
            <>
              <div className="text-center">
                <h1 className="mt-6 font-semibold text-3xl">
                  {user.name || `${user.firstName} ${user.lastName}`}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
              {user.role !== "admin" && (
                <div className="flex flex-col items-center gap-2 bg-secondary mx-auto p-4 border border-border rounded-lg w-max">
                  <h1 className="font-mono font-semibold text-2xl">
                    {contentsLength}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {user.role === "instructor"
                      ? "Courses"
                      : "Enrolled courses"}
                  </p>
                </div>
              )}
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="First Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Middle Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Last Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Contact Number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Address" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {isUser && (
            <>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="password"
                      placeholder="Current password"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="password"
                      placeholder="New password"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex gap-4 w-full">
            {setToggleEdit && (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setToggleEdit(false)}
              >
                Cancel
              </Button>
            )}
            <Button
              disabled={isExecuting || isLoading}
              type="submit"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default EditProfileForm;
