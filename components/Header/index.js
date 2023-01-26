import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";

import Hamburger from "public/icons/hamburger";
import LogoWithText from "public/icons/logoWithText";
import Moon from "public/icons/moon";
import Notification from "public/icons/notification";
import Pen from "public/icons/pen";
import Sun from "public/icons/sun";
import DEFAULT_PROFILE from "public/images/default.webp";
import {
  DEFAULT_BUTTON_ICON_SIZE,
  DEFAULT_ICON_SIZE,
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_PROFILE_SIZE,
} from "utils/constant";
import { Context } from "utils/context/main";
import Book from "public/icons/book";
import LogOut from "public/icons/logOut";
import Account from "public/icons/account";

const Header = () => {
  const router = useRouter();
  const { user, theme, setTheme, searchInput, handleChange, setSideMenu } =
    useContext(Context);

  return (
    <header className="w-full bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary">
      <div className="2xl:container w-full mx-auto px-4 py-4 flex gap-spacing items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="block lg:hidden btn-icon"
            onClick={() => setSideMenu((prev) => !prev)}
          >
            <Hamburger
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="block lg:hidden fill-black dark:fill-dark-paragraph_color"
            />
          </button>
          <Link href={"/"}>
            <span className="cursor-pointer">
              <LogoWithText
                w={DEFAULT_LOGO_WIDTH}
                h={DEFAULT_LOGO_HEIGHT}
                className="fill-black dark:fill-white"
              />
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex relative w-full">
          <input
            type="text"
            ref={searchInput}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Search for tags, people, articles, and many more"
            className="outline-none w-full px-6 py-2 rounded-full bg-light-input_background dark:bg-[#000] dark:text-white text-black border border-light-border_primary dark:border-dark-border_primary text-lg"
          />
          <div className="absolute top-1/2 -translate-y-1/2 text-black dark:text-white right-4 bg-white dark:bg-gray-700 px-2 py-1 rounded-md border border-light-border_primary dark:border-dark-border_primary text-sm">
            /
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <Link href={"/posts/new"}>
              <button className="rounded-full btn-primary hidden md:flex">
                <Pen
                  w={DEFAULT_BUTTON_ICON_SIZE}
                  h={DEFAULT_BUTTON_ICON_SIZE}
                />
                <span>Write</span>
              </button>
            </Link>
          )}
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
          <button className="btn-icon hidden md:block">
            <Notification
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="hidden md:flex fill-black dark:fill-dark-paragraph_color"
            />
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="cursor-pointer w-10 h-10 rounded-full bg-gray-700 "
            >
              <img
                className="rounded-full object-cover w-full h-full"
                src={user ? user.profile_photo?.url : DEFAULT_PROFILE.src}
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

export default Header;

export const HasUser = ({ user }) => {
  const logout = () => {
    removeCookies("token");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="bg-light-primary_background dark:bg-[#000] hover:bg-light-border_primary hover:dark:bg-dark-secondary_background border-b border-light-border_primary dark:border-dark-border_primary p-4 cursor-pointer">
        <Link href={`/@${user.username}`}>
          <div className="flex itmes-center gap-4">
            <Image
              src={(user && user.profile_photo.url) || DEFAULT_PROFILE}
              width={50}
              height={50}
              className="rounded-full object-cove"
            />
            <div>
              <h1 className="text-md font-semibold text-black dark:text-dark-heading_color">
                {user.name}
              </h1>
              <p className="text-sm mt-1 text-light-paragraph_color dark:text-dark-paragraph_color">
                @{user.username}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="hover:bg-light-border_primary hover:dark:bg-dark-secondary_background">
        <Link href={"/bookmarks"}>
          <div className="flex items-center gap-2 text-lg font-medium text-black dark:text-white p-4 cursor-pointer">
            <Book w={DEFAULT_ICON_SIZE} h={DEFAULT_ICON_SIZE} />
            <span>My Bookmarks</span>
          </div>
        </Link>
      </div>
      <div className="hover:bg-light-border_primary hover:dark:bg-dark-secondary_background">
        <Link href={"/settings/account"}>
          <div className="flex items-center gap-2 text-lg font-medium text-black dark:text-white p-4 cursor-pointer">
            <Account w={DEFAULT_ICON_SIZE} h={DEFAULT_ICON_SIZE} />
            <span>Account Settings</span>
          </div>
        </Link>
      </div>
      <div
        onClick={logout}
        className="hover:bg-light-border_primary hover:dark:bg-dark-secondary_background border-t border-light-border_primary dark:border-dark-border_primary p-4 cursor-pointer"
      >
        <button className="flex items-center gap-2 text-red tracking-wide text-lg">
          <LogOut
            w={DEFAULT_ICON_SIZE}
            h={DEFAULT_ICON_SIZE}
            className="fill-red"
          />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};
