import Link from "next/link";
import { readingTime } from "utils/helpers/miniFunctions";
import BookmarkLoading from "./loadings/BookmarkLoading";
import { v4 as uuidv4 } from "uuid";
import BookmarkCard from "./BookmarkCard";

const Bookmark = ({ data, loading }) => {
  return (
    <div className="card mb-20 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-2 text-black dark:text-dark-heading_color font-semibold">
          Bookmarks
        </h1>
        <Link href="/bookmarks">
          <button className="btn-secondary text-sm text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="w-full">
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
        </div>
      ) : data?.length > 0 ? (
        data.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))
      ) : (
        <p>No Bookmarks found!</p>
      )}
    </div>
  );
};

export default Bookmark;
