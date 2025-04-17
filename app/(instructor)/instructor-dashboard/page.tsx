import SearchBar from "@/components/shared/search/search-bar";
import { getOptimisticUser } from "@/lib/user";

type DashboardProps = {
  searchParams?: Promise<{
    query: string;
    page: number;
    tab: "students" | "courses" | "projects";
  }>;
};

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const user = await getOptimisticUser();

  return (
    <div className="relative h-screen w-full p-6 pt-8">
      <SearchBar />
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, instructor {user.firstName}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
