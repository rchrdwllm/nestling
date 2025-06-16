import FadeInWrapper from "@/components/wrappers/fadein-wrapper";
import Searcher from "@/components/shared/search/general-search/searcher";

const StudentInbox = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <FadeInWrapper className="flex justify-center items-center h-full">
      <Searcher query={query} page={page} tab={tab} />
      <main>
        <h1 className="text-muted-foreground">Start chatting with someone</h1>
      </main>
    </FadeInWrapper>
  );
};

export default StudentInbox;
