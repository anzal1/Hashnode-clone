import Link from "next/link";

const TrendingCard = ({ tag }) => {
  return (
    <Link href={`/tags/${tag.name}`}>
      <li className="flex hover:dark:bg-dark-border_primary hover:bg-gray-100 cursor-pointer items-center justify-between py-1 rounded-md px-2 text-md text-light-paragraph_color dark:text-dark-heading_color">
        <span className="text-overflow-hidden">
          {tag.name.slice(0, 1).toUpperCase() +
            tag.name.slice(1, tag.name.length)}
        </span>
        <span className="rounded-full bg-gray-100 dark:bg-dark-primary_background border border-light-border_primary dark:border-dark-border_secondary px-3 py-[3px] text-sm font-semibold">
          +{tag.articles}
        </span>
      </li>
    </Link>
  );
};

export default TrendingCard;
