import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/context/search-context";
import { Course } from "@/types";
import Link from "next/link";
import { memo } from "react";

const CourseCard = memo(({ id, name }: Course) => {
  const { setSearchItemClicked } = useSearchStore();

  return (
    <Link
      href={`/courses/${id}`}
      onClick={() => {
        setSearchItemClicked(true);
      }}
      className="w-full"
    >
      <Button
        variant="link"
        className="inline-flex justify-start items-center gap-3 p-0 w-full text-left"
      >
        <h1>{name}</h1>
      </Button>
    </Link>
  );
});

export default CourseCard;
