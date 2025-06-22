import { Course } from "@/types";
import Link from "next/link";
import Image from "next/image";

const CourseCard = async ({ name, id, courseCode, image }: Course) => {
  return (
    <article className="flex flex-col gap-4 shadow-sm hover:shadow-md p-4 border border-border rounded-xl transition-shadow">
      <Link
        href={`/courses/${id}`}
        className="block relative rounded-lg h-40 overflow-hidden"
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
