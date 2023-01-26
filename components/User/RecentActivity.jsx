import { format, isSameYear } from "date-fns";
import Pen from "public/icons/pen";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { DEFAULT_BUTTON_ICON_SIZE } from "utils/constant";

const RecentActivity = ({ data }) => {
  return (
    <div className="card px-6 py-4 w-full">
      <h1 className="text-2xl mb-8 font-semibold text-black dark:text-dark-heading_color">
        Recent Activity
      </h1>

      <div className="flex flex-col">
        {data.posts.map((post) => (
          <div key={uuidv4()} className="flex gap-6 w-full">
            <div className="py-4 w-16 text-black dark:text-[#dbdbdb] font-semibold">
              {format(
                +post.createdAt,
                isSameYear(new Date(+post.createdAt), new Date())
                  ? "MMM dd"
                  : "MMM dd yyyy"
              )}
            </div>
            
            <div className="border-b border-light-border_primary w-full dark:border-dark-border_primary py-4">
              <p className="text-md flex items-center gap-2 text-black dark:text-[#dbdbdb] font-medium">
                <span>
                  <Pen
                    w={DEFAULT_BUTTON_ICON_SIZE}
                    h={DEFAULT_BUTTON_ICON_SIZE}
                    className="fill-black dark:fill-[#dbdbdb]"
                  />
                </span>
                <span>Wrote an article</span>
              </p>
              <Link href={`/${data.user.username}/${post.slug}`}>
                <h1 className="cursor-pointer font-semibold text-xl text-black dark:text-[#dbdbdb]">
                  {post.title}
                </h1>
              </Link>
            </div>
          </div>
        ))}

        <div className="flex gap-6 w-full">
          <div className="py-4 w-16 text-black dark:text-[#dbdbdb] font-semibold">
            {data &&
              data.user &&
              format(
                +data.user.createdAt,
                isSameYear(new Date(+data.user.createdAt), new Date())
                  ? "MMM dd"
                  : "MMM dd yyyy"
              )}
          </div>

          <div className="w-full py-4">
            <h1 className="font-semibold text-xl text-black dark:text-[#dbdbdb]">
              Joined Hashnode
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
