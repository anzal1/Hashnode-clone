import { readingTime } from "utils/helpers/miniFunctions";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const BookmarkCard = ({ bookmark }) => {
  return (
    <div
      key={uuidv4()}
      className="last:mb-0 last:border-none py-2 bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary"
    >
      <Link href={`/${bookmark.user.username}/${bookmark.slug}`}>
        <a>
          <h1 className="text-md font-semibold text-black dark:text-dark-heading_color mb-2">
            {bookmark.title}
          </h1>
          <p className="text-md gap-2 text-light-paragraph_color dark:text-dark-paragraph_color">
            {bookmark.user.name} · {readingTime(bookmark.content)} min read
          </p>
        </a>
      </Link>
    </div>
  );
};

export default BookmarkCard;
