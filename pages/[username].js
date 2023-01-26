import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "components/Header";
import SideMenu from "components/common/SideMenu";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getTrendingTags,
  getUserActivites,
  GET_USER_STATUS,
} from "utils/helpers/gql/query";
import Pen from "public/icons/pen";
import { DEFAULT_BUTTON_ICON_SIZE } from "/utils/constant";
import PageNotFound from "/components/common/PageNotFound";

import Head from "next/head";
import SearchSection from "components/common/SearchSection";
import { useQuery } from "@apollo/client";
import About from "components/User/About";
import RecentActivity from "components/User/RecentActivity";
import Social_Since from "components/User/Social_Since";
import Link from "next/link";

const Username = ({ user, data }) => {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);
  const [date, setDate] = useState(null);
  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);

  useEffect(() => {
    if (data?.user) {
      setDate(format(+data.user.createdAt, "MMM, yyyy"));
    }
    setUser(user);
  }, [user, data]);

  return data?.user ? (
    <>
      <Head>
        <title>@{data.user.username} - Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full bg-light-primary_background dark:bg-[#000] py-spacing">
          <div className="w-full xl:container mx-auto px-2 flex flex-col lg:flex-row gap-spacing min-h-[calc(100vh-76px)] h-full">
            {sideMenu && (
              <div
                className="fixed inset-0 bg-black opacity-30 z-10"
                onClick={() => setSideMenu(false)}
              ></div>
            )}
            <SideMenu data={trendingTagData} loading={trendingLoading} />

            <div className="flex-1">
              <div className="card p-0">
                {data.user.cover_image?.url && (
                  <>
                    <div className="h-[16rem] md:h-[20rem] lg:h-[30rem] w-full">
                      <img
                        src={data.user.cover_image?.url}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-row flex-wrap gap-xlspacing py-6 md:py-xlspacing px-6 md:px-10">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex gap-spacing">
                      <img
                        className="w-16 h-16 md:w-28 md:h-28 rounded-full object-cover"
                        src={data.user.profile_photo?.url}
                        alt=""
                      />
                      <div className="mt-4">
                        <h1 className="mb-2">
                          <span className="text-xl md:text-2xl font-semibold text-black dark:text-dark-heading_color">
                            {data.user.name}
                          </span>
                          <span className="ml-2 text-md md:text-lg font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
                            @{data.user.username}
                          </span>
                        </h1>
                        <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md md:text-lg">
                          {data.user.tagline.join(", ")}
                        </p>
                      </div>
                    </div>
                    {user?._id === data.user._id && (
                      <Link href="/settings/account">
                        <button className="btn-primary rounded-full font-normal tracking-normal my-auto">
                          <span>
                            <Pen
                              w={DEFAULT_BUTTON_ICON_SIZE}
                              h={DEFAULT_BUTTON_ICON_SIZE}
                            />
                          </span>
                          <span>Edit</span>
                        </button>
                      </Link>
                    )}
                  </div>

                  <Social_Since data={data} date={date} />

                  <About user={data.user} />

                  <RecentActivity data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <PageNotFound />
  );
};

export default Username;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;
    const { username } = ctx.params;

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

    const {
      data: { getPostsByUser: posts_user_data },
    } = await client.query({
      query: getUserActivites,
      variables: {
        user: username,
      },
    });

    return {
      props: {
        user,
        data: posts_user_data,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        data: null,
      },
    };
  }
};
