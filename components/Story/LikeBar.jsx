import React, { useContext } from "react";
import Like from "public/icons/emoji/thumbsup.webp";
import Heart from "public/icons/emoji/heart.webp";
import Clap from "public/icons/emoji/clap.webp";
import Money from "public/icons/emoji/money.webp";
import Trophy from "public/icons/emoji/trophy.webp";
import Love from "public/icons/emoji/love.webp";
import Unicorn from "public/icons/emoji/unicorn.webp";
import Beer from "public/icons/emoji/beer.webp";
import Comments from "public/icons/comments";
import Bookmark from "public/icons/bookmark";
import Twitter from "public/icons/twitter";
import Upload from "public/icons/upload";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import useBookmark from "utils/hooks/useBookmark";
import { DEFAULT_ICON_SIZE, SECONDARY_ICON_SIZE } from "utils/constant";
import BookmarkAdded from "public/icons/bookmarkAdded";
import { Context } from "utils/context/main";

const LikeBar = ({ likeData, user, likePost, details, commentsCount }) => {
  const { hasBookmark, changeBookmark } = useBookmark(details?._id);
  const { setToast } = useContext(Context);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setToast({
      msg: "Link Copied to Clipboard",
      status: true,
      type: "info",
    });
  };

  return (
    <div className="single-post-like-bar">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(likeData.likes)
          .filter((e) => e[0] !== "total")
          .map((like) => {
            return (
              <div key={uuidv4()} className="w-fit xl:w-[calc(100%/2-5px)]">
                <button
                  onClick={() => likePost(like[0])}
                  className={`mx-auto flex items-center gap-2 justify-center px-4 btn-icon ${
                    user && like[1].includes(user._id)
                      ? "border border-blue bg-light-border_primary dark:bg-dark-border_secondary"
                      : ""
                  }`}
                >
                  {like[0] === "thumbsup" ? (
                    <Image src={Like} width={30} height={30} />
                  ) : like[0] === "heart" ? (
                    <Image src={Heart} width={30} height={30} />
                  ) : like[0] === "unicorn" ? (
                    <Image src={Unicorn} width={30} height={30} />
                  ) : like[0] === "love" ? (
                    <Image src={Love} width={30} height={30} />
                  ) : like[0] === "cheers" ? (
                    <Image src={Beer} width={30} height={30} />
                  ) : like[0] === "money" ? (
                    <Image src={Money} width={30} height={30} />
                  ) : like[0] === "trophy" ? (
                    <Image src={Trophy} width={30} height={30} />
                  ) : (
                    <Image src={Clap} width={30} height={30} />
                  )}
                  <span className="font-extrabold text-light-paragraph_color dark:text-dark-paragraph_color">
                    {like[1].length}
                  </span>
                </button>
              </div>
            );
          })}
      </div>
      <div className="flex flex-row flex-wrap mt-6 md:mt-4 xl:flex-col w-full justify-center items-center gap-6">
        <button className="btn-icon flex items-center gap-2">
          <Comments w={25} h={25} className="fill-black dark:fill-white" />
          <span className="font-extrabold text-light-paragraph_color dark:text-dark-paragraph_color">
            {commentsCount}
          </span>
        </button>

        <button onClick={changeBookmark} title="Add/Remove Bookmark">
          {hasBookmark ? (
            <BookmarkAdded
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-blue"
            />
          ) : (
            <Bookmark
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
            />
          )}
        </button>

        <button className="btn-icon" title="Share in Twitter">
          <Twitter w={25} h={25} className="fill-black dark:fill-white" />
        </button>

        <button
          className="btn-icon"
          onClick={copyToClipboard}
          title="Copy to Clipboard"
        >
          <Upload w={25} h={25} className="fill-black dark:fill-white" />
        </button>
      </div>
    </div>
  );
};

export default LikeBar;
