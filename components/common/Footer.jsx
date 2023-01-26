import React from "react";

const Footer = ({ user }) => {
  return (
    <div className="bg-gray-100 dark:bg-[#000] py-10">
      <div className="container mx-auto text-center">
        <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color">
          @{new Date().getFullYear()} {user} blog
        </p>

        <ul className="flex items-center gap-2 justify-center my-2 text-md text-light-paragraph_color dark:text-dark-paragraph_color">
          <li>Archive</li>·<li>Privacy policy</li>·<li>Terms</li>
        </ul>

        <a href="https://hashnode.com" target="_blank">
          <button className="my-6 text-black dark:text-gray-200 border hover:bg-gray-200 dark:hover:bg-gray-800 border-light-border_primary dark:border-dark-border_primary rounded-md font-semibold text-lg px-4 py-2">
            Cloned of Hashnode
          </button>
        </a>
        <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color">
          Powered by Hashnode - Home for tech writers and readers
        </p>
      </div>
    </div>
  );
};

export default Footer;
