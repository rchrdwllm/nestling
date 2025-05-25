"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { MAX_SIZE } from "@/constants/file";
import { getSHA256 } from "@/lib/sha-256";
import { CreateCourseSchema } from "@/schemas/CreateCourseSchema";
import { createCourse } from "@/server/actions/create-course";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { Course, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CreateCourseFormProps = {
  setIsOpen: (value: boolean) => void;
  isEdit?: boolean;
  isAdmin?: boolean;
  instructors?: User[];
  defaultInstructors?: User[];
} & {
  course?: Course;
};

const CreateCourseForm = ({
  setIsOpen,
  isEdit,
  course,
  isAdmin = false,
  instructors,
  defaultInstructors,
}: CreateCourseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      name: course?.name ?? "",
      courseCode: course?.courseCode ?? "",
      description: course?.description ?? "",
      image: course?.image ?? "",
      isEdit: isEdit ?? false,
      courseId: course?.id ?? undefined,
      isAdmin: isAdmin ?? false,
      instructors: defaultInstructors?.map((instructor) => instructor.id) ?? [],
      defaultInstructors:
        defaultInstructors?.map((instructor) => instructor.id) ?? [],
    },
  });
  const { execute, isExecuting } = useAction(createCourse, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.dismiss();
        toast.success(data.success);
      } else if (data?.error) {
        toast.dismiss();
        toast.error(data.error as string);
      }

      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.dismiss();
      toast.error(JSON.stringify(error));

      setIsOpen(false);
    },
  });

  useEffect(() => {
    form.setValue("name", course?.name ?? "");
    form.setValue("courseCode", course?.courseCode ?? "");
    form.setValue("description", course?.description ?? "");
    form.setValue("image", course?.image ?? "");
    form.setValue("isEdit", isEdit ?? false);
    form.setValue("courseId", course?.id ?? undefined);
    form.setValue("isAdmin", isAdmin ?? false);
    form.setValue(
      "instructors",
      defaultInstructors?.map((instructor) => instructor.id) ?? []
    );
    form.setValue(
      "defaultInstructors",
      defaultInstructors?.map((instructor) => instructor.id) ?? []
    );
  }, []);

  const handleSubmit = async (data: z.infer<typeof CreateCourseSchema>) => {
    if (img) {
      setIsLoading(true);
      toast.dismiss();
      toast.loading("Creating course...");

      const hash = await getSHA256(img);
      const { success: uploadedImg, error } = await uploadImgToCloudinary(img);

      if (uploadedImg) {
        execute({
          ...data,
          image: {
            ...uploadedImg,
            hash,
          },
        });
      } else if (error) {
        toast.error(JSON.stringify(error));
      }

      return;
    } else if (!img && isEdit) {
      setIsLoading(true);
      toast.dismiss();
      toast.loading("Editing course...");

      execute({
        name: data.name,
        courseCode: data.courseCode,
        description: data.description,
        isEdit: true,
        courseId: data.courseId,
        isAdmin,
        instructors: data.instructors,
        defaultInstructors: data.defaultInstructors,
      });

      return;
    } else {
      toast.dismiss();
      toast.error("Please select a course image");
    }
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
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course name" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course code" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Course description" {...field} />
            </FormItem>
          )}
        />
        {isAdmin && instructors && (
          <FormField
            control={form.control}
            name="instructors"
            render={({ field }) => (
              <FormItem>
                <MultiSelect
                  options={instructors!.map((instructor) => ({
                    label: `${instructor.firstName} ${instructor.lastName}`,
                    value: instructor.id,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={
                    defaultInstructors?.map((instructor) => instructor.id) ?? []
                  }
                  placeholder="Select instructors"
                  variant="inverted"
                />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              {form.getValues("image") ? (
                <label
                  className="block border-border border-2 cursor-pointer relative h-48 w-full rounded-md overflow-hidden"
                  htmlFor="img"
                >
                  <Image
                    src={form.getValues("image")}
                    fill
                    className="object-cover"
                    alt={img?.name ?? "Course image"}
                  />
                </label>
              ) : (
                <label
                  htmlFor="img"
                  className="flex justify-center items-center flex-col gap-2 border-2 border-input bg-background rounded-md text-muted-foreground cursor-pointer py-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Paperclip className="size-6" />
                  <p className="text-sm">Upload image</p>
                </label>
              )}
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting || isLoading}>
          {isEdit ? "Edit course" : "Create course"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
