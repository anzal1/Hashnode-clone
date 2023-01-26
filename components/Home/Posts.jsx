import { useLazyQuery } from "@apollo/client";
import Card from "components/common/Card";
import End from "components/common/End";
import CardLoading from "components/common/loadings/cardLoading";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from "utils/helpers/gql/query";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const Posts = ({ posts }) => {
  const [data, setData] = useState(posts);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  const [getMoreData, { data: moreData, loading }] = useLazyQuery(getPosts);
  const [hasEnd, setHasEnd] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    try {
      await getMoreData({
        variables: {
          input: {
            limit: 20,
            skip: data.length,
          },
        },
      });
    } catch (err) {
      setToast({
        msg: err.message,
        status: true,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (moreData) {
      if (moreData.getPosts.length > 0) {
        setHasMore(true);
        setData((prev) => [...prev, ...moreData.getPosts]);
      } else {
        setHasMore(false);
        hasEnd && setHasEnd(true);
      }
    }
  }, [moreData]);

  return (
    <div className="w-full mb-20 flex flex-col gap-spacing">
      <div className="w-full overflow-hidden px-4 py-6 card mb-0">
        <header className="w-max flex items-center gap-spacing">
          {Array(15)
            .fill(null)
            .map(() => (
              <div
                key={uuidv4()}
                className="rounded-full w-14 h-14 cursor-pointer bg-light-border_primary dark:bg-dark-border_primary"
              ></div>
            ))}
        </header>
      </div>

      <main className="card p-0">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <>
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </>
          }
          scrollableTarget="scrollableDiv"
        >
          {data.map((post) => (
            <Card key={uuidv4()} details={post} />
          ))}
        </InfiniteScroll>
        {hasEnd && <End />}
      </main>
    </div>
  );
};

export default React.memo(Posts);
