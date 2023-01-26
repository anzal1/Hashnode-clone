import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  SECONDARY_ICON_SIZE,
} from "utils/constant";
import Bookmark from "public/icons/bookmark";
import LogoWithText from "public/icons/logoWithText";
import { Context } from "utils/context/main";
import { useContext } from "react";
import Search from "public/icons/search";

const MSideMenu = ({ menus, name }) => {
  const { setSideMenu } = useContext(Context);
  const newMenus = [
    ...menus,
    {
      _id: uuidv4(),
      title: "Bookmarks",
      link: "/bookmarks",
      icon: (
        <Bookmark
          className="fill-black dark:fill-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      _id: uuidv4(),
      title: "Search",
      link: "/search",
      icon: (
        <Search
          className="fill-black dark:fill-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
  ];
  return (
    <>
      <aside className="w-72 h-screen p-6 flex flex-col">
        <div className="w-full mb-4">
          <LogoWithText
            className="fill-white"
            w={DEFAULT_LOGO_WIDTH}
            h={DEFAULT_LOGO_HEIGHT}
          />
        </div>
        <div className="pb-spacing py-2 flex-1">
          {newMenus.map((menu) => {
            return (
              <Link href={menu.link} key={uuidv4()}>
                <div
                  onClick={() => setSideMenu(false)}
                  className={`flex gap-2 rounded-md items-center py-3 px-4 text-md font-medium cursor-pointer hover:dark:bg-dark-border_secondary hover:bg-light-border_primary ${
                    name === menu.link
                      ? "text-blue fill-blue"
                      : "text-black dark:text-white"
                  }`}
                >
                  {menu.icon}
                  {menu.title}
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="py-spacing px-4">
          <span className="w-16 h-[1.85px] bg-light-border_primary dark:bg-dark-border_secondary block mb-2"></span>
          <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md">
            @{new Date().getFullYear()} Hashnode
          </p>
        </footer>
      </aside>
    </>
  );
};

export default MSideMenu;
