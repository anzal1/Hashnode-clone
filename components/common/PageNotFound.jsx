import Image from "next/image";
import Link from "next/link";
import PAGENOTFOUND from "/public/images/404.webp";

const PageNotFound = () => {
  return (
    <div className="bg-light-primary_background w-full min-h-screen">
      <div className="w-full xl:container mx-auto bg-white min-h-screen py-20 md:py-10 flex items-center flex-col">
        <Image
          src={PAGENOTFOUND}
          width={500}
          height={500}
          className="object-contain"
        />
        <h1 className="text-5xl mb-6 font-extrabold text-gray-700">404</h1>
        <p className="text-lg font-semibold text-black mb-4">
          We can't find the page you'r looking for!
        </p>
        <Link href={"/"}>
          <button className="bg-transparent hover:bg-gray-100 px-4 py-[5px] rounded-full text-base text-light-paragraph_color border border-light-border_primary">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
