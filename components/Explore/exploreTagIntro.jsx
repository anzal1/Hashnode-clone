import { useMutation } from "@apollo/client";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Correct from "public/icons/Correct";
import WebLink from "public/icons/editor-icons/WebLink";
import Feed from "public/icons/feed";
import Pen from "public/icons/pen";
import People from "public/icons/People";
import Plus from "public/icons/plus";
import Twitter from "public/icons/twitter";
import { useContext, useEffect, useState } from "react";
import {
  DEFAULT_BUTTON_ICON_SIZE,
  DEFAULT_ICON_SIZE,
  SECONDARY_ICON_SIZE,
} from "utils/constant";
import { Context } from "utils/context/main";
import { FOLLOW_TAG_QUERY } from "utils/helpers/gql/mutation";
import Link from "next/link";

const ExploreTagIntro = ({ details }) => {
  const [data, setData] = useState(details);
  const { user, setToast } = useContext(Context);
  const [follow, { data: followData, loading, error }] =
    useMutation(FOLLOW_TAG_QUERY);

  useEffect(() => {
    if (error) {
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (followData && user && user._id) {
      if (followData.followTag && followData.followTag.success) {
        if (followData.followTag.message === "Followed") {
          setData((prev) => ({
            ...prev,
            followers: [user._id, ...prev.followers],
          }));
        } else {
          setData((prev) => ({
            ...prev,
            followers: prev.followers.filter((e) => e !== user._id),
          }));
        }
        setToast({
          msg: followData.followTag.message,
          status: true,
          type: "success",
        });
      } else {
        setToast({
          msg: followData.followTag.message,
          status: true,
          type: "error",
        });
      }
    }

    if (followData?.followTag.error) {
      setToast({
        msg: followData.followTag.message,
        status: true,
        type: "error",
      });
    }
  }, [followData]);

  const followTag = async () => {
    try {
      const token = getCookie("token");

      await follow({
        variables: {
          input: {
            name: details?.name,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card py-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Image
            src={data?.logo?.url}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold text-center text-black dark:text-dark-heading_color">
              {data?.name}
            </h1>
            <p className="text-light-paragraph_color dark:text-dark-paragraph_color">
              #{data?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={followTag} className="btn-tertiary rounded-full">
            {loading ? (
              <>
                <span>
                  <Correct
                    w={DEFAULT_ICON_SIZE}
                    h={DEFAULT_ICON_SIZE}
                    className="fill-blue"
                  />
                </span>
                Loading...
              </>
            ) : user?._id ? (
              data?.followers.includes(user?._id) ? (
                <>
                  <span>
                    <Correct
                      w={DEFAULT_ICON_SIZE}
                      h={DEFAULT_ICON_SIZE}
                      className="fill-blue"
                    />
                  </span>
                  Following
                </>
              ) : (
                <>
                  <span>
                    <Plus
                      w={SECONDARY_ICON_SIZE}
                      h={SECONDARY_ICON_SIZE}
                      className="fill-blue"
                    />
                  </span>
                  Follow Tag
                </>
              )
            ) : (
              <>
                <span>
                  <Plus
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                    className="fill-blue"
                  />
                </span>
                Follow Tag
              </>
            )}
          </button>
          <Link href={`/posts/new?tag=${data.name}`}>
            <button className="btn-primary text-sm tracking-normal rounded-full">
              <span>
                <Pen
                  w={DEFAULT_BUTTON_ICON_SIZE}
                  h={DEFAULT_BUTTON_ICON_SIZE}
                />
              </span>
              Write an article
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 font-medium">
          <span className="text-black dark:text-dark-heading_color flex items-center gap-2">
            <People
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <span>
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                data.followersCount
              )}
              <span className="ml-1">Followers</span>
            </span>
          </span>
          <span>·</span>
          <span className="text-black dark:text-dark-heading_color flex items-center gap-2">
            <Feed
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <span>
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                data.articles
              )}
              <span className="ml-1">Articles</span>
            </span>
          </span>
          <div className="flex items-center gap-1">
            <button className="btn-icon">
              <Twitter
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-black dark:fill-white"
              />
            </button>
            <button
              className="btn-icon"
              onClick={() => {
                window && navigator.clipboard.writeText(window.location.href);
                setToast({
                  msg: "Copied to clipboard!",
                  status: true,
                  type: "info",
                });
              }}
            >
              <WebLink
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-black dark:fill-white"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreTagIntro;
