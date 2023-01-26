import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";

import RightMenu from "components/common/RightMenu";
import SideMenu from "components/common/SideMenu";
import ExploreIntro from "components/Explore/exploreIntro";
import Header from "components/Header";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getFollowedTags,
  getTrendingBlogs,
  getTrendingTags,
  GET_USER_STATUS,
} from "utils/helpers/gql/query";
import SingleTagLoading from "components/common/loadings/SingleTagLoading";
import { v4 as uuidv4 } from "uuid";
import SearchSection from "components/common/SearchSection";
import Card from "components/common/Card";
import ExploreNavigation from "components/common/ExploreNavigation";
import { getCookie } from "cookies-next";

const Explore = ({ user }) => {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);
  const [getTags, { data, loading }] = useLazyQuery(getFollowedTags);
  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);

  useEffect(() => {
    (async () => {
      const token = getCookie("token");
      if (token) {
        await getTags({
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Explore Tech Blogs & Tags on Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full py-spacing bg-light-primary_background dark:bg-[#000]">
          <div
            className={`w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full`}
          >
            {sideMenu && (
              <>
                <div
                  className="fixed inset-0 bg-black opacity-30 z-10"
                  onClick={() => setSideMenu(false)}
                ></div>
              </>
            )}
            <>
              <SideMenu data={trendingTagData} loading={trendingLoading} />
            </>

            <div className="posts-body flex flex-col gap-spacing">
              <ExploreIntro />

              <div className="card py-2">
                <ul className="flex flex-wrap px-4 gap-2">
                  <ExploreNavigation />
                </ul>

                <div className="p-4">
                  <header className="flex items-center gap-6 mb-6">
                    <h1 className="text-2xl font-semibold text-black dark:text-dark-heading_color">
                      Tags you follow
                    </h1>
                  </header>

                  <main className="flex flex-wrap gap-4">
                    {user ? (
                      loading ? (
                        <>
                          <SingleTagLoading />
                          <SingleTagLoading />
                          <SingleTagLoading />
                          <SingleTagLoading />
                        </>
                      ) : (
                        data?.getFollowedTags?.map((tag) => (
                          <Link href={`/tags/${tag.name}`}>
                            <div
                              key={uuidv4()}
                              className="p-4 cursor-pointer rounded-md bg-dark-border_primary w-full md:w-[calc(100%/2-8px)] border border-light-border_primary dark:border-dark-border_primary flex items-center gap-2"
                            >
                              <Image
                                src={tag.logo.url}
                                width={40}
                                height={40}
                                className="object-cover rounded-md"
                              ></Image>
                              <div>
                                <h1 className="text-lg font-semibold text-black dark:text-white cursor-pointer">
                                  {tag.name}
                                </h1>
                                <span className="text-sm">
                                  {tag.articles} articles this week
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))
                      )
                    ) : (
                      <div className="flex items-center justify-center w-full text-2xl font-semibold h-32 text-center">
                        Login to get tags you follow
                      </div>
                    )}
                  </main>
                </div>
              </div>
            </div>

            <div className={`right-menu hidden lg:inline`}>
              <RightMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;

    if (token) {
      const {
        data: { getUser: data },
      } = await client.query({
        query: GET_USER_STATUS,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      user = data.user;
    }

    return {
      props: { user },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
