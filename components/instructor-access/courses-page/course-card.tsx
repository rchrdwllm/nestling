import { getCourse, getCourseImage } from "@/lib/course";
import { Course } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CourseDetailsBtn from "./course-details-btn";

const CourseCard = async ({ id, name, courseCode, image }: Course) => {
  const { success: course, error: courseError } = await getCourse(id);

  if (courseError) {
    return (
      <div>
        <h1>Error fetching course image</h1>
      </div>
    );
  }

  if (!image || !course) return <div>Loading...</div>;

  return (
    <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
      <Link
        href={`/instructor-courses/${id}`}
        className="block h-40 relative rounded-lg overflow-hidden"
      >
        <Image src={image} alt={image} className="w-full object-cover" fill />
      </Link>
      <div>
        <div className="flex justify-between items-center">
          <Link href={`/instructor-courses/${id}`} key={id}>
            <h1 className="font-medium text-md">{name}</h1>
          </Link>
          <CourseDetailsBtn course={JSON.stringify(course)} />
        </div>
        <p className="text-muted-foreground">{courseCode}</p>
      </div>
    </article>
  );
};

export default CourseCard;
