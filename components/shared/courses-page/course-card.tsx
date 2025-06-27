import { Course, User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CourseDetailsBtn from "./course-details-btn";

type CourseCardProps = {
  isAdmin?: boolean;
  instructors: User[];
  students: User[];
} & Course;

const CourseCard = ({
  id,
  name,
  courseCode,
  image,
  isAdmin,
  instructors,
  students,
}: CourseCardProps) => {
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
            courseId={id}
            isAdmin={isAdmin}
            instructors={instructors}
            students={students}
          />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;