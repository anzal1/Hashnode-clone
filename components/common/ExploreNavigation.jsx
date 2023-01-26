import Link from "next/link";
import { useRouter } from "next/router";

const ExploreNavigation = () => {
  const router = useRouter();

  return (
    <div className="header flex items-center justify-center border-b border-light-border_primary dark:border-dark-border_primary">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/explore">
            <button
              className={`btn-tab px-3 ${
                router.route === "/explore" ? "border-b-2 border-blue" : ""
              }`}
            >
              Trending
            </button>
          </Link>
        </li>
        <li>
          <Link href="/explore/tags">
            <button
              className={`btn-tab px-3 ${
                router.route.includes("/tags") ? "border-b-2 border-blue" : ""
              } `}
            >
              Tags
            </button>
          </Link>
        </li>
        <li>
          <Link href="/explore/blogs">
            <button
              className={`btn-tab px-3 ${
                router.route.includes("/blogs") ? "border-b-2 border-blue" : ""
              } `}
            >
              Blogs
            </button>
          </Link>
        </li>
        <li>
          <Link
            
            href="/explore/following-tags"
          >
            <button className={`btn-tab px-3 ${
              router.route.includes("/following-tags")
                ? "border-b-2 border-blue"
                : ""
            } `}>Tags You Follow</button>
          </Link>
        </li>
        <li>
          <Link
            href="/explore/following-blogs"
          >
            <button
            className={`btn-tab px-3 ${
              router.route.includes("/following-blogs")
                ? "border-b-2 border-blue"
                : ""
            } `}>Blogs You Follow</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ExploreNavigation;
