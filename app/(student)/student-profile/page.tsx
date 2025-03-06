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

  return <div>{userId}</div>;
};

export default ProfilePage;
