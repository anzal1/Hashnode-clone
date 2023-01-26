import { useLazyQuery } from "@apollo/client";
import { getTrendingBlogs, GET_BOOKMARKS } from "utils/helpers/gql/query";
import useBookmark from "utils/hooks/useBookmark";
import { useEffect } from "react";
import Bookmark from "./Bookmark";
import { v4 as uuidv4 } from "uuid";
import TrendingPostCard from "./TrendingPostCard";
import BookmarkLoading from "./loadings/BookmarkLoading";

const RightMenu = () => {
  const { allBookmarks } = useBookmark();
  const [getBookmarkData, { data, loading }] = useLazyQuery(GET_BOOKMARKS);
  const [
    getTrendingPosts,
    { data: trendingPosts, loading: trendingPostsLoading },
  ] = useLazyQuery(getTrendingBlogs);

  useEffect(() => {
    (async () => {
      if (allBookmarks.length > 0) {
        const bookmarkPromise = getBookmarkData({
          variables: {
            ids: allBookmarks,
          },
        });

        const trendingPostsPromise = getTrendingPosts({
          variables: {
            input: {
              limit: 4,
              skip: 0,
            },
          },
        });
        await bookmarkPromise;
        await trendingPostsPromise;

        return;
      }

      const trendingPostsPromise = getTrendingPosts({
        variables: {
          input: {
            limit: 4,
            skip: 0,
          },
        },
      });

      await trendingPostsPromise;
    })();
  }, [allBookmarks]);

  return (
    <div className="w-full flex flex-col gap-spacing h-full">
      <div className="card p-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color">
            Trending
          </h1>
          <button className="btn-secondary text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </header>

        <main>
          {trendingPostsLoading ? (
            <>
              <BookmarkLoading />
              <BookmarkLoading />
              <BookmarkLoading />
              <BookmarkLoading />
              <BookmarkLoading />
            </>
          ) : (
            trendingPosts?.getTrendingBlogs.map((card) => (
              <TrendingPostCard card={card} key={uuidv4()} />
            ))
          )}
        </main>
      </div>

      <Bookmark data={data?.getManyPosts} loading={loading} />
    </div>
  );
};

export default RightMenu;
