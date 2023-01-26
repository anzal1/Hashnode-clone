import { useLazyQuery, useQuery } from "@apollo/client";
import Card from "components/common/Card";
import CardLoading from "components/common/loadings/cardLoading";
import RightMenu from "components/common/RightMenu";
import SearchSection from "components/common/SearchSection";
import SideMenu from "components/common/SideMenu";
import Header from "components/Header";
import { debounce } from "lodash";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getTrendingTags,
  GET_SEARCHED_POST,
  GET_USER_STATUS,
} from "utils/helpers/gql/query";

const Search = ({ user }) => {
  const { setUser, searchState, sideMenu, setSideMenu } = useContext(Context);

  const { data: trendingTagData, trendingLoading } = useQuery(getTrendingTags);
  const searchValue = useRef(null);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const [searchPosts, setSearchPosts] = useState([]);
  const [serachedStatus, setSearchedStatus] = useState(false);
  const [searchQuery] = useLazyQuery(GET_SEARCHED_POST);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (searchValue.current) {
      window.addEventListener("keydown", (e) => {
        if (
          document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA"
        ) {
          return;
        } else {
          if (e.key === "/" && searchValue.current) {
            e.preventDefault();
            searchValue.current.focus();
          }
        }
      });
    }

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  async function search(criteria) {
    setSearchLoading(true);
    let response;
    if (criteria.trim().length > 0) {
      setSearchedStatus(true);
      response = await searchQuery({
        variables: {
          search: criteria,
        },
      });
      setSearchLoading(false);
      return response.data.getSearchedPosts;
    }

    setSearchedStatus(false);
    setSearchLoading(false);
  }

  const debouncedSearch = debounce(async (criteria) => {
    setSearchPosts(await search(criteria));
  }, 500);

  async function handleChange(e) {
    debouncedSearch(e.target.value);
  }

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
              <div className="flex flex-col gap-spacing">
                <div className="card p-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      ref={searchValue}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder="Search for tags, people, articles, and many more"
                      className="outline-none w-full px-6 py-2 rounded-full bg-light-input_background dark:bg-[#000] dark:text-white text-black border border-light-border_primary dark:border-dark-border_primary text-lg"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 text-black dark:text-white right-4 bg-white dark:bg-gray-700 px-2 py-1 rounded-md border border-light-border_primary dark:border-dark-border_primary text-sm">
                      /
                    </div>
                  </div>
                </div>
                <div className="card">
                  {serachedStatus ? (
                    searchLoading ? (
                      <>
                        <CardLoading />
                        <CardLoading />
                        <CardLoading />
                        <CardLoading />
                        <CardLoading />
                      </>
                    ) : searchPosts?.length > 0 ? (
                      searchPosts.map((post) => (
                        <Card details={post} key={post._id} />
                      ))
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-lg font-semibold">
                          No content found!
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-2xl font-semibold">
                        Start typing to search...
                      </p>
                      <Image
                        src={"/images/search.webp"}
                        width={500}
                        height={400}
                        alt=""
                      ></Image>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="right-menu hidden lg:inline">
              <RightMenu />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

export const getServerSideProps = async (ctx) => {
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
    props: {
      user,
    },
  };
};
