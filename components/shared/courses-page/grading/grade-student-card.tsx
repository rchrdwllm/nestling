import { Card } from "@/components/ui/card";
import { Content, User } from "@/types";
import AssignmentCard from "./assignment-card";

type GradeStudentCardProps = User & {
  assignments: Content[];
  courseId: string;
};

const GradeStudentCard = async ({
  name,
  assignments,
  id,
}: GradeStudentCardProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <h1 className="font-semibold text-xl">{name}</h1>
      {!assignments.length ? (
        <p className="text-muted-foreground">No assignments found</p>
      ) : (
        assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} studentId={id} {...assignment} />
        ))
      )}
    </Card>
  );
};

export default GradeStudentCard;
