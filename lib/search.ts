"use server";

import { db } from "./firebase";
import { Content, Course, Project, User } from "@/types";
import { unstable_cache } from "next/cache";

// Client-side cache for frequently accessed data
const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCachedData = async (key: string, fetchFn: () => Promise<any>) => {
  const cached = searchCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchFn();
  searchCache.set(key, { data, timestamp: Date.now() });
  return data;
};

export const searchStudents = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ students: User[]; totalStudents: number }> => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { students: [], totalStudents: 0 };
    }

    const cacheKey = `students-${query.toLowerCase()}`;

    const allStudents = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();
      const students: User[] = [];

      // Strategy: Use multiple targeted queries instead of client-side filtering
      // This ensures we don't miss results due to arbitrary limits

      // Query 1: Search by name using range queries (more efficient than client-side filter)
      const nameQueries = [];

      // For name search, use startAt/endAt for prefix matching
      if (queryLower.length >= 2) {
        nameQueries.push(
          db
            .collection("users")
            .where("role", "==", "student")
            .orderBy("name")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(50)
            .get()
        );
      }

      // Query 2: Search by email (if query looks like email or contains @)
      const emailQueries = [];
      if (queryLower.includes("@") || queryLower.includes(".")) {
        emailQueries.push(
          db
            .collection("users")
            .where("role", "==", "student")
            .orderBy("email")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(50)
            .get()
        );
      }

      // Execute queries in parallel
      const queryPromises = [...nameQueries, ...emailQueries];

      if (queryPromises.length > 0) {
        const snapshots = await Promise.all(queryPromises);
        const foundUsers = new Set<string>(); // Use Set to avoid duplicates

        snapshots.forEach((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const user = doc.data() as User;
            if (!foundUsers.has(user.id)) {
              // Additional client-side filtering for partial matches
              if (
                user.name?.toLowerCase().includes(queryLower) ||
                user.email?.toLowerCase().includes(queryLower) ||
                user.id?.toLowerCase().includes(queryLower)
              ) {
                foundUsers.add(user.id);
                students.push(user);
              }
            }
          });
        });
      }

      // If we still have very few results, do a broader search
      if (students.length < 10) {
        const fallbackSnapshot = await db
          .collection("users")
          .where("role", "==", "student")
          .orderBy("name")
          .limit(200) // Increased limit for broader search
          .get();

        const fallbackStudents = fallbackSnapshot.docs
          .map((doc) => doc.data() as User)
          .filter((student) => {
            const matchesQuery =
              student.name?.toLowerCase().includes(queryLower) ||
              student.email?.toLowerCase().includes(queryLower) ||
              student.id?.toLowerCase().includes(queryLower);

            // Avoid duplicates from previous queries
            return (
              matchesQuery &&
              !students.some((existing) => existing.id === student.id)
            );
          });

        students.push(...fallbackStudents);
      }

      return students;
    });

    const totalStudents = allStudents.length;
    const paginatedStudents = allStudents.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { students: paginatedStudents, totalStudents };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 300 } // Cache for 5 minutes
);

export const searchInstructors = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ instructors: User[]; totalInstructors: number }> => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { instructors: [], totalInstructors: 0 };
    }

    const cacheKey = `instructors-${query.toLowerCase()}`;

    const allInstructors = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();
      const instructors: User[] = [];

      // Use targeted queries instead of arbitrary limits
      const nameQueries = [];

      if (queryLower.length >= 2) {
        nameQueries.push(
          db
            .collection("users")
            .where("role", "==", "instructor")
            .orderBy("name")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(50)
            .get()
        );
      }

      const emailQueries = [];
      if (queryLower.includes("@") || queryLower.includes(".")) {
        emailQueries.push(
          db
            .collection("users")
            .where("role", "==", "instructor")
            .orderBy("email")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(50)
            .get()
        );
      }

      const queryPromises = [...nameQueries, ...emailQueries];

      if (queryPromises.length > 0) {
        const snapshots = await Promise.all(queryPromises);
        const foundUsers = new Set<string>();

        snapshots.forEach((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const user = doc.data() as User;
            if (!foundUsers.has(user.id)) {
              if (
                user.name?.toLowerCase().includes(queryLower) ||
                user.email?.toLowerCase().includes(queryLower) ||
                user.id?.toLowerCase().includes(queryLower)
              ) {
                foundUsers.add(user.id);
                instructors.push(user);
              }
            }
          });
        });
      }

      // Fallback search if few results (instructors are typically fewer)
      if (instructors.length < 5) {
        const fallbackSnapshot = await db
          .collection("users")
          .where("role", "==", "instructor")
          .orderBy("name")
          .limit(100)
          .get();

        const fallbackInstructors = fallbackSnapshot.docs
          .map((doc) => doc.data() as User)
          .filter((instructor) => {
            const matchesQuery =
              instructor.name?.toLowerCase().includes(queryLower) ||
              instructor.email?.toLowerCase().includes(queryLower) ||
              instructor.id?.toLowerCase().includes(queryLower);

            return (
              matchesQuery &&
              !instructors.some((existing) => existing.id === instructor.id)
            );
          });

        instructors.push(...fallbackInstructors);
      }

      return instructors;
    });

    const totalInstructors = allInstructors.length;
    const paginatedInstructors = allInstructors.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { instructors: paginatedInstructors, totalInstructors };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 300 }
);

export const searchAdmins = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ admins: User[]; totalAdmins: number }> => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { admins: [], totalAdmins: 0 };
    }

    const cacheKey = `admins-${query.toLowerCase()}`;

    const allAdmins = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();

      const adminsSnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .orderBy("name")
        .limit(50) // Admins are typically fewer, so smaller limit
        .get();

      return adminsSnapshot.docs
        .map((doc) => doc.data() as User)
        .filter(
          (admin) =>
            admin.name?.toLowerCase().includes(queryLower) ||
            admin.email?.toLowerCase().includes(queryLower) ||
            admin.id?.toLowerCase().includes(queryLower)
        );
    });

    const totalAdmins = allAdmins.length;
    const paginatedAdmins = allAdmins.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { admins: paginatedAdmins, totalAdmins };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 300 }
);

export const searchCourses = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ courses: Course[]; totalCourses: number }> => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { courses: [], totalCourses: 0 };
    }

    const cacheKey = `courses-${query.toLowerCase()}`;

    const allCourses = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();
      const courses: Course[] = [];

      // Targeted queries for courses
      const nameQueries = [];

      if (queryLower.length >= 2) {
        nameQueries.push(
          db
            .collection("courses")
            .orderBy("name")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(100)
            .get()
        );
      }

      // Search by course code if query looks like a code (short alphanumeric)
      const codeQueries = [];
      if (queryLower.length <= 10 && /^[a-z0-9\s-]+$/i.test(queryLower)) {
        codeQueries.push(
          db
            .collection("courses")
            .orderBy("courseCode")
            .startAt(queryLower)
            .endAt(queryLower + "\uf8ff")
            .limit(100)
            .get()
        );
      }

      const queryPromises = [...nameQueries, ...codeQueries];

      if (queryPromises.length > 0) {
        const snapshots = await Promise.all(queryPromises);
        const foundCourses = new Set<string>();

        snapshots.forEach((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const course = doc.data() as Course;
            if (!foundCourses.has(course.id)) {
              if (
                course.name?.toLowerCase().includes(queryLower) ||
                course.courseCode?.toLowerCase().includes(queryLower)
              ) {
                foundCourses.add(course.id);
                courses.push(course);
              }
            }
          });
        });
      }

      // Fallback for broader search if needed
      if (courses.length < 10) {
        const fallbackSnapshot = await db
          .collection("courses")
          .orderBy("name")
          .limit(300)
          .get();

        const fallbackCourses = fallbackSnapshot.docs
          .map((doc) => doc.data() as Course)
          .filter((course) => {
            const matchesQuery =
              course.name?.toLowerCase().includes(queryLower) ||
              course.courseCode?.toLowerCase().includes(queryLower);

            return (
              matchesQuery &&
              !courses.some((existing) => existing.id === course.id)
            );
          });

        courses.push(...fallbackCourses);
      }

      return courses;
    });

    const totalCourses = allCourses.length;
    const paginatedCourses = allCourses.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { courses: paginatedCourses, totalCourses };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 600 } // Courses change less frequently, cache longer
);

export const searchContents = unstable_cache(
  async (query: string, page: number = 1, itemsPerPage: number = 10) => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { contents: [], totalContents: 0 };
    }

    const cacheKey = `contents-${query.toLowerCase()}`;

    const allContents = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();

      const contentsRefSnapshot = await db
        .collection("contents")
        .orderBy("title")
        .limit(500) // Contents can be numerous, but limit to reasonable amount
        .get();

      const contents = contentsRefSnapshot.docs.map(
        (doc) => doc.data() as Content
      );

      return contents.filter((content) =>
        content.title?.toLowerCase().includes(queryLower)
      );
    });

    const totalContents = allContents.length;
    const paginatedContents = allContents.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { contents: paginatedContents, totalContents };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 300 }
);

export const searchProjects = unstable_cache(
  async (
    query: string,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ projects: Project[]; totalProjects: number }> => {
    // If no query, return empty results to avoid unnecessary reads
    if (!query || query.trim().length < 2) {
      return { projects: [], totalProjects: 0 };
    }

    const cacheKey = `projects-${query.toLowerCase()}`;

    const allProjects = await getCachedData(cacheKey, async () => {
      const queryLower = query.toLowerCase();

      const projectsSnapshot = await db
        .collection("projects")
        .orderBy("title")
        .limit(300) // Reasonable limit for projects
        .get();

      const projects = projectsSnapshot.docs.map(
        (doc) => doc.data() as Project
      );

      return projects.filter(
        (project) =>
          project.title?.toLowerCase().includes(queryLower) ||
          project.description?.toLowerCase().includes(queryLower)
      );
    });

    const totalProjects = allProjects.length;
    const paginatedProjects = allProjects.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return { projects: paginatedProjects, totalProjects };
  },
  ["query", "page", "itemsPerPage"],
  { revalidate: 600 } // Projects change less frequently
);
