"use server";

import { Course, EnrollmentData, User } from "@/types";
import { db } from "./firebase";
import { unstable_cache } from "next/cache";
import { getImage } from "./image";
import { decryptData } from "./aes";

export const getAllCourses = unstable_cache(
  async () => {
    try {
      const snapshot = await db
        .collection("courses")
        .where("isArchived", "==", false)
        .get();
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

      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return { error: "AES encryption key not found" };
      }

      const students = await Promise.all(
        studentIds.map(async (studentId) => {
          const studentSnapshot = await db
            .collection("users")
            .doc(studentId)
            .get();

          return {
            ...studentSnapshot.data(),
            contactNumber: decryptData(
              studentSnapshot.data()!.contactNumber,
              aesKey
            ),
            address: decryptData(studentSnapshot.data()!.address, aesKey),
          } as User;
        })
      );

      return { success: students };
    } catch (error) {
      return { error: "Error fetching students" };
    }
  },
  ["enrolledStudents"],
  { revalidate: 60, tags: ["students", "user"] }
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
  { revalidate: 60, tags: ["students", "user"] }
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

export const getCourseInstructors = unstable_cache(
  async (courseId: string) => {
    try {
      const courseInstructorSnapshot = await db
        .collection("courses")
        .doc(courseId)
        .collection("instructors")
        .get();
      const instructorIds = courseInstructorSnapshot.docs.map((doc) => doc.id);

      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return { error: "AES encryption key not found" };
      }

      const instructors = await Promise.all(
        instructorIds.map(async (instructorId) => {
          const instructorSnapshot = await db
            .collection("users")
            .doc(instructorId)
            .get();

          return {
            ...instructorSnapshot.data(),
            contactNumber: decryptData(
              instructorSnapshot.data()!.contactNumber,
              aesKey
            ),
            address: decryptData(instructorSnapshot.data()!.address, aesKey),
          } as User;
        })
      );

      return { success: instructors };
    } catch (error) {
      console.error("Error fetching course instructors:", error);

      return { error: "Error fetching course instructors" };
    }
  },
  ["courseId"],
  { revalidate: 60 * 60 * 24, tags: ["instructors", "user"] }
);

export const getTopCoursesByEnrollments = unstable_cache(
  async () => {
    try {
      const coursesSnapshot = await db.collection("courses").get();
      const courses = await Promise.all(
        coursesSnapshot.docs.map(async (doc) => {
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
  { revalidate: 60 * 60 * 24, tags: ["courses"] }
);

export const getSlicedCourses = unstable_cache(
  async (studentId: string, limit: number = 4) => {
    try {
      const snapshot = await db
        .collection("users")
        .doc(studentId)
        .collection("enrolledCourses")
        .where("accessEnabled", "==", true)
        .limit(limit)
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
      console.error("Error fetching sliced courses:", error);

      return { error: "Error fetching courses" };
    }
  },
  ["studentId", "limit"],
  { revalidate: 60 * 60 * 24, tags: ["courses"] }
);

export const getSlicedInstructorCourses = unstable_cache(
  async (instructorId: string, limit: number = 4) => {
    try {
      const snapshot = await db
        .collection("users")
        .doc(instructorId)
        .collection("courses")
        .limit(limit)
        .get();
      const courseIds = snapshot.docs.map((doc) => doc.data().courseId);
      const courses = await Promise.all(
        courseIds.map(async (courseId) => {
          const courseSnapshot = await db
            .collection("courses")
            .doc(courseId)
            .get();
          return courseSnapshot.data() as Course;
        })
      );

      const instructedCourses = courses.filter((course) => !course.isArchived);

      return { success: instructedCourses };
    } catch (error) {
      console.error("Error fetching sliced instructor courses:", error);

      return { error: "Error fetching instructor courses" };
    }
  }
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
  { revalidate: 60 * 60 * 24, tags: ["courses"] }
);
