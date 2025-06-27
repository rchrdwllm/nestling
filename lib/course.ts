"use server";

import { Course, EnrollmentData, User } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { getImage } from "./image";
import { decryptData } from "./aes";

export const getAllCourses = unstable_cache(
  async () => {
    console.log(`[${new Date().toISOString()}] getAllCourses called`);
    try {
      const snapshot = await db
        .collection("courses")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .get();
      const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

      return { success: courses };
    } catch (error) {
      return { error: "Error fetching courses" };
    }
  },
  ["courses"],
  { revalidate: 7200, tags: ["courses"] }
);

export const getArchivedCourses = unstable_cache(
  async () => {
    console.log(`[${new Date().toISOString()}] getArchivedCourses called`);
    try {
      const snapshot = await db
        .collection("courses")
        .where("isArchived", "==", true)
        .get();
      const courses = snapshot.docs.map((doc) => doc.data()) as Course[];

      return { success: courses };
    } catch (error) {
      return { error: "Error fetching archived courses" };
    }
  },
  ["archivedCourses"],
  { revalidate: 86400, tags: ["courses"] }
);

export const getCourse = unstable_cache(
  async (courseId: string) => {
    console.log(
      `[${new Date().toISOString()}] getCourse called for courseId=${courseId}`
    );
    try {
      const snapshot = await db.collection("courses").doc(courseId).get();
      const course = snapshot.data() as Course;

      return { success: course };
    } catch (error) {
      return { error: "Error fetching course" };
    }
  },
  ["courses"],
  { revalidate: 7200 }
);

export const getAvailableCourses = unstable_cache(
  async (studentId) => {
    console.log(
      `[${new Date().toISOString()}] getAvailableCourses called for studentId=${studentId}`
    );
    try {
      // Get enrolled course IDs
      const enrolledCoursesSnapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .where("accessEnabled", "==", true)
        .get();
      const enrolledCourseIds = enrolledCoursesSnapshot.docs.map(
        (doc) => doc.id
      );

      // If no enrolled courses, just return all unarchived courses
      if (enrolledCourseIds.length === 0) {
        const snapshot = await db
          .collection("courses")
          .where("isArchived", "==", false)
          .get();
        const courses = snapshot.docs.map((doc) => doc.data()) as Course[];
        return { success: courses };
      }

      const availableCourses: Course[] = [];
      for (let i = 0; i < enrolledCourseIds.length; i += 10) {
        const batch = enrolledCourseIds.slice(i, i + 10);
        const snapshot = await db
          .collection("courses")
          .where("isArchived", "==", false)
          .where("id", "not-in", batch)
          .get();
        availableCourses.push(
          ...snapshot.docs.map((doc) => doc.data() as Course)
        );
      }
      return { success: availableCourses };
    } catch (error) {
      console.error("Error fetching available courses:", error);
      return { error: "Error fetching courses" };
    }
  },
  ["availableCourses"],
  { revalidate: 7200, tags: ["courses"] }
);

export const getEnrolledCourses = unstable_cache(
  async (studentId: string) => {
    console.log(
      `[${new Date().toISOString()}] getEnrolledCourses called for studentId=${studentId}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .where("accessEnabled", "==", true)
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [] };
      }

      // Batch read up to 10 courses at once using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      const enrolledCourses = courses.filter((course) => !course.isArchived);

      return { success: enrolledCourses };
    } catch (error) {
      return { error: "Error fetching courses" };
    }
  },
  ["enrolledCourses"],
  { revalidate: 7200, tags: ["courses"] } // Increased cache to 2 hours
);

export const getEnrolledStudents = unstable_cache(
  async (courseId: string) => {
    console.log(
      `[${new Date().toISOString()}] getEnrolledStudents called for courseId=${courseId}`
    );
    try {
      const snapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("enrolledStudents")
        .get();
      const studentIds = snapshot.docs.map((doc) => doc.id);

      if (studentIds.length === 0) {
        return { success: [] };
      }

      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return { error: "AES encryption key not found" };
      }

      // Batch read students using 'in' operator
      const students: User[] = [];
      for (let i = 0; i < studentIds.length; i += 10) {
        const batch = studentIds.slice(i, i + 10);
        const studentsQuery = await db
          .collection("users")
          .where("id", "in", batch)
          .get();

        const batchStudents = studentsQuery.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              contactNumber: decryptData(doc.data()!.contactNumber, aesKey),
              address: decryptData(doc.data()!.address, aesKey),
            } as User)
        );

        students.push(...batchStudents);
      }

      return { success: students };
    } catch (error) {
      return { error: "Error fetching students" };
    }
  },
  ["enrolledStudents"],
  { revalidate: 300, tags: ["students", "user"] } // Reduced to 5 minutes for more dynamic data
);

export const getEnrolledStudentIds = unstable_cache(
  async (courseId: string) => {
    console.log(
      `[${new Date().toISOString()}] getEnrolledStudentIds called for courseId=${courseId}`
    );
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
  { revalidate: 60, tags: ["students", "user"] }
);

export const getInstructorCourses = unstable_cache(
  async (instructorId: string) => {
    console.log(
      `[${new Date().toISOString()}] getInstructorCourses called for instructorId=${instructorId}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [] };
      }

      // Batch read courses using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      return { success: courses };
    } catch (error) {
      return { error };
    }
  },
  ["instructorCourses"],
  { revalidate: 7200, tags: ["courses"] } // Increased cache to 2 hours
);

export const getUnarchivedInstructorCourses = unstable_cache(
  async (instructorId: string) => {
    console.log(
      `[${new Date().toISOString()}] getUnarchivedInstructorCourses called for instructorId=${instructorId}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [] };
      }

      // Batch read courses using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      const unarchivedCourses = courses.filter((course) => !course.isArchived);

      return { success: unarchivedCourses };
    } catch (error) {
      return { error };
    }
  },
  ["unarchivedInstructorCourses"],
  { revalidate: 7200, tags: ["courses"] } // Increased cache and unique cache key
);

export const getArchivedInstructorCourses = unstable_cache(
  async (instructorId: string) => {
    console.log(
      `[${new Date().toISOString()}] getArchivedInstructorCourses called for instructorId=${instructorId}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [] };
      }

      // Batch read courses using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      const archivedCourses = courses.filter((course) => course.isArchived);

      return { success: archivedCourses };
    } catch (error) {
      return { error };
    }
  },
  ["archivedInstructorCourses"],
  { revalidate: 86400, tags: ["courses"] } // Archived courses change less frequently - 24 hours cache
);

export const getCourseImage = unstable_cache(
  async (courseId: string) => {
    console.log(
      `[${new Date().toISOString()}] getCourseImage called for courseId=${courseId}`
    );
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
  { revalidate: 7200 }
);

export const getEnrollmentDetails = unstable_cache(
  async (courseId: string, studentId: string) => {
    console.log(
      `[${new Date().toISOString()}] getEnrollmentDetails called for courseId=${courseId}, studentId=${studentId}`
    );
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

export const getCourseInstructors = unstable_cache(
  async (courseId: string) => {
    console.log(
      `[${new Date().toISOString()}] getCourseInstructors called for courseId=${courseId}`
    );
    try {
      const courseInstructorSnapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("instructors")
        .get();
      const instructorIds = courseInstructorSnapshot.docs.map((doc) => doc.id);

      if (instructorIds.length === 0) {
        return { success: [] };
      }

      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return { error: "AES encryption key not found" };
      }

      // Batch read instructors using 'in' operator
      const instructors: User[] = [];
      for (let i = 0; i < instructorIds.length; i += 10) {
        const batch = instructorIds.slice(i, i + 10);
        const instructorsQuery = await db
          .collection("users")
          .where("id", "in", batch)
          .get();

        const batchInstructors = instructorsQuery.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              contactNumber: decryptData(doc.data()!.contactNumber, aesKey),
              address: decryptData(doc.data()!.address, aesKey),
            } as User)
        );

        instructors.push(...batchInstructors);
      }

      return { success: instructors };
    } catch (error) {
      console.error("Error fetching course instructors:", error);

      return { error: "Error fetching course instructors" };
    }
  },
  ["courseInstructors"],
  { revalidate: 86400, tags: ["instructors", "user"] } // Instructors change less frequently
);

export const getTopCoursesByEnrollments = unstable_cache(
  async () => {
    console.log(
      `[${new Date().toISOString()}] getTopCoursesByEnrollments called`
    );
    try {
      const coursesSnapshot = await db.collection("courses").get();

      // Use Promise.all for subcollection queries but limit to avoid excessive reads
      const courses = await Promise.all(
        coursesSnapshot.docs.slice(0, 20).map(async (doc) => {
          // Limit to top 20 courses initially
          const course = doc.data() as Course;
          const enrolledStudentsSnapshot = await db
            .collection("courses")
            .doc(course.id)
            .collection("enrolledStudents")
            .get();
          const enrollmentCount = enrolledStudentsSnapshot.size;

          return { title: course.name, enrollmentCount };
        })
      );

      courses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);

      const filteredCourses = courses.filter((course) => {
        return course.enrollmentCount > 0 && course.title;
      });

      return { success: filteredCourses.slice(0, 5) };
    } catch (error) {
      console.error("Error fetching top courses by enrollments:", error);
      return { error };
    }
  },
  ["topCoursesByEnrollments"],
  { revalidate: 86400, tags: ["courses"] }
);

export const getSlicedCourses = unstable_cache(
  async (studentId: string, limit: number = 4) => {
    console.log(
      `[${new Date().toISOString()}] getSlicedCourses called for studentId=${studentId}, limit=${limit}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .where("accessEnabled", "==", true)
        .limit(limit)
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [] };
      }

      // Batch read courses using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      const enrolledCourses = courses.filter((course) => !course.isArchived);

      return { success: enrolledCourses };
    } catch (error) {
      console.error("Error fetching sliced courses:", error);

      return { error: "Error fetching courses" };
    }
  },
  ["slicedCourses"],
  { revalidate: 7200, tags: ["courses"] } // 2 hours cache and unique cache key
);

export const getSlicedInstructorCourses = unstable_cache(
  async (instructorId: string, limit: number = 4) => {
    console.log(
      `[${new Date().toISOString()}] getSlicedInstructorCourses called for instructorId=${instructorId}, limit=${limit}`
    );
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .limit(limit)
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.data().courseId);

      // Batch read courses using 'in' operator
      const courses: Course[] = [];
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .get();

        const batchCourses = coursesQuery.docs.map(
          (doc) => doc.data() as Course
        );
        courses.push(...batchCourses);
      }

      const instructedCourses = courses.filter((course) => !course.isArchived);

      return { success: instructedCourses };
    } catch (error) {
      console.error("Error fetching sliced instructor courses:", error);

      return { error: "Error fetching instructor courses" };
    }
  },
  ["slicedInstructorCourses"],
  { revalidate: 7200, tags: ["courses"] }
);

export const getMostViewedCourses = unstable_cache(
  async () => {
    try {
      const coursesSnapshot = await db.collection("courses").get();
      const courses = coursesSnapshot.docs.map((doc) => ({
        title: doc.data().name,
        viewCount: doc.data().viewCount,
      })) as { title: string; viewCount: number }[];

      courses.sort((a, b) => b.viewCount - a.viewCount);

      const mostViewedCourses = courses
        .slice(0, 5)
        .filter((course) => course.viewCount > 0 && course.title);

      return { success: mostViewedCourses };
    } catch (error) {
      console.error("Error fetching most viewed courses:", error);

      return { error: "Error fetching most viewed courses" };
    }
  },
  ["mostViewedCourses"],
  { revalidate: 86400, tags: ["courses"] }
);

export const getPaginatedCourses = unstable_cache(
  async (limit: number, lastDocId?: string) => {
    console.log(
      `[${new Date().toISOString()}] getPaginatedCourses called with limit=${limit}, lastDocId=${lastDocId}`
    );
    try {
      let query = db
        .collection("courses")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc");

      if (lastDocId) {
        const lastDoc = await db.collection("courses").doc(lastDocId).get();
        if (lastDoc.exists) {
          query = query.startAfter(lastDoc);
        }
      }

      const snapshot = await query.limit(limit).get();
      const courses = snapshot.docs.map((doc) => doc.data()) as Course[];
      const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : undefined;

      return { success: courses, lastVisible };
    } catch (error) {
      console.error("Error fetching paginated courses:", error);
      return { error: "Error fetching paginated courses" };
    }
  },
  ["paginatedCourses"],
  { revalidate: 7200, tags: ["courses"] }
);

export const getPaginatedInstructorCourses = unstable_cache(
  async (instructorId: string, limit: number, lastDocId?: string) => {
    console.log(
      `[${new Date().toISOString()}] getPaginatedInstructorCourses called for instructorId=${instructorId}, limit=${limit}, lastDocId=${lastDocId}`
    );
    try {
      let instructorCoursesQuery = db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .orderBy("createdAt", "desc");

      if (lastDocId) {
        const lastDoc = await db.collection("users").doc(instructorId).collection("courses").doc(lastDocId).get();
        if (lastDoc.exists) {
          instructorCoursesQuery = instructorCoursesQuery.startAfter(lastDoc);
        }
      }

      const instructorCoursesSnapshot = await instructorCoursesQuery.limit(limit).get();
      const courseIds = instructorCoursesSnapshot.docs.map((doc) => doc.id);

      if (courseIds.length === 0) {
        return { success: [], lastVisible: undefined };
      }

      const courses: Course[] = [];
      // Firestore 'in' query limit is 10
      for (let i = 0; i < courseIds.length; i += 10) {
        const batch = courseIds.slice(i, i + 10);
        const coursesQuery = await db
          .collection("courses")
          .where("id", "in", batch)
          .where("isArchived", "==", false) // Only fetch unarchived courses
          .get();

        courses.push(...coursesQuery.docs.map((doc) => doc.data() as Course));
      }

      const lastVisible = instructorCoursesSnapshot.docs.length > 0 ? instructorCoursesSnapshot.docs[instructorCoursesSnapshot.docs.length - 1].id : undefined;

      return { success: courses, lastVisible };
    } catch (error) {
      console.error("Error fetching paginated instructor courses:", error);
      return { error: "Error fetching paginated instructor courses" };
    }
  },
  ["paginatedInstructorCourses"],
  { revalidate: 7200, tags: ["courses"] }
);
