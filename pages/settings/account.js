import { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Header from "components/Header";
import Head from "next/head";
import Basic from "components/Settings/Basic";
import Social from "components/Settings/Social";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import { GET_USER } from "utils/helpers/gql/query";
import { isValidHttpUrl } from "utils/helpers/miniFunctions";
import { UPDATE_USER } from "utils/helpers/gql/mutation";
import { userFields } from "utils/data";
import SearchSection from "components/common/SearchSection";

const Account = ({ user }) => {
  const router = useRouter();
  const { setUser, setToast, searchState } = useContext(Context);
  const { _id, followers, following, createdAt, ...rest } = user;
  const [details, setDetails] = useState(rest);
  const [updateUserMutation, { data, loading, error }] =
    useMutation(UPDATE_USER);

  useEffect(() => {
    if (error) {
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  }, [error]);

  const [allfields] = useState(userFields);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    if (data && data.updateUser && data.updateUser.success) {
      setToast({
        msg: "User Updated successfully!",
        type: "success",
        status: true,
      });
      setTimeout(() => {
        // to update the user data
        router.reload();
      }, 1000);
    }
  }, [data]);

  const submit = async () => {
    try {
      const token = getCookie("token");

      const { email, ...d } = details;

      const links = d.social;

      for (let i = 0; i < Object.entries(links).length; i++) {
        const url = links[Object.entries(links)[i][0]];

        if (url !== null) {
          if (!isValidHttpUrl(url))
            return setToast({
              msg: `Invalid URL in ${Object.keys(links)[i]}`,
              status: true,
              type: "info",
            });
        }
      }

      const updatedData = {
        ...d,
        skills: Array.isArray(details.skills)
          ? details.skills
          : details.skills.split(",").map((e) => e.trim()),
        tagline: Array.isArray(details.tagline)
          ? details.tagline
          : details.tagline.split(",").map((e) => e.trim()),
      };

      await updateUserMutation({
        variables: {
          input: updatedData,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (error) {
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Account Settings - Hashnode </title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="py-spacing w-full min-h-screen bg-light-primary_background dark:bg-[#000]">
          <div
            className={`w-full xl:container mx-auto px-2 flex flex-col lg:flex-row gap-spacing min-h-[calc(100vh-76px)] h-full`}
          >
            <div
              className={`flex-shrink-0 w-full lg:w-80 lg:pl-0 lg:pr-4 flex flex-col gap-spacing`}
            >
              <div className="card p-4">
                <h1 className="text-2xl font-semibold text-light-paragraph_color dark:text-dark-paragraph_color">
                  User Settings
                </h1>
              </div>

              <div className="card py-2">
                <ul>
                  <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:bg-light-border_primary dark:hover:bg-dark-border_secondary text-light-paragraph_color dark:text-dark-paragraph_color">
                    PROFILE
                  </li>
                  <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:bg-light-border_primary dark:hover:bg-dark-border_secondary text-light-paragraph_color dark:text-dark-paragraph_color">
                    EMAIL NOTIFICATIONS
                  </li>
                  <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:bg-light-border_primary dark:hover:bg-dark-border_secondary text-light-paragraph_color dark:text-dark-paragraph_color">
                    MANAGE BLOGS
                  </li>
                  <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:bg-light-border_primary dark:hover:bg-dark-border_secondary text-light-paragraph_color dark:text-dark-paragraph_color">
                    DEVELOPER
                  </li>
                  <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:bg-light-border_primary dark:hover:bg-dark-border_secondary text-light-paragraph_color dark:text-dark-paragraph_color">
                    ACCOUNT
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1">
              <div className="card flex-row flex-wrap gap-xlspacing p-6">
                <Basic
                  loading={loading}
                  allfields={allfields}
                  details={details}
                  submit={submit}
                  setDetails={setDetails}
                />

                <Social
                  allfields={allfields}
                  details={details}
                  setDetails={setDetails}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;

export const getServerSideProps = async (ctx) => {
  let user = null;
  const token = ctx.req.cookies.token;

  if (token) {
    const {
      data: { getUser: data },
    } = await client.query({
      query: GET_USER,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    user = data.user;
  }

  return {
    props: {
      user,
    },
  };
};
