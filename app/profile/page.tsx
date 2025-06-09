import ProfileDetails from "@/components/shared/profile-page/profile-details";
import ErrorToast from "@/components/ui/error-toast";

import { getEnrolledCourses, getInstructorCourses } from "@/lib/course";
import { getUserById } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

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

  const { success: courses, error: coursesError } =
    user.role === "instructor"
      ? await getInstructorCourses(user.id)
      : await getEnrolledCourses(user.id);

  if (coursesError || !courses) {
    return (
      <ErrorToast error={"Error fetching user details: " + coursesError} />
    );
  }

  return (
    <FadeInWrapper className="p-8 flex min-h-full justify-center items-center">
      <main>
        <ProfileDetails courses={courses} user={user} />
      </main>
    </FadeInWrapper>
  );
};

export default ProfilePage;
