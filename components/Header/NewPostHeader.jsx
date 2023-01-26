import Hamburger from "public/icons/hamburger";
import Link from "next/link";
import {
  DEFAULT_BUTTON_ICON_SIZE,
  DEFAULT_ICON_SIZE,
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
} from "utils/constant";
import LogoWithText from "public/icons/logoWithText";
import Cloud from "public/icons/cloud";
import { Context } from "utils/context/main";
import Sun from "public/icons/sun";
import Moon from "public/icons/moon";
import { useContext } from "react";

const NewPostHeader = ({ loading, publishPost }) => {
  const { theme, setTheme } = useContext(Context);

  return (
    <>
      <header className="w-full bg-white dark:bg-dark-border_primary border-b border-text-dark-200 dark:border-dark-border_primary">
        <div className="2xl:container w-full mx-auto px-4 py-2 flex gap-spacing items-center justify-between">
          <div className="flex items-center gap-4">
            <Hamburger
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="block lg:hidden fill-black dark:fill-dark-paragraph_color"
            />
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
          <div className="flex items-center gap-10">
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
            <span className="text-success flex items-center gap-2">
              <span>
                <Cloud w={DEFAULT_ICON_SIZE} h={DEFAULT_ICON_SIZE} />
              </span>
              <span>Saved</span>
            </span>
            <button
              disabled={loading}
              onClick={publishPost}
              className={`btn-primary rounded-full ${
                loading ? "cursor-not-allowed opacity-25" : ""
              }`}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NewPostHeader;
