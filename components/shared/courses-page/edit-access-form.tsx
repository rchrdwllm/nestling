import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import StudentAccessCell from "./student-access-cell";

type EditAccessFormProps = {
  enrolledStudents: User[];
  courseId: string;
};

const EditAccessForm = ({
  enrolledStudents,
  courseId,
}: EditAccessFormProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">Student name</TableHead>
          <TableHead className="flex-1">Email</TableHead>
          <TableHead className="text-right">Access enabled</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enrolledStudents.length ? (
          enrolledStudents.map((student) => (
            <StudentAccessCell
              key={student.id}
              {...student}
              courseId={courseId}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No students enrolled
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EditAccessForm;
