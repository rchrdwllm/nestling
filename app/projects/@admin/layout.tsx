import CreateProjectDialog from "@/components/admin-access/projects-page/create-project-dialog";
import ErrorToast from "@/components/ui/error-toast";
import Unauthorized from "@/components/ui/unauthorized";
import {
  getOptimisticUser,
  getUnarchivedAdmins,
  getUnarchivedInstructors,
} from "@/lib/user";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getOptimisticUser();

  if (user.role !== "admin") return <Unauthorized />;

  const { success: admins, error: adminsError } = await getUnarchivedAdmins();
  const { success: instructors, error: instructorsError } =
    await getUnarchivedInstructors();

  if (adminsError || instructorsError || !admins || !instructors) {
    return (
      <ErrorToast
        error={"Error fetching data: " + (adminsError || instructorsError)}
      />
    );
  }

  return (
    <>
      <CreateProjectDialog
        admins={JSON.stringify(admins)}
        instructors={JSON.stringify(instructors)}
      />
      {children}
    </>
  );
};

export default Layout;
