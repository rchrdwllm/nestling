"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MAX_SIZE } from "@/constants/file";
import { UpdateProfileSchema } from "@/schemas/UpdateProfileSchema";
import { updateInstructorProfile } from "@/server/actions/update-profile";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type EditProfileFormProps = {
  user: User;
};

const EditProfileForm = ({ user }: EditProfileFormProps) => {
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
      image: user.image ?? "",
      userId: user.id,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });
  const { execute, isExecuting } = useAction(updateInstructorProfile, {
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

  useEffect(() => {
    form.setValue("firstName", user.firstName ?? "");
    form.setValue("middleName", user.middleName ?? "");
    form.setValue("lastName", user.lastName ?? "");
    form.setValue("contactNumber", user.contactNumber ?? "");
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
      if (file.size > MAX_SIZE) {
        toast.error("File size exceeds 100MB limit.");
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
    <section>
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
                  <div className="flex flex-col items-center justify-center gap-4">
                    {form.getValues("image") ? (
                      <label htmlFor="image">
                        <Avatar className="size-32">
                          <AvatarImage
                            src={form.getValues("image")}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            <div className="flex items-center justify-center size-32 bg-muted rounded-full">
                              <p className="text-xl font-bold">
                                {user.name![0]}
                              </p>
                            </div>
                          </AvatarFallback>
                        </Avatar>
                      </label>
                    ) : (
                      <label htmlFor="image">
                        <div className="flex items-center justify-center size-32 bg-muted rounded-full">
                          <p className="text-xl font-bold">{user.name![0]}</p>
                        </div>
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Email" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="First Name" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Middle Name" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Last Name" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="Contact Number" {...field} />
              </FormItem>
            )}
          />
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
                <Input type="password" placeholder="New password" {...field} />
              </FormItem>
            )}
          />

          <div className="w-full flex gap-4">
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
