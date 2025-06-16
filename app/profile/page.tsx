import ProfileDetails from "@/components/shared/profile-page/profile-details";
import ErrorToast from "@/components/ui/error-toast";

import { getEnrolledCourses, getInstructorCourses } from "@/lib/course";
import { getUserById } from "@/lib/user";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    userId: string;
    query?: string;
    page?: string;
    tab?: string;
  }>;
}) => {
  const { userId, query, page, tab } = await searchParams;
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
    <FadeInWrapper className="flex justify-center items-center p-8 min-h-full">
      <Searcher query={query} page={page} tab={tab} />
      <main>
        <ProfileDetails courses={courses} user={user} />
      </main>
    </FadeInWrapper>
  );
};

export default ProfilePage;
