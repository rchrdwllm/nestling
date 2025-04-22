"use server";

import { db } from "./firebase";
import { Content, Course, User } from "@/types";
import { getOptimisticUser } from "./user";

export const searchStudents = async (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ students: string[]; totalStudents: number }> => {
  const studentsSnapshot = await db
    .collection("users")
    .where("role", "==", "student")
    .get();

  const allStudents = studentsSnapshot.docs
    .map((doc) => doc.data() as User)
    .filter(
      (student) =>
        student.name?.toLowerCase().includes(query.toLowerCase()) ||
        student.email?.toLowerCase().includes(query.toLowerCase()) ||
        student.id?.toLowerCase().includes(query.toLowerCase())
    );

  const totalStudents = allStudents.length;

  const paginatedStudents = allStudents
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((student) => JSON.stringify(student));

  return { students: paginatedStudents, totalStudents };
};

export const searchInstructors = async (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ instructors: string[]; totalInstructors: number }> => {
  const instructorsSnapshot = await db
    .collection("users")
    .where("role", "==", "instructor")
    .get();

  const allInstructors = instructorsSnapshot.docs
    .map((doc) => doc.data() as User)
    .filter(
      (instructor) =>
        instructor.name?.toLowerCase().includes(query.toLowerCase()) ||
        instructor.email?.toLowerCase().includes(query.toLowerCase()) ||
        instructor.id?.toLowerCase().includes(query.toLowerCase())
    );

  const totalInstructors = allInstructors.length;

  const paginatedInstructors = allInstructors
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((instructor) => JSON.stringify(instructor));

  return { instructors: paginatedInstructors, totalInstructors };
};

export const searchCourses = async (
  instructorId: string,
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ courses: string[]; totalCourses: number }> => {
  const user = await getOptimisticUser();

  if (user.role === "student") {
    const courseRefsSnapshot = await db
      .collection("users")
      .doc(user.id)
      .collection("enrolledCourses")
      .get();

    const courseIds = courseRefsSnapshot.docs.map((doc) => doc.data().courseId);

    const coursePromises = courseIds.map(async (courseId) => {
      const courseDoc = await db.collection("courses").doc(courseId).get();
      return courseDoc.data() as Course;
    });

    const allCourses = await Promise.all(coursePromises);

    const filteredCourses = allCourses.filter(
      (course) =>
        course.name?.toLowerCase().includes(query.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(query.toLowerCase())
    );

    const totalCourses = filteredCourses.length;

    const paginatedCourses = filteredCourses
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((course) => JSON.stringify(course));

    return { courses: paginatedCourses, totalCourses };
  } else if (user.role === "instructor") {
    const courseRefsSnapshot = await db
      .collection("users")
      .doc(user.id)
      .collection("courses")
      .get();

    const courseIds = courseRefsSnapshot.docs.map((doc) => doc.data().courseId);

    const coursePromises = courseIds.map(async (courseId) => {
      const courseDoc = await db.collection("courses").doc(courseId).get();
      return courseDoc.data() as Course;
    });

    const allCourses = await Promise.all(coursePromises);

    const filteredCourses = allCourses.filter(
      (course) =>
        course.name?.toLowerCase().includes(query.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(query.toLowerCase())
    );

    const totalCourses = filteredCourses.length;

    const paginatedCourses = filteredCourses
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((course) => JSON.stringify(course));

    return { courses: paginatedCourses, totalCourses };
  }

  const courseRefsSnapshot = await db.collection("courses").get();

  const courses = courseRefsSnapshot.docs.map((doc) => doc.data() as Course);

  const filteredCourses = courses.filter(
    (course) =>
      course.name?.toLowerCase().includes(query.toLowerCase()) ||
      course.courseCode?.toLowerCase().includes(query.toLowerCase())
  );

  const totalCourses = filteredCourses.length;

  const paginatedCourses = filteredCourses
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((course) => JSON.stringify(course));

  return { courses: paginatedCourses, totalCourses };
};

export const searchContents = async (
  userId: string,
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const courseRefsSnapshot = await db
    .collection("users")
    .doc(userId)
    .collection("enrolledCourses")
    .get();
  const courseIds = courseRefsSnapshot.docs.map((doc) => doc.data().courseId);

  const contentPromises = courseIds.map(async (courseId) => {
    const contentsRefSnapshot = await db
      .collection("contents")
      .where("courseId", "==", courseId)
      .get();

    const contents = contentsRefSnapshot.docs.map(
      (doc) => doc.data() as Content
    );

    return contents.filter((content) =>
      content.title?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const allContents = await Promise.all(contentPromises);

  const flattenedContents = allContents.flat();
  const totalContents = flattenedContents.length;

  const paginatedContents = flattenedContents
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((content) => JSON.stringify(content));

  return { contents: paginatedContents, totalContents };
};
