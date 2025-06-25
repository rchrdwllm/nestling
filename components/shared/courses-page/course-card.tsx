import { Course, User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CourseDetailsBtn from "./course-details-btn";

type CourseCardProps = {
  isAdmin?: boolean;
  instructors?: User[];
  students?: User[];
  enrolledStudents?: User[];
  courseInstructors?: User[];
} & Course;

const CourseCard = ({
  id,
  name,
  courseCode,
  image,
  isAdmin,
  instructors,
  students,
  enrolledStudents,
  courseInstructors,
}: CourseCardProps) => {
  return (
    <article className="flex flex-col gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
      <Link
        href={`/courses/${id}`}
        className="block relative rounded-lg h-40 overflow-hidden"
      >
        <Image src={image} alt={name} className="w-full object-cover" fill />
      </Link>
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/courses/${id}`} key={id}>
            <h1 className="font-medium text-md">{name}</h1>
          </Link>
          <CourseDetailsBtn
            course={JSON.stringify({ id, name, courseCode })}
            isAdmin={isAdmin}
            instructors={instructors}
            defaultInstructors={courseInstructors}
            students={students}
            enrolledStudents={enrolledStudents || []}
          />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;
