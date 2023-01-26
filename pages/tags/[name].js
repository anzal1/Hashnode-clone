import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Head from "next/head";

import SideMenu from "components/common/SideMenu";
import ExploreTagIntro from "components/Explore/exploreTagIntro";
import TagRightMenu from "components/Explore/TagRightMenu";
import Header from "components/Header";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getPostsByTag,
  getTrendingTags,
  GET_USER_STATUS,
  searchTagQuery,
} from "utils/helpers/gql/query";
import PageNotFound from "components/common/PageNotFound";
import Card from "components/common/Card";
import Clock from "public/icons/clock";
import Fire from "public/icons/fire";
import CardLoading from "components/common/loadings/cardLoading";
import SearchSection from "components/common/SearchSection";

const SingleTag = ({ user, tag }) => {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);
  const router = useRouter();
  const [getPosts, { data, loading }] = useLazyQuery(getPostsByTag);
  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      await getPosts({
        variables: {
          tag: router.query.name,
        },
      });
    })();
  }, [router.query]);

  return tag ? (
    <>
      <Head>
        <title>#{tag?.name} on Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full min-h-screen py-spacing bg-light-primary_background dark:bg-[#000]">
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
              <ExploreTagIntro details={tag} />

              <div className="card py-2">
                <div className="header flex items-center justify-between border-b border-light-border_primary dark:border-dark-border_primary">
                  <div className="px-3">
                    <div className="flex gap-3">
                      <span className="btn-tab">
                        <Fire
                          w={15}
                          h={15}
                          className="fill-black dark:fill-dark-heading_color"
                        />
                        Hot
                      </span>
                      <span className="btn-tab">
                        <Clock
                          w={15}
                          h={15}
                          className="fill-black dark:fill-dark-heading_color"
                        />
                        New
                      </span>
                    </div>
                  </div>
                </div>

                <main className="">
                  {loading ? (
                    <>
                      <CardLoading />
                      <CardLoading />
                      <CardLoading />
                      <CardLoading />
                    </>
                  ) : data?.getPostsByTags.posts.length > 0 ? (
                    data?.getPostsByTags.posts.map((card) => (
                      <Card details={card} />
                    ))
                  ) : (
                    <div className="flex text-xl items-center flex-col px-4 py-8">
                      Nothing to Show
                    </div>
                  )}
                </main>
              </div>
            </div>

            <div className="right-menu hidden lg:inline">
              <TagRightMenu details={tag} />
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <PageNotFound />
  );
};

export default SingleTag;

export const getServerSideProps = async (ctx) => {
  //? Below async code is written like this to increase performance
  try {
    let user = null;
    const token = ctx.req.cookies.token;
    const { name } = ctx.params;

    if (token) {
      let data = client.query({
        query: GET_USER_STATUS,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      let tagsData = client.query({
        query: searchTagQuery,
        variables: {
          tag: name,
        },
      });

      data = await data;
      tagsData = await tagsData;

      user = data.data.getUser.user;

      return {
        props: {
          user: data.data.getUser.user,
          tag: tagsData.data.searchTag,
        },
      };
    }

    let tagsData = client.query({
      query: searchTagQuery,
      variables: {
        tag: name,
      },
    });

    tagsData = await tagsData;

    return {
      props: {
        user,
        tag: tagsData.data.searchTag,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
