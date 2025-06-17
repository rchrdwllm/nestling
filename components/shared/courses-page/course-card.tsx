import {
  getCourse,
  getCourseInstructors,
  getEnrolledStudents,
} from "@/lib/course";
import { Course, User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CourseDetailsBtn from "./course-details-btn";
import ErrorToast from "@/components/ui/error-toast";
import { getAllInstructors, getAllStudents } from "@/lib/user";

type CourseCardProps = {
  isAdmin?: boolean;
  instructors?: User[];
} & Course;

const CourseCard = async ({
  id,
  name,
  courseCode,
  image,
  isAdmin,
  instructors,
}: CourseCardProps) => {
  const { success: course, error: courseError } = await getCourse(id);
  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(id);
  const { success: courseInstructors, error: courseInstructorsError } =
    await getCourseInstructors(id);
  const { success: allStudents, error: allStudentsError } =
    await getAllStudents();
  const { success: allInstructors, error: allInstructorsError } =
    await getAllInstructors();

  if (courseError || enrolledStudentsError || courseInstructorsError) {
    return (
      <ErrorToast
        error={
          "Error fetching course data: " +
          (courseError || enrolledStudentsError || courseInstructorsError)
        }
      />
    );
  }

  if (!image || !course || !enrolledStudents || !courseInstructors)
    return <ErrorToast error="Error fetching course image" />;

  if (allStudentsError || !allStudents) {
    return (
      <ErrorToast error={"Error fetching all students: " + allStudentsError} />
    );
  }

  if (allInstructorsError || !allInstructors) {
    return (
      <ErrorToast
        error={"Error fetching all instructors: " + allInstructorsError}
      />
    );
  }

  const availableStudents = allStudents.filter(
    (student) => !enrolledStudents.some((s) => s.id === student.id)
  );
  const availableInstructors = allInstructors.filter(
    (instructor) => !courseInstructors.some((i) => i.id === instructor.id)
  );

  return (
    <article className="flex flex-col gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
      <Link
        href={`/courses/${id}`}
        className="block relative rounded-lg h-40 overflow-hidden"
      >
        <Image src={image} alt={image} className="w-full object-cover" fill />
      </Link>
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/courses/${id}`} key={id}>
            <h1 className="font-medium text-md">{name}</h1>
          </Link>
          <CourseDetailsBtn
            course={JSON.stringify(course)}
            enrolledStudents={JSON.stringify(enrolledStudents)}
            isAdmin={isAdmin}
            instructors={instructors}
            defaultInstructors={courseInstructors}
            availableStudents={availableStudents}
            availableInstructors={availableInstructors}
          />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;
