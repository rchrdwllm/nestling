import Unauthorized from "@/components/ui/unauthorized";
import Searcher from "@/components/shared/search/general-search/searcher";

const StudentProjectsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <>
      <Searcher query={query} page={page} tab={tab} />
      <Unauthorized />
    </>
  );
};

export default StudentProjectsPage;
