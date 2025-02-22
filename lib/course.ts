import { Course } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";

export const getAllCourses = unstable_cache(
  async () => {
    try {
      const snapshot = await db.collection("courses").get();
      const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

      return { success: courses };
    } catch (error) {
      return { error: "Error fetching courses" };
    }
  },
  ["courses"],
  { revalidate: 3600, tags: ["courses"] }
);

export const getAvailableCourses = unstable_cache(
  async (studentId) => {
    try {
      const snapshot = await db.collection("courses").get();
      const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

      const enrolledCoursesSnapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .get();
      const enrolledCourseIds = enrolledCoursesSnapshot.docs.map(
        (doc) => doc.id
      );

      const availableCourses = courses.filter(
        (course) => !enrolledCourseIds.includes(course.id)
      );

      return { success: availableCourses };
    } catch (error) {
      return { error: "Error fetching courses" };
    }
  },
  ["availableCourses"],
  { revalidate: 3600, tags: ["courses"] }
);

export const getEnrolledCourses = unstable_cache(
  async (studentId: string) => {
    try {
      const snapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);
      const courses = await Promise.all(
        courseIds.map(async (courseId) => {
          const courseSnapshot = await db
            .collection("courses")
            .doc(courseId)
            .get();

          return courseSnapshot.data() as Course;
        })
      );

      return { success: courses };
    } catch (error) {
      return { error: "Error fetching courses" };
    }
  },
  ["enrolledCourses"],
  { revalidate: 3600, tags: ["courses"] }
);

export const getEnrolledStudents = unstable_cache(
  async (courseId: string) => {
    try {
      const snapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("enrolledStudents")
        .get();
      const studentIds = snapshot.docs.map((doc) => doc.id);

      return { success: studentIds };
    } catch (error) {
      return { error: "Error fetching students" };
    }
  },
  ["enrolledStudents"],
  { revalidate: 60, tags: ["students"] }
);
