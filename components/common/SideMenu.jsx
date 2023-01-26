import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import TrendingCard from "components/common/TrendingCard";
import Book from "public/icons/book";
import Explore from "public/icons/explore";
import Feed from "public/icons/feed";
import Improvement from "public/icons/improvement";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import TagLoading from "./loadings/TagLoading";
import MSideMenu from "./MSideMenu";
import { Context } from "utils/context/main";
import { useContext } from "react";

const SideMenu = ({ data, loading }) => {
  const name = useRouter().asPath;
  const { sideMenu } = useContext(Context);

  const menus = [
    {
      _id: uuidv4(),
      title: "My Feed",
      link: "/",
      icon: (
        <Feed
          className="fill-black dark:fill-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      _id: uuidv4(),
      title: "Explore",
      link: "/explore",
      icon: (
        <Explore
          className="fill-black dark:fill-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      _id: uuidv4(),
      title: "Drafts",
      link: "/draft",
      icon: (
        <Book
          className="fill-black dark:fill-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
  ];

  return (
    <>
      <div className="side-menu fixed top-0 left-0 lg:static z-40">
        <aside className="hidden lg:card h-fit lg:py-[10px!important]">
          <div className="pb-spacing border-b dark:border-dark-border_secondary">
            {menus.map((menu) => {
              return (
                <Link href={menu.link} key={uuidv4()}>
                  <div
                    className={`flex gap-2 items-center py-3 px-4 text-md font-medium cursor-pointer hover:dark:bg-dark-border_secondary hover:bg-light-border_primary ${
                      name === menu.link
                        ? "border-r-2 border-blue text-blue fill-blue"
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

          <div className="py-spacing px-4">
            <h1 className="tracking-wide text-md text-black dark:text-dark-paragraph_color flex gap-2 items-center font-semibold mb-3">
              Trending Tags
              <Improvement
                className="fill-primary-dark-300 dark:fill-dark-paragraph_color"
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
              />
            </h1>

            <ul>
              {loading ? (
                <>
                  <TagLoading />
                  <TagLoading />
                  <TagLoading />
                  <TagLoading />
                </>
              ) : (
                data?.getTrendingTags.map((tag) => (
                  <TrendingCard key={uuidv4()} tag={tag} />
                ))
              )}
            </ul>
          </div>

          <footer className="py-spacing px-4">
            <span className="w-16 h-[1.85px] bg-light-border_primary dark:bg-dark-border_secondary block mb-2"></span>
            <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md">
              @{new Date().getFullYear()} Hashnode
            </p>
          </footer>
        </aside>
      </div>

      <div
        className={`side-menu block lg:hidden  transistion-ease duration-200 ${
          sideMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MSideMenu menus={menus} name={name} />
      </div>
    </>
  );
};

export default SideMenu;
