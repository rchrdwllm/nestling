import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEnrollmentDetails } from "@/lib/course";
import { editCourseAccess } from "@/server/actions/edit-course-access";
import { EnrollmentData, User } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type StudentAccessCellProps = User & { courseId: string };

const StudentAccessCell = ({
  id,
  name,
  email,
  courseId,
}: StudentAccessCellProps) => {
  const [enabled, setEnabled] = useState(false);
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<EnrollmentData | null>(null);
  const { execute } = useAction(editCourseAccess, {
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.data?.success);
    },
  });

  const fetchEnrollment = async () => {
    const { success, error } = await getEnrollmentDetails(courseId, id);

    if (error) {
      console.error("Error fetching enrollment details:", error);

      return;
    } else if (success) {
      setEnrollmentDetails(JSON.parse(success) as EnrollmentData);
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [courseId, id]);

  useEffect(() => {
    if (enrollmentDetails) {
      setEnabled(enrollmentDetails.accessEnabled);
    }
  }, [enrollmentDetails]);

  if (!enrollmentDetails)
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    );

  const handleChange = () => {
    execute({ courseId, studentId: id });
    setEnabled(!enabled);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{email}</TableCell>
      <TableCell className="text-right">
        <Switch checked={enabled} onCheckedChange={handleChange} />
      </TableCell>
    </TableRow>
  );
};

export default StudentAccessCell;
