import { useLazyQuery } from "@apollo/client";
import { GET_BOOKMARKS } from "utils/helpers/gql/query";
import useBookmark from "utils/hooks/useBookmark";
import Bookmark from "../common/Bookmark";
import { useEffect } from "react";

const TagRightMenu = ({ details }) => {
  const { allBookmarks } = useBookmark();
  const [getBookmarkData, { data, loading }] = useLazyQuery(GET_BOOKMARKS);

  useEffect(() => {
    (async () => {
      if (allBookmarks.length > 0) {
        await getBookmarkData({
          variables: {
            ids: allBookmarks,
          },
        });
      }
    })();
  }, [allBookmarks]);

  return (
    <div className="flex flex-col gap-spacing">
      <div className="card mb-0 p-6">
        <h1 className="text-xl mb-4 font-semibold text-black dark:text-dark-heading_color">
          About this tag
        </h1>
        <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md">
          {details?.description}
        </p>
      </div>
      <Bookmark data={data?.getManyPosts} loading={loading} />
    </div>
  );
};

export default TagRightMenu;
