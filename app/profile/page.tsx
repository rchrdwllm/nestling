import EditProfileForm from "@/components/shared/profile-page/edit-profile-form";
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

  return (
    <main className="p-8">
      <EditProfileForm user={user} />
    </main>
  );
};

export default ProfilePage;
