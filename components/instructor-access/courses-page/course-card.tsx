import { Course } from "@/types";
import Link from "next/link";

const CourseCard = async ({ id, name, courseCode }: Course) => {
  return (
    <Link href={`/instructor-courses/${id}`} key={id}>
      <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
        <div className="bg-secondary h-40 w-full rounded-lg"></div>
        <div>
          <h1 className="font-medium text-md">{name}</h1>
          <p className="text-muted-foreground">{courseCode}</p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;
