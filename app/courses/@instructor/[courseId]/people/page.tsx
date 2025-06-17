import ErrorToast from "@/components/ui/error-toast";
import { getEnrolledStudents, getCourseInstructors } from "@/lib/course";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/shared/people-page/user-table";
import { userTableCols } from "@/components/shared/people-page/user-table-def";
import { Users, GraduationCap } from "lucide-react";
import Searcher from "@/components/shared/search/general-search/searcher";

const PeoplePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { courseId } = await params;
  const { query, page, tab } = (await searchParams) || {};
  const { success: enrolledStudents, error: enrolledStudentsError } =
    await getEnrolledStudents(courseId);
  const { success: courseInstructors, error: courseInstructorsError } =
    await getCourseInstructors(courseId);

  if (enrolledStudentsError || !enrolledStudents) {
    return (
      <ErrorToast
        error={"Error fetching enrolled students: " + enrolledStudentsError}
      />
    );
  }

  if (courseInstructorsError || !courseInstructors) {
    return (
      <ErrorToast
        error={"Error fetching course instructors: " + courseInstructorsError}
      />
    );
  }
  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">People</h1>
        <hr />
      </div>
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Students ({enrolledStudents.length})
          </TabsTrigger>
          <TabsTrigger value="instructors" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Instructors ({courseInstructors.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Enrolled Students</h2>
            <p className="text-muted-foreground">
              Students enrolled in this course
            </p>
          </div>
          <UserTable
            columns={userTableCols}
            data={enrolledStudents}
            searchPlaceholder="Search students by name..."
          />
        </TabsContent>
        <TabsContent value="instructors" className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Course Instructors</h2>
            <p className="text-muted-foreground">
              Instructors teaching this course
            </p>
          </div>
          <UserTable
            columns={userTableCols}
            data={courseInstructors}
            searchPlaceholder="Search instructors by name..."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeoplePage;
