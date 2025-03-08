import { Course } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { getImage } from "./image";

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

export const getCourse = unstable_cache(
  async (courseId: string) => {
    try {
      const snapshot = await db.collection("courses").doc(courseId).get();
      const course = snapshot.data() as Course;

      return { success: course };
    } catch (error) {
      return { error: "Error fetching course" };
    }
  },
  ["courses"],
  { revalidate: 3600 }
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

export const getInstructorCourses = unstable_cache(
  async (instructorId: string) => {
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
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
      return { error };
    }
  },
  ["instructorCourses"],
  { revalidate: 3600, tags: ["courses"] }
);

export const getCourseImage = unstable_cache(
  async (courseId: string) => {
    try {
      const snapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("images")
        .get();
      const courseImg = snapshot.docs.map((doc) => doc.data())[0];

      const { success, error } = await getImage(courseImg.public_id);

      if (error) return { error: "Error fetching course image" };

      return { success };
    } catch (error) {
      return { error: "Error fetching course image" };
    }
  },
  ["courseImage"],
  { revalidate: 3600 }
);
