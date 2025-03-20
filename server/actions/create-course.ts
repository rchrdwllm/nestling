"use server";

import { getCurrentUser } from "@/lib/user";
import { actionClient } from "../action-client";
import { CreateCourseSchema } from "@/schemas/CreateCourseSchema";
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import { UploadImageSchema } from "@/schemas/UploadImageSchema";
import { uploadImage } from "./upload-image";
import { Course } from "@/types";
import { getCourseImage } from "@/lib/course";
import { deleteImgFromCloudinary } from "./delete-from-cloudinary";

export const createCourse = actionClient
  .schema(CreateCourseSchema)
  .schema(async (prevSchema) => {
    return prevSchema.extend({
      image: UploadImageSchema.optional(),
    });
  })
  .action(async ({ parsedInput }) => {
    const { name, description, courseCode, image, isEdit, courseId } =
      parsedInput;
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    if (user.role !== "instructor") {
      return {
        error: "Not authorized, must be an instructor to create courses",
      };
    }

    if (isEdit) {
      try {
        const existingCourse = await db
          .collection("courses")
          .doc(courseId!)
          .get();

        if (!existingCourse.exists) {
          return { error: "This course does not exist" };
        }

        const course = existingCourse.data() as Course;
        const prevImage = await getCourseImage(course.id);

        console.log(prevImage);

        const edits = image
          ? {
              name,
              description,
              courseCode,
              updatedAt: new Date(),
              image: image.secure_url,
            }
          : {
              name,
              description,
              courseCode,
              updatedAt: new Date(),
            };

        await db.collection("courses").doc(course.id).update(edits);

        if (image) {
          if (!prevImage.success) {
            return { error: "Error fetching course image" };
          }

          const { public_id } = prevImage.success;

          await deleteImgFromCloudinary(public_id);
          await db.collection("images").doc(public_id).delete();
          await db
            .collection("courses")
            .doc(course.id)
            .collection("images")
            .doc(public_id)
            .delete();

          const data = await uploadImage({
            ...image,
            isEdit: true,
            course_id: course.id,
          });

          if (!data) {
            console.error("Error uploading image");

            return { error: "Error uploading image" };
          }

          if (data.data?.error) {
            return { error: JSON.stringify(data.data.error) };
          }

          if (!data.data?.success) {
            return { error: "Error uploading image" };
          }
        }

        revalidatePath("/instructor-courses");

        return { success: "Course updated successfully" };
      } catch (error) {
        return { error: JSON.stringify(error) };
      }
    }

    if (!image) {
      return { error: "Image is required" };
    }

    try {
      const existingCourseCode = await db
        .collection("courses")
        .where("courseCode", "==", courseCode)
        .get();
      const existingCourseName = await db
        .collection("courses")
        .where("name", "==", name)
        .get();

      if (!existingCourseCode.empty) {
        return { error: "Course code already exists" };
      }

      if (!existingCourseName.empty) {
        return { error: "Course name already exists" };
      }

      const id = crypto.randomUUID();

      await db.collection("courses").doc(id).set({
        name,
        description,
        courseCode,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: image.secure_url,
      });

      const data = await uploadImage({ ...image, course_id: id });

      if (!data) {
        console.error("Error uploading image");

        return { error: "Error uploading image" };
      }

      if (data.data?.error) {
        return { error: data.data.error };
      }

      if (!data.data?.success) {
        return { error: "Error uploading image" };
      }

      const courseInstructorRef = db
        .collection("courses")
        .doc(id)
        .collection("instructors")
        .doc(user.id);
      const instructorCourseRef = db
        .collection("users")
        .doc(user.id)
        .collection("courses")
        .doc(id);
      const batch = db.batch();

      const courseInstructorData = {
        courseId: id,
        instructorId: user.id,
        createdAt: new Date(),
      };

      batch.set(courseInstructorRef, courseInstructorData);
      batch.set(instructorCourseRef, courseInstructorData);

      await batch.commit();

      revalidatePath("/instructor-courses");

      return { success: "Course created successfully" };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
