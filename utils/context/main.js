import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { createContext, useEffect, useRef, useState } from "react";
import { GET_SEARCHED_POST } from "utils/helpers/gql/query";
import Router, { useRouter } from "next/router";

export const Context = createContext();

const ContextHandler = ({ children, values }) => {
  const [theme, setTheme] = useState(); // <LIGHT || DARK>
  const searchInput = useRef(null);
  const router = useRouter();
  const [toast, setToast] = useState({
    status: false,
    msg: "",
    type: "", // success, info, error, warning
  });

  useEffect(() => {
    if (toast.status) {
      setTimeout(
        () =>
          setToast({
            status: false,
            msg: "",
            type: "",
          }),
        1500
      );
    }
  }, [toast]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const themeValue = localStorage.getItem("theme") || "dark";
    setTheme(themeValue);

    const handleInput = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      } else {
        if (e.key === "/" && searchInput.current) {
          e.preventDefault();
          searchInput.current.focus();
        }
      }
    };

    if (searchInput.current && window.innerWidth >= 480) {
      window.addEventListener("keydown", (e) => handleInput(e));
    }

    return () => {
      window.removeEventListener("keydown", (e) => handleInput(e));
    };
  }, [router.asPath]);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body").classList.remove("light");
      document.querySelector("body").classList.add("dark");
      localStorage.setItem("theme", theme);
    } else if (theme === "light") {
      document.querySelector("body").classList.add("light");
      document.querySelector("body").classList.remove("dark");
      localStorage.setItem("theme", theme);
    } else {
    }
  }, [theme]);

  const [searchPosts, setSearchPosts] = useState([]);
  const [searchQuery] = useLazyQuery(GET_SEARCHED_POST);
  const [searchState, setSearchState] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);

  async function search(criteria) {
    setSearchLoading(true);
    let response;
    if (criteria.trim().length > 0) {
      response = await searchQuery({
        variables: {
          search: criteria,
        },
      });
      setSearchLoading(false);
      return response.data.getSearchedPosts;
    }

    setSearchState(false);
    setSearchLoading(false);
  }

  const debouncedSearch = debounce(async (criteria) => {
    setSearchState(true);
    setSearchPosts(await search(criteria));
  }, 500);

  async function handleChange(e) {
    debouncedSearch(e.target.value);
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setSearchState(false)); // add listener

    return () => {
      Router.events.off("routeChangeStart", () => setSearchState(false)); // remove listener  }, []);
    };
  }, []);

  const [sideMenu, setSideMenu] = useState(false);

  const data = {
    theme,
    setTheme,
    searchInput,
    toast,
    setToast,
    user,
    setUser,
    handleChange,
    searchPosts,
    searchState,
    setSearchState,
    searchLoading,

    sideMenu,
    setSideMenu,
    ...values,
  };

  return (
    <Context.Provider value={data}>
      {children}

      {toast.status && (
        <div
          className={`fixed top-10 flex gap-2 items-center right-10 p-4 ${
            toast.type === "success"
              ? "bg-success"
              : toast.type === "info"
              ? "bg-info"
              : toast.type === "warning"
              ? "bg-warning"
              : toast.type === "error" && "bg-error"
          } rounded-lg z-50 w-72 animate-alert`}
        >
          <span>
            {toast.type === "success" ? (
              <i className="uil uil-check-circle text-white text-2xl" />
            ) : toast.type === "error" ? (
              <i className="uil uil-exclamation-octagon text-white text-2xl" />
            ) : toast.type === "info" ? (
              <i className="uil uil-info-circle text-white text-2xl" />
            ) : (
              toast.type === "warning" && (
                <i className="uil uil-exclamation-triangle text-white text-2xl" />
              )
            )}
          </span>
          <p className="text-white font-semibold">{toast.msg}</p>
        </div>
      )}
    </Context.Provider>
  );
};

export default ContextHandler;
