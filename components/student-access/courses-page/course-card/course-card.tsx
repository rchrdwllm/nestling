import { Course } from "@/types";
import EnrollBtn from "./enroll-btn";
import { getEnrolledStudents } from "@/lib/course";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CourseCard = async ({ name, id, courseCode, image }: Course) => {
  const { success: enrolledStudents, error } = await getEnrolledStudents(id);

  if (error) {
    return <p>Error getting enrolled students</p>;
  }

  if (!enrolledStudents) {
    return <p>Loading...</p>;
  }

  return (
    <article className="p-4 shadow-sm transition-shadow hover:shadow-md rounded-xl border border-border flex flex-col gap-4">
      <Link
        href={`/courses/${id}`}
        className="block h-40 relative rounded-lg overflow-hidden"
      >
        <Image src={image} alt={image} className="w-full object-cover" fill />
      </Link>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex justify-between items-center">
            <Link href={`/courses/${id}`} key={id}>
              <h1 className="font-medium text-md">{name}</h1>
            </Link>
          </div>
          <p className="text-muted-foreground">{courseCode}</p>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
