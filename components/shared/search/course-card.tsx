import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import Link from "next/link";
import { memo } from "react";

const CourseCard = memo(({ id, name }: Course) => {
  return (
    <Link href={`/instructor-courses/${id}`} className="w-full">
      <Button
        variant="link"
        className="text-left inline-flex justify-start items-center gap-3 p-0 w-full"
      >
        <h1>{name}</h1>
      </Button>
    </Link>
  );
});

export default CourseCard;
