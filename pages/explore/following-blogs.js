import Head from "next/head";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";

import RightMenu from "components/common/RightMenu";
import SideMenu from "components/common/SideMenu";
import ExploreIntro from "components/Explore/exploreIntro";
import Header from "components/Header";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getFollowedPosts,
  getTrendingTags,
  GET_USER_STATUS,
} from "utils/helpers/gql/query";
import SingleTagLoading from "components/common/loadings/SingleTagLoading";
import SearchSection from "components/common/SearchSection";
import Card from "components/common/Card";
import ExploreNavigation from "components/common/ExploreNavigation";
import { getCookie } from "cookies-next";

const Explore = ({ user }) => {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);
  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);

  const [getPosts] = useLazyQuery(getFollowedPosts);
  const [data, setData] = useState({
    posts: [],
    loading: true,
  });

  useEffect(() => {
    setUser(user);
    (async () => {
      const token = getCookie("token");

      if (token) {
        const { data } = await getPosts({
          variables: {
            input: {
              limit: 10,
              skip: 0,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });

        setData({
          loading: false,
          posts: data.getFollowedPosts,
        });
      }
      setData({
        loading: false,
        posts: [],
      });
    })();
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
          <div className="w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full">
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

                <div className="py-4 w-full">
                  <h1 className="text-2xl px-4 font-semibold mb-4 text-black dark:text-dark-heading_color">
                    Blogs you follow
                  </h1>
                  <main className="flex flex-wrap gap-4">
                    {user?.following.length > 0 ? (
                      data.loading ? (
                        <div className="px-4 flex gap-4 flex-wrap w-full">
                          <SingleTagLoading />
                          <SingleTagLoading />
                          <SingleTagLoading />
                          <SingleTagLoading />
                        </div>
                      ) : data.posts.length > 0 ? (
                        data.posts.map((post) => <Card details={post} />)
                      ) : (
                        <div className="py-20 text-center w-full">
                          <p className="text-xl font-semibold">
                            No articles found!
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="py-20 text-center w-full">
                        <p className="text-xl font-semibold">
                          You have not followed some blog articles!
                        </p>
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
    console.log(error);
    return {
      props: {},
    };
  }
};
