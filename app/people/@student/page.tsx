import { getAllStudents, getAllInstructors } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/admin-access/people-page/user-table";
import { userTableCols } from "@/components/admin-access/people-page/user-table-def";
import { Users, GraduationCap } from "lucide-react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const StudentPeoplePage = async () => {
  const { success: students, error: studentsError } = await getAllStudents();
  const { success: instructors, error: instructorsError } =
    await getAllInstructors();

  if (studentsError || instructorsError) {
    return (
      <ErrorToast
        error={"Error fetching users: " + (studentsError || instructorsError)}
      />
    );
  }

  if (!students || !instructors) {
    return <ErrorToast error="No user data available." />;
  }

  return (
    <FadeInWrapper>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">People</h1>
          <hr />
        </div>
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Instructors ({instructors.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Fellow Students</h2>
              <p className="text-muted-foreground">
                Connect and collaborate with other students
              </p>
            </div>
            <UserTable
              columns={userTableCols}
              data={students}
              searchPlaceholder="Search students by name..."
            />
          </TabsContent>
          <TabsContent value="instructors" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Instructors</h2>
              <p className="text-muted-foreground">
                Get to know your instructors and course facilitators
              </p>
            </div>
            <UserTable
              columns={userTableCols}
              data={instructors}
              searchPlaceholder="Search instructors by name..."
            />
          </TabsContent>
        </Tabs>
      </div>
    </FadeInWrapper>
  );
};

export default StudentPeoplePage;
