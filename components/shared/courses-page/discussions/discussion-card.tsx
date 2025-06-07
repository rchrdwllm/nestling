import { Card } from "@/components/ui/card";
import DateDisplay from "@/components/ui/date-display";
import { Discussion } from "@/types";
import Link from "next/link";

const DiscussionCard = ({ title, createdAt, id, courseId }: Discussion) => {
  return (
    <Link href={`/courses/${courseId}/discussions/${id}`}>
      <Card className="p-4 transition-shadow flex flex-col gap-2 hover:shadow-md">
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="text-muted-foreground">
          Posted at{" "}
          <DateDisplay date={createdAt} outputFormat="MMMM d, yyyy h:mm a" />
        </p>
      </Card>
    </Link>
  );
};

export default DiscussionCard;
