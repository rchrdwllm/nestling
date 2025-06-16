import { getUnarchivedStudents, getUnarchivedInstructors } from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/shared/people-page/user-table";
import { userTableCols } from "@/components/shared/people-page/user-table-def";
import { Users, GraduationCap } from "lucide-react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const StudentPeoplePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const { success: students, error: studentsError } =
    await getUnarchivedStudents();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();

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
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl">People</h1>
          <hr />
        </div>
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger
              value="instructors"
              className="flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Instructors ({instructors.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4">
            <div>
              <h2 className="font-semibold text-xl">Fellow Students</h2>
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
              <h2 className="font-semibold text-xl">Instructors</h2>
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
