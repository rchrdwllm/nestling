import { Course } from "@/types";
import { db } from "./firebase";
import { getCurrentUser } from "./user";

export const getAllCourses = async () => {
  try {
    const snapshot = await db.collection("courses").get();
    const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

    return { success: courses };
  } catch (error) {
    return { error: "Error fetching courses" };
  }
};

export const getAvailableCourses = async (studentId?: string) => {
  if (!studentId) {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "User not found" };
    }

    studentId = user.id;

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
  }

  try {
    const snapshot = await db.collection("courses").get();
    const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

    const enrolledCoursesSnapshot = await db
      .collection("users")
      .doc(studentId)
      .collection("enrolledCourses")
      .get();
    const enrolledCourseIds = enrolledCoursesSnapshot.docs.map((doc) => doc.id);

    const availableCourses = courses.filter(
      (course) => !enrolledCourseIds.includes(course.id)
    );

    return { success: availableCourses };
  } catch (error) {
    return { error: "Error fetching courses" };
  }
};

export const getEnrolledCourses = async (studentId?: string) => {
  if (!studentId) {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "User not found" };
    }

    studentId = user.id;

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
  }

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
};

export const getEnrolledStudents = async (courseId: string) => {
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
};
