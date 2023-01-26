import { formatDistance } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DEFAULT_PROFILE_SIZE } from "utils/constant";
import Link from "next/link";

const CommentCard = ({ details }) => {
  return (
    <section className="card p-4 my-6">
      <header className="flex items-center justify-between w-full mb-4">
        <Link href={`/@${details.user.username}`}>
          <div className="cursor-pointer flex flex-wrap gap-2 items-center">
            <Image
              src={details.user.profile_photo.url}
              className="rounded-full object-cover"
              width={DEFAULT_PROFILE_SIZE}
              height={DEFAULT_PROFILE_SIZE}
            />
            <div className="text-light-paragraph_color dark:text-dark-paragraph_color">
              <h1 className="text-md md:text-xl font-medium text-black dark:text-dark-heading_color">
                {details.user.name}
              </h1>
              <p className="text-md tracking-wider">@{details.user.username}</p>
            </div>
          </div>
        </Link>
        <p className="text-md font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
          {formatDistance(new Date(+details.createdAt), new Date(), {
            addSuffix: true,
          })}
        </p>
      </header>
      <main className="markdown-preview">
        <ReactMarkdown children={details.comment} remarkPlugins={[remarkGfm]} />
      </main>
    </section>
  );
};

export default CommentCard;
