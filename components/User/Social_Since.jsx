import Youtube from "/public/icons/socials/youtube.jsx";
import Facebook from "/public/icons/socials/facebook.jsx";
import Twitter from "/public/icons/socials/twitter.jsx";
import Stackoverflow from "/public/icons/socials/stackoverflow.jsx";
import Instagram from "/public/icons/socials/instagram.jsx";
import Github from "/public/icons/socials/github.jsx";
import Website from "/public/icons/socials/website.jsx";
import LinkedIn from "/public/icons/socials/linkedin.jsx";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import { v4 as uuidv4 } from "uuid";

const Social_Since = ({ data, date }) => {
  const getSocial = () => {
    if (data?.user && data?.user.social) {
      const res = Object.entries(data.user.social).filter(
        (e) => e[1] !== null && e[1].trim() !== ""
      );
      return res.map((e) => ({ [e[0]]: e[1] }));
    } else {
      return [];
    }
  };
  return (
    <div className="card mb-0 px-4 flex-row flex-wrap justify-center items-center gap-4 py-6 w-full">
      {data.user &&
      data.user.social &&
      Object.values(data.user.social).filter((e) => e !== null) ? (
        <div className="flex flex-wrap items-center gap-1">
          {getSocial().map((e) => (
            <a
              target="_blank"
              rel="noreferrer"
              key={uuidv4()}
              href={Object.values(e)}
            >
              <button className="btn-icon">
                {Object.keys(e)[0] === "youtube" ? (
                  <Youtube
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "facebook" ? (
                  <Facebook
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "twitter" ? (
                  <Twitter
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "stackoverflow" ? (
                  <Stackoverflow
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "instagram" ? (
                  <Instagram
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "github" ? (
                  <Github
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : Object.keys(e)[0] === "website" ? (
                  <Website
                    className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                    w={SECONDARY_ICON_SIZE}
                    h={SECONDARY_ICON_SIZE}
                  />
                ) : (
                  Object.keys(e)[0] === "linkedin" && (
                    <LinkedIn
                      className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                      w={SECONDARY_ICON_SIZE}
                      h={SECONDARY_ICON_SIZE}
                    />
                  )
                )}
              </button>
            </a>
          ))}
        </div>
      ) : null}
      <p className="text-md font-medium text-center text-black dark:text-white">
        Member Since <span className="font-bold">{date}</span>
      </p>
    </div>
  );
};

export default Social_Since;
