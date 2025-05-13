import SearchBar from "@/components/shared/search/search-bar";
import { getOptimisticUser } from "@/lib/user";

const InstructorDashboardPage = async () => {
  const user = await getOptimisticUser();

  return (
    <div className="relative h-screen w-full p-6 pt-8">
      <SearchBar entities={["students", "courses", "contents", "projects"]} />
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, instructor {user.firstName}!
        </h1>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
