import { v4 as uuidv4 } from "uuid";

const About = ({ user }) => {
  return (
    <div className="flex gap-spacing flex-wrap w-full">
      <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
          About Me
        </h1>

        {user?.bio?.about ? (
          <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
            {user.bio.about}
          </p>
        ) : (
          <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
            Your bio is empty. Tell the world who you are by writing a short
            description about you.
          </p>
        )}
      </div>

      <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
          My Tech Stack
        </h1>
        {user?.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <button
                key={uuidv4()}
                className="card mb-0 px-4 py-2 inline text-black dark:text-dark-heading_color"
              >
                {skill}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
            Your tech stack is empty. Tell the world what is your tech stack.
          </p>
        )}
      </div>

      <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
          I am available for
        </h1>

        {user?.bio?.about ? (
          <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
            {user?.bio?.available}
          </p>
        ) : (
          <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
            Nothing to show.
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
