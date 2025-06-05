import {
  getCourse,
  getCourseImage,
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
    <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex flex-col gap-4">
      <Link
        href={`/courses/${id}`}
        className="block h-40 relative rounded-lg overflow-hidden"
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
          />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;
