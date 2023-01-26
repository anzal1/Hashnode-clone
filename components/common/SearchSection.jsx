import { useContext } from "react";
import { Context } from "utils/context/main";
import Card from "./Card";
import CardLoading from "./loadings/cardLoading";

const SearchSection = () => {
  const { searchPosts, searchLoading } = useContext(Context);

  return (
    <div className="search-list-grid">
      <div className="search-list-child mb-10">
        {searchLoading ? (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        ) : searchPosts.length > 0 ? (
          searchPosts.map((post) => <Card details={post} key={post._id} />)
        ) : (
          <div className="py-10 text-center">
            <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-lg font-semibold">
              No content found!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
