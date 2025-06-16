"use server";

import { db } from "./firebase";
import { Content, Course, Project, User } from "@/types";
import { unstable_cache } from "next/cache";

export const searchStudents = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ students: User[]; totalStudents: number }> => {
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

    const paginatedStudents = allStudents.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { students: paginatedStudents, totalStudents };
  },
  ["query", "page", "itemsPerPage"]
);

export const searchInstructors = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ instructors: User[]; totalInstructors: number }> => {
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

    const paginatedInstructors = allInstructors.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { instructors: paginatedInstructors, totalInstructors };
  },
  ["query", "page", "itemsPerPage"]
);

export const searchAdmins = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ admins: User[]; totalAdmins: number }> => {
    const adminsSnapshot = await db
      .collection("users")
      .where("role", "==", "admin")
      .get();

    const allAdmins = adminsSnapshot.docs
      .map((doc) => doc.data() as User)
      .filter(
        (admin) =>
          admin.name?.toLowerCase().includes(query.toLowerCase()) ||
          admin.email?.toLowerCase().includes(query.toLowerCase()) ||
          admin.id?.toLowerCase().includes(query.toLowerCase())
      );

    const totalAdmins = allAdmins.length;

    const paginatedAdmins = allAdmins.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { admins: paginatedAdmins, totalAdmins };
  },
  ["query", "page", "itemsPerPage"]
);

export const searchCourses = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ courses: Course[]; totalCourses: number }> => {
    const courseRefsSnapshot = await db.collection("courses").get();

    const courses = courseRefsSnapshot.docs.map((doc) => doc.data() as Course);

    const filteredCourses = courses.filter(
      (course) =>
        course.name?.toLowerCase().includes(query.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(query.toLowerCase())
    );

    const totalCourses = filteredCourses.length;

    const paginatedCourses = filteredCourses.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { courses: paginatedCourses, totalCourses };
  },
  ["query", "page", "itemsPerPage"]
);

export const searchContents = unstable_cache(
  async (query: string, page: number = 1, itemsPerPage: number = 10) => {
    const contentsRefSnapshot = await db.collection("contents").get();
    const allContents = contentsRefSnapshot.docs.map(
      (doc) => doc.data() as Content
    );

    const filteredContents = allContents.filter((content) =>
      content.title?.toLowerCase().includes(query.toLowerCase())
    );

    const totalContents = filteredContents.length;

    const paginatedContents = filteredContents.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { contents: paginatedContents, totalContents };
  },
  ["query", "page", "itemsPerPage"]
);

export const searchProjects = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ projects: Project[]; totalProjects: number }> => {
    const projectsSnapshot = await db.collection("projects").get();

    const projects = projectsSnapshot.docs.map((doc) => doc.data() as Project);

    const filteredProjects = projects.filter(
      (project) =>
        project.title?.toLowerCase().includes(query.toLowerCase()) ||
        project.description?.toLowerCase().includes(query.toLowerCase())
    );

    const paginatedProjects = filteredProjects.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    const totalProjects = filteredProjects.length;

    return { projects: paginatedProjects, totalProjects };
  }
);
