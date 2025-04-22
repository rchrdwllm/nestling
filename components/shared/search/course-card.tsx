import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Course } from "@/types";
import Link from "next/link";
import { memo } from "react";

const CourseCard = memo(({ id, name }: Course) => {
  const { user } = useCurrentUser();

  return (
    <Link href={`/${user.role}-courses/${id}`} className="w-full">
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
