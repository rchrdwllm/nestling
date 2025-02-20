import { Course } from "@/types";
import EnrollBtn from "./enroll-btn";
import { getEnrolledStudents } from "@/lib/course";

const CourseCard = async ({ name, id, courseCode, description }: Course) => {
  const { success: enrolledStudents, error } = await getEnrolledStudents(id);

  if (error) {
    return <p>Error getting enrolled students</p>;
  }

  if (!enrolledStudents) {
    return <p>Loading...</p>;
  }

  return (
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
  );
};

export default CourseCard;
