import ProfileDetails from "@/components/shared/profile-page/profile-details";
import ErrorToast from "@/components/ui/error-toast";

import { getEnrolledCourses, getInstructorCourses } from "@/lib/course";
import { getUserById } from "@/lib/user";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ userId: string }>;
}) => {
  const { userId } = await searchParams;
  const { success: user, error } = await getUserById(userId);

  if (error || !user) {
    return <ErrorToast error={"Error fetching user details: " + error} />;
  }

  const { success: contents, error: contentsError } =
    user.role === "instructor"
      ? await getInstructorCourses(user.id)
      : await getEnrolledCourses(user.id);

  if (contentsError || !contents) {
    return (
      <ErrorToast error={"Error fetching user details: " + contentsError} />
    );
  }

  return (
    <main className="p-8 flex min-h-full justify-center items-center">
      <ProfileDetails contentsLength={contents.length} user={user} />
    </main>
  );
};

export default ProfilePage;
