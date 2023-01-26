import Image from "next/image";
import Link from "next/link";
import Moon from "public/icons/moon";
import Plus from "public/icons/plus";
import Search from "public/icons/search";
import {
  SECONDARY_ICON_SIZE,
  DEFAULT_PROFILE_SIZE,
  DEFAULT_ICON_SIZE,
} from "utils/constant";
import Logo from "public/icons/logo";
import { getCookie } from "cookies-next";
import { FOLLOW_USER } from "utils/helpers/gql/mutation";
import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Context } from "utils/context/main";
import Correct from "public/icons/Correct";
import DEFAULT_PROFILE from "public/images/default.webp";
import Sun from "public/icons/sun";
import { HasUser } from ".";
import { useRouter } from "next/router";

const SinglePostHeader = ({ details, user }) => {
  const [data, setData] = useState(details);
  const [Follow, { data: followData, loading, error }] =
    useMutation(FOLLOW_USER);
  const router = useRouter();
  const { theme, setTheme, setToast } = useContext(Context);

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
    if (followData && followData.followUser) {
      if (followData.followUser.message === "User Followed") {
        setData((prev) => ({
          ...prev,
          followers: [...prev.followers, user?._id],
        }));
      } else {
        setData((prev) => ({
          ...prev,
          followers: prev.followers.filter((e) => e !== user?._id),
        }));
      }
      setToast({
        msg: followData.followUser.message,
        status: true,
        type: followData.followUser.success ? "success" : "error",
      });
    }
  }, [followData]);

  const followUser = async () => {
    const token = getCookie("token");
    try {
      await Follow({
        variables: {
          input: {
            user: details._id,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (error) {
      setToast({
        msg: error.message,
        type: "error",
        status: true,
      });
    }
  };

  return (
    <header className="w-full bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary">
      <div className="2xl:container w-full mx-auto px-4 py-6 flex gap-spacing items-center justify-between">
        <Link href={`/${details.username}`}>
          <div className="flex items-center gap-2 cursor-pointer">
            <>
              <Image
                src={details.profile_photo.url}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />

              <h1 className="text-lg font-semibold text-black dark:text-white">
                {details.name}
              </h1>
            </>
          </div>
        </Link>

        <Link href="/">
          <div className="cursor-pointer">
            <Logo
              w={DEFAULT_PROFILE_SIZE}
              h={DEFAULT_PROFILE_SIZE}
              className="fill-blue"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button className="btn-icon hidden md:block">
            <Search
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
          </button>
          <button
            className="btn-icon"
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          >
            {theme === "dark" ? (
              <Sun
                w={DEFAULT_ICON_SIZE}
                h={DEFAULT_ICON_SIZE}
                className="fill-black dark:fill-dark-paragraph_color"
              />
            ) : (
              <Moon
                w={DEFAULT_ICON_SIZE}
                h={DEFAULT_ICON_SIZE}
                className="fill-black dark:fill-dark-paragraph_color"
              />
            )}
          </button>
          {user && user?._id !== details._id && (
            <button
              onClick={followUser}
              className="btn-primary rounded-md text-md flex itmes-center gap-2"
            >
              {user && data.followers.includes(user?._id) ? (
                <>
                  <Correct
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                    className="fill-white"
                  />
                  <span>{loading ? "Loading..." : "Following"}</span>
                </>
              ) : (
                <>
                  <Plus
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                    className="fill-white"
                  />
                  <span>{loading ? "Loading..." : "Follow"}</span>
                </>
              )}
            </button>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="cursor-pointer w-[40px] h-[40px] rounded-full bg-gray-700 "
            >
              <Image
                className="rounded-full object-cover"
                src={(user && user.profile_photo?.url) || DEFAULT_PROFILE}
                width={DEFAULT_PROFILE_SIZE}
                height={DEFAULT_PROFILE_SIZE}
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white dark:bg-[#000] border border-light-border_primary dark:border-dark-border_primary shadow-lg rounded-lg w-80 overflow-hidden"
            >
              <div>
                {user ? (
                  <HasUser user={user} />
                ) : (
                  <div className="flex items-center gap-4 p-4 justify-center">
                    <button
                      onClick={() => router.push("/onboard")}
                      className="btn-primary rounded-full"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={() => router.push("/onboard")}
                      className="btn-primary rounded-full"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SinglePostHeader;
