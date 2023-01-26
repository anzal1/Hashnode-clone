import { useState, useEffect } from "react";

const useBookmark = (_id) => {
  const [hasBookmark, setHasBookmark] = useState(false);
  const [allBookmarks, setAllBookmarks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookmarks"));
    setAllBookmarks(data?.slice(0, 6) || []);

    if (data && data.includes(_id)) {
      setHasBookmark(true);
      return;
    }

    setHasBookmark(false);
  }, [_id, hasBookmark]);

  const changeBookmark = () => {
    const data = JSON.parse(localStorage.getItem("bookmarks"));

    if (data) {
      const bookmarkIdx = data.findIndex((bookmark) => bookmark === _id);

      if (bookmarkIdx === -1) {
        setHasBookmark(true);
        localStorage.setItem("bookmarks", JSON.stringify([...data, _id]));
      } else {
        setHasBookmark(false);
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([...data.filter((e) => e !== _id)])
        );
      }
    } else {
      setHasBookmark(true);
      localStorage.setItem("bookmarks", JSON.stringify([_id]));
    }
  };

  return { hasBookmark, changeBookmark, allBookmarks };
};

export default useBookmark;
