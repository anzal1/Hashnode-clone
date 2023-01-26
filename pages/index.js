import { useContext, useEffect } from "react";
import Header from "components/Header";
import Posts from "components/Home/Posts";
import SideMenu from "components/common/SideMenu";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getPosts,
  getTrendingTags,
  GET_USER_STATUS,
} from "utils/helpers/gql/query";
import RightMenu from "components/common/RightMenu";
import Head from "next/head";
import SearchSection from "components/common/SearchSection";
import { useQuery } from "@apollo/client";

export default function Home({ data, user }) {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);

  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Home - Hashnode</title>
      </Head>

      <Header />

      <div className="w-full min-h-screen bg-light-primary_background dark:bg-[#000]">
        {searchState ? (
          <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
            <SearchSection />
          </div>
        ) : (
          <div className="w-full py-spacing xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full">
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

            <div className="posts-body">
              <Posts posts={data} />
            </div>

            <div className="right-menu hidden lg:inline">
              <RightMenu />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let user = null;
  const token = ctx.req.cookies.token;

  if (token) {
    let userData = client.query({
      query: GET_USER_STATUS,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    userData = await userData;

    user = userData.data.getUser.user;
  }

  let postsData = client.query({
    query: getPosts,
    variables: {
      input: {
        limit: 10,
        skip: 0,
      },
    },
  });

  postsData = await postsData;

  return {
    props: {
      user,
      data: postsData.data.getPosts,
    },
  };
};
