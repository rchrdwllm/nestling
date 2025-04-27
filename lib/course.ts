"use server";

import { Course, EnrollmentData, User } from "@/types";
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
        (course) => !enrolledCourseIds.includes(course.id) && !course.isArchived
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
        .where("accessEnabled", "==", true)
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

      const enrolledCourses = courses.filter((course) => !course.isArchived);

      return { success: enrolledCourses };
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
      const students = await Promise.all(
        studentIds.map(async (studentId) => {
          const studentSnapshot = await db
            .collection("users")
            .doc(studentId)
            .get();

          return studentSnapshot.data() as User;
        })
      );

      return { success: students };
    } catch (error) {
      return { error: "Error fetching students" };
    }
  },
  ["enrolledStudents"],
  { revalidate: 60, tags: ["students"] }
);

export const getEnrolledStudentIds = unstable_cache(
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
  ["courseId"],
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

export const getUnarchivedInstructorCourses = unstable_cache(
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
      const unarchivedCourses = courses.filter((course) => !course.isArchived);

      return { success: unarchivedCourses };
    } catch (error) {
      return { error };
    }
  },
  ["instructorCourses"],
  { revalidate: 3600, tags: ["courses"] }
);

export const getArchivedInstructorCourses = unstable_cache(
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
      const archivedCourses = courses.filter((course) => course.isArchived);

      return { success: archivedCourses };
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

      console.log(courseImg);

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

export const getEnrollmentDetails = unstable_cache(
  async (courseId: string, studentId: string) => {
    try {
      const snapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("enrolledStudents")
        .doc(studentId)
        .get();

      if (!snapshot.exists) {
        return { error: "Enrollment details not found" };
      }

      const enrollmentDetails = snapshot.data() as EnrollmentData;

      return { success: JSON.stringify(enrollmentDetails) };
    } catch (error) {
      console.error("Error fetching enrollment details:", error);

      return { error: "Error fetching enrollment details" };
    }
  },
  ["courseId", "studentId"],
  { revalidate: 60 * 60 * 24, tags: ["enrollmentDetails"] }
);
