import { Course } from "@/types";
import EnrollBtn from "./enroll-btn";
import { getEnrolledStudents } from "@/lib/course";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CourseCard = async ({ name, id, courseCode }: Course) => {
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
      <div className="flex gap-2">
        <EnrollBtn
          courseCode={courseCode}
          id={id}
          enrolledStudents={enrolledStudents}
        />
        <Link href={`/student-courses/${id}`}>
          <Button variant="secondary">Visit course</Button>
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;
