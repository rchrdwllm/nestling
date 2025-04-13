import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import Link from "next/link";

const CourseCard = ({ courseCode, id, image, name }: Course) => {
  return (
    <Link href={`/instructor-courses/${id}`} className="w-full">
      <Button
        variant="ghost"
        className="flex text-left items-center justify-start gap-2 w-full"
      >
        {
          <Avatar className="size-10">
            <AvatarImage src={image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full">
                <p className="text-sm font-semibold">{name![0]}</p>
              </div>
            </AvatarFallback>
          </Avatar>
        }
        <div className="flex text-left flex-col">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{courseCode}</p>
        </div>
      </Button>
    </Link>
  );
};

export default CourseCard;
