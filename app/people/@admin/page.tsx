import {
  getOptimisticUser,
  getArchivedUsers,
  getUnarchivedStudents,
  getUnarchivedInstructors,
  getUnarchivedAdmins,
} from "@/lib/user";
import ErrorToast from "@/components/ui/error-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/shared/people-page/user-table";
import {
  userColsWithArchive,
  userTableCols,
} from "@/components/shared/people-page/user-table-def";
import { Users, GraduationCap, Shield, CircleDashed, Box } from "lucide-react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import { getRegisteredEmails } from "@/lib/registered-email";
import RegisteredTable from "@/components/admin-access/people-page/registered-table";
import { registeredTableCols } from "@/components/admin-access/people-page/registered-table-def";
import AddPeopleBtn from "@/components/admin-access/people-page/add-people-btn";
import Searcher from "@/components/shared/search/general-search/searcher";
import Unauthorized from "@/components/ui/unauthorized";

const AdminPeoplePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};
  const user = await getOptimisticUser();

  if (user.role !== "admin") return <Unauthorized />;

  const { success: students, error: studentsError } =
    await getUnarchivedStudents();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();
  const { success: admins, error: adminsError } = await getUnarchivedAdmins();
  const { success: registeredEmails, error: registeredEmailsError } =
    await getRegisteredEmails();
  const { success: archivedUsers, error: archivedUsersError } =
    await getArchivedUsers();

  if (studentsError || instructorsError || adminsError || archivedUsersError) {
    return (
      <ErrorToast
        error={
          "Error fetching users: " +
          (studentsError || instructorsError || adminsError)
        }
      />
    );
  }

  if (!students || !instructors || !admins || !archivedUsers) {
    return <ErrorToast error="No user data available." />;
  }

  if (registeredEmailsError || !registeredEmails) {
    return (
      <ErrorToast
        error={"Error fetching registered emails: " + registeredEmailsError}
      />
    );
  }

  return (
    <FadeInWrapper>
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl">People</h1>
            <AddPeopleBtn />
          </div>
          <hr />
        </div>
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
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
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Admins ({admins.length})
            </TabsTrigger>
            <TabsTrigger value="registered" className="flex items-center gap-2">
              <CircleDashed className="w-4 h-4" />
              Registered Emails ({registeredEmails.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              Archived Users ({archivedUsers.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl">Students</h2>
              <p className="text-muted-foreground">
                All registered students in the system
              </p>
            </div>
            <UserTable
              columns={
                user.role === "admin" ? userColsWithArchive : userTableCols
              }
              data={students}
              searchPlaceholder="Search students by name..."
              showUsersExport
            />
          </TabsContent>
          <TabsContent value="instructors" className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl">Instructors</h2>
              <p className="text-muted-foreground">
                All registered instructors in the system
              </p>
            </div>
            <UserTable
              columns={
                user.role === "admin" ? userColsWithArchive : userTableCols
              }
              data={instructors}
              searchPlaceholder="Search instructors by name..."
              showUsersExport
            />
          </TabsContent>
          <TabsContent value="admins" className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl">Administrators</h2>
              <p className="text-muted-foreground">
                All registered administrators in the system
              </p>
            </div>
            <UserTable
              columns={
                user.role === "admin" ? userColsWithArchive : userTableCols
              }
              data={admins}
              searchPlaceholder="Search administrators by name..."
              showUsersExport
            />
          </TabsContent>
          <TabsContent value="registered" className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl">Registered</h2>
              <p className="text-muted-foreground">
                All registered emails in the system
              </p>
            </div>
            <RegisteredTable
              columns={registeredTableCols}
              data={registeredEmails}
            />
          </TabsContent>
          <TabsContent value="archived" className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl">Archived</h2>
              <p className="text-muted-foreground">
                All archived users in the system
              </p>
            </div>
            <UserTable
              columns={
                user.role === "admin" ? userColsWithArchive : userTableCols
              }
              data={archivedUsers}
              searchPlaceholder="Search archived users by name..."
              showUsersExport
            />
          </TabsContent>
        </Tabs>
      </div>
    </FadeInWrapper>
  );
};

export default AdminPeoplePage;
