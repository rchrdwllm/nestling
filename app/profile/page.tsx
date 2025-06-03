import ProfileDetails from "@/components/shared/profile-page/profile-details";

import { getEnrolledCourses, getInstructorCourses } from "@/lib/course";
import { getUserById } from "@/lib/user";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ userId: string }>;
}) => {
  const { userId } = await searchParams;
  const { success: user, error } = await getUserById(userId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { success: contents, error: contentsError } =
    user.role === "instructor"
      ? await getInstructorCourses(user.id)
      : await getEnrolledCourses(user.id);

  if (contentsError || !contents) {
    console.error("Error fetching user details: ", contentsError);

    return <h1>Error fetching user details</h1>;
  }

  return (
    <main className="p-8 flex min-h-full justify-center items-center">
      <ProfileDetails contentsLength={contents.length} user={user} />
    </main>
  );
};

export default ProfilePage;
