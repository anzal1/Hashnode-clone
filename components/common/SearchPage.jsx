import Header from "components/Header";
import Head from "next/head";

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Home - Hashnode</title>
      </Head>

      <Header />

      <div className="w-full bg-light-primary_background dark:bg-[#000]">
        <div className="w-full py-spacing xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full">
          Hello world!
        </div>
      </div>
    </>
  );
};

export default SearchPage;
