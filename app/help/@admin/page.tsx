import Help from "@/components/shared/help-page/faq";
import UserManual from "@/components/shared/help-page/user-manual";
import Searcher from "@/components/shared/search/general-search/searcher";

const HelpPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <div className="flex flex-col gap-8 p-6">
      <Searcher query={query} page={page} tab={tab} />
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">Help</h1>
        <hr />
      </div>
      <UserManual />
      <Help />
    </div>
  );
};

export default HelpPage;
