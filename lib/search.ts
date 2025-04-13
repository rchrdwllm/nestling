"use server";

import { db } from "./firebase";
import { Course, User } from "@/types";

export const searchStudentsAndCourses = async (
  instructorId: string,
  query: string
): Promise<{ students: string[]; courses: string[] }> => {
  try {
    const studentsSnapshot = await db
      .collection("users")
      .where("role", "==", "student")
      .get();

    const students = studentsSnapshot.docs
      .map((doc) => doc.data() as User)
      .filter(
        (student) =>
          student.name?.toLowerCase().includes(query.toLowerCase()) ||
          student.email?.toLowerCase().includes(query.toLowerCase()) ||
          student.id?.toLowerCase().includes(query.toLowerCase())
      )
      .map((student) => JSON.stringify(student));

    const courseRefsSnapshot = await db
      .collection("users")
      .doc(instructorId)
      .collection("courses")
      .get();

    const courseIds = courseRefsSnapshot.docs.map((doc) => doc.data().courseId);

    const coursePromises = courseIds.map(async (courseId) => {
      const courseDoc = await db.collection("courses").doc(courseId).get();
      return courseDoc.data() as Course;
    });

    const allCourses = await Promise.all(coursePromises);

    const courses = allCourses
      .filter(
        (course) =>
          course.name?.toLowerCase().includes(query.toLowerCase()) ||
          course.courseCode?.toLowerCase().includes(query.toLowerCase()) ||
          course.id?.toLowerCase().includes(query.toLowerCase())
      )
      .map((course) => JSON.stringify(course));

    return { students, courses };
  } catch (error) {
    console.error("Error searching for students and courses:", error);
    return { students: [], courses: [] };
  }
};
