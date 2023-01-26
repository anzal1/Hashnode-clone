import { useContext, useEffect, useState } from "react";
import client from "utils/helpers/config/apollo-client";
import { getSinglePostBySlug, GET_USER_STATUS } from "utils/helpers/gql/query";
import { Context } from "utils/context/main";
import Link from "next/link";
import { getDate, readingTime } from "utils/helpers/miniFunctions";
import { useMutation } from "@apollo/client";
import { getCookie } from "cookies-next";
import LikeBar from "components/Story/LikeBar";
import Content from "components/Story/Content";
import PostComment from "components/Story/PostComment";
import SinglePostHeader from "components/Header/SinglePostHeader";
import Head from "next/head";
import { LIKE_POST } from "utils/helpers/gql/mutation";
import Footer from "components/common/Footer";

const SinglePost = ({ user, data }) => {
  const [likeData, setLikeData] = useState(data?.data || []);
  const [LikePost, { data: likeResponse, error }] = useMutation(LIKE_POST);
  const { setUser, setToast } = useContext(Context);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    setToast({
      msg: error,
    });
  }, [error]);

  useEffect(() => {
    if (likeResponse) {
      if (likeResponse.likePost.success) {
        setToast({
          msg: likeResponse.likePost.message,
          status: true,
          type: "success",
        });
        setLikeData({ likes: likeResponse.likePost.updated });
      } else {
        setToast({
          msg: likeResponse.likePost.message,
          status: true,
          type: "error",
        });
        setLikeData({ likes: likeResponse.likePost.updated });
      }
    }
  }, [likeResponse]);

  const likePost = async (e) => {
    try {
      const token = getCookie("token");

      if (token) {
        await LikePost({
          variables: {
            input: {
              post: data.data._id,
              like: e,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
      } else {
        setToast({
          msg: "Login to like",
          status: true,
          type: "error",
        });
      }
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
        <title>{data?.data?.title} - Hashnode</title>
      </Head>

      <div className="w-full min-h-screen bg-light-primary_background dark:bg-dark-primary_background">
        <SinglePostHeader details={data.data.user} user={user} />

        <div className="w-full xl:container mx-auto px-2 pb-10 lg:py-10 min-h-[calc(100vh-76px)] h-full">
          {data.data.cover_image.url && (
            <img
              src={data.data.cover_image.url}
              className="object-cover rounded-lg w-full md:w-11/12 lg:w-9/12 h-[40vh] md:h-[30vh] min-h-[20rem] lg:h-[37rem] mx-auto mb-10 md:mb-20"
              alt=""
            />
          )}

          <h1
            className={`${
              !data.data.cover_image?.url && "mt-10"
            } text-center text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-black dark:text-white font-bold mb-6 max-w-[70rem] mx-auto`}
          >
            {data.data.title}
          </h1>

          {data.data.subtitle && (
            <p className="text-light-paragraph_color text-center dark:text-dark-paragraph_color font-medium text-2xl mb-8 max-w-3xl mx-auto">
              {data.data.subtitle}
            </p>
          )}

          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center mb-10 text-light-paragraph_color dark:text-dark-paragraph_color">
            <Link href={`/@${data.data.user.username}`}>
              <div className="cursor-pointer flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-10 h-10">
                  <img
                    src={data.data.user.profile_photo.url}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-semibold">
                  {data.data.user.name}
                </h3>
              </div>
            </Link>

            <span className="hidden md:block mx-2">·</span>

            <div className="flex items-center gap-4">
              <h3 className="text-lg md:text-xl font-medium">
                {getDate(data.data.createdAt)}
              </h3>

              <span>·</span>

              <h3 className="text-lg md:text-xl font-medium">
                {readingTime(data.data.content)} min read
              </h3>
            </div>
          </div>

          <div className="single-post-grid">
            <Content content={data.data.content} tags={data.data.tags} />

            <LikeBar
              details={data.data}
              likeData={likeData}
              user={user}
              likePost={likePost}
              commentsCount={data.data.commentsCount}
            />
          </div>

          <PostComment data={data.data} />
        </div>
      </div>

      <Footer user={data.data.user.name} />
    </>
  );
};

export default SinglePost;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;
    const { slug, username } = ctx.query;

    if (token) {
      let data = client.query({
        query: GET_USER_STATUS,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      let post = client.query({
        query: getSinglePostBySlug,
        variables: {
          input: {
            slug,
            user: username,
          },
        },
      });

      data = await data;
      post = await post;

      user = data.data.getUser.user;

      if (post.data.getPostBySlug.success) {
        return {
          props: {
            user: data.data.getUser.user,
            data: post.data.getPostBySlug,
          },
        };
      } else {
        return {
          props: {},
          redirect: {
            destination: "/",
          },
        };
      }
    }

    let post = client.query({
      query: getSinglePostBySlug,
      variables: {
        input: {
          slug,
          user: username,
        },
      },
    });

    post = await post;

    if (post.data.getPostBySlug.success) {
      return {
        props: {
          user,
          data: post.data.getPostBySlug,
        },
      };
    } else {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
};
