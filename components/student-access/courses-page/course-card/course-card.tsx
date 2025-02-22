import { Course } from "@/types";
import EnrollBtn from "./enroll-btn";
import { getEnrolledStudents } from "@/lib/course";
import Link from "next/link";

const CourseCard = async ({ name, id, courseCode, description }: Course) => {
  const { success: enrolledStudents, error } = await getEnrolledStudents(id);

  if (error) {
    return <p>Error getting enrolled students</p>;
  }

  if (!enrolledStudents) {
    return <p>Loading...</p>;
  }

  return (
    <Link href={`/student-courses/${id}`}>
      <article>
        <h1>
          {courseCode} - {name}
        </h1>
        <EnrollBtn
          courseCode={courseCode}
          id={id}
          enrolledStudents={enrolledStudents}
        />
      </article>
    </Link>
  );
};

export default CourseCard;
