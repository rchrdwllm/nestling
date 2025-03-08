import { getCourseImage } from "@/lib/course";
import { Course } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ id, name, courseCode }: Course) => {
  const { success: img, error } = await getCourseImage(id);

  if (error) {
    return (
      <div>
        <h1>Error fetching course image</h1>
      </div>
    );
  }

  if (!img) return <div>Loading...</div>;

  return (
    <Link href={`/instructor-courses/${id}`} key={id}>
      <article className="p-4 rounded-xl border border-border flex flex-col gap-4">
        <div className="h-40 relative rounded-lg overflow-hidden">
          <Image
            src={img.secure_url}
            alt={img.public_id}
            className="w-full object-cover"
            fill
          />
        </div>
        <div>
          <h1 className="font-medium text-md">{name}</h1>
          <p className="text-muted-foreground">{courseCode}</p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;
