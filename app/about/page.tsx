import About from "@/components/shared/about-page/about";
import Searcher from "@/components/shared/search/general-search/searcher";

const AboutPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; tab?: string }>;
}) => {
  const { query, page, tab } = (await searchParams) || {};

  return (
    <>
      <Searcher query={query} page={page} tab={tab} />
      <About />
    </>
  );
};

export default AboutPage;
