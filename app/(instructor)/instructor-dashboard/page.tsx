import Search from "@/components/instructor-access/search/search";
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
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const tab = params?.tab || "students";

  return (
    <div className="h-screen w-full p-6 pt-8">
      <Search query={query} currentPage={currentPage} tab={tab} />
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, instructor {user.firstName}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
