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

type CourseCardProps = {
  isAdmin?: boolean;
  instructors?: User[];
  students?: User[];
} & Course;

const CourseCard = async ({
  id,
  name,
  courseCode,
  image,
  isAdmin,
  instructors,
  students,
}: CourseCardProps) => {
  const { success: course, error: courseError } = await getCourse(id);
  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(id);
  const { success: courseInstructors, error: courseInstructorsError } =
    await getCourseInstructors(id);

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
            isAdmin={isAdmin}
            instructors={instructors}
            defaultInstructors={courseInstructors}
            students={students}
            enrolledStudents={enrolledStudents}
          />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;
