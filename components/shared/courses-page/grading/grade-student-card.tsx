import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getAssignmentSubmissions,
  getStudentCourseSubmissions,
} from "@/lib/submission";
import { Content, User } from "@/types";
import Link from "next/link";
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
    <Card className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">{name}</h1>
      {!assignments.length ? (
        <p className="text-muted-forground">No assignments found</p>
      ) : (
        assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} studentId={id} {...assignment} />
        ))
      )}
    </Card>
  );
};

export default GradeStudentCard;
