import { useState, useContext } from "react";
import { DEFAULT_ICON_SIZE, DEFAULT_PROFILE_SIZE } from "utils/constant";
import Image from "next/image";
import { Context } from "utils/context/main";
import Send from "public/icons/send";
import { useMutation } from "@apollo/client";
import { PUBLISH_COMMENT } from "utils/helpers/gql/mutation";
import { getCookie } from "cookies-next";
import Editor from "./../../Editor/src/Editor";

const CommentModel = ({ details, setDetails, setCommentModelState }) => {
  const { user, setToast } = useContext(Context);
  const [value, setValue] = useState("");
  const [publishComment] = useMutation(PUBLISH_COMMENT);
  const [loading, setLoading] = useState(false);

  const comment = async () => {
    console.log({ value });
    try {
      setLoading(true);
      const token = getCookie("token");

      if (token) {
        const { data } = await publishComment({
          variables: {
            input: {
              post: details._id,
              comment: value,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        if (data.commentOnPost.success) {
          setToast({
            msg: data.commentOnPost.message,
            status: true,
            type: "success",
          });

          setDetails({ ...details, ...data.commentOnPost.data });
        }
      } else {
        setToast({
          msg: "Login to comment",
          status: true,
          type: "error",
        });
      }
      setCommentModelState(false);
    } catch (error) {
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <section className="card p-4 max-w-[60rem] mx-auto">
      <header className="flex items-center gap-2 mb-4">
        <Image
          src={user?.profile_photo.url}
          width={DEFAULT_PROFILE_SIZE}
          height={DEFAULT_PROFILE_SIZE}
          className="rounded-full object-cover"
        />
        <p className="text-[#111] dark:text-dark-heading_color text-lg font-semibold">
          {user?.username}
        </p>
      </header>

      <section className="post-comment-section">
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
        />

        <div className="flex w-full justify-end mt-4">
          <button
            disabled={loading}
            className={`btn-primary rounded-full ${
              loading ? "cursor-not-allowed opacity-60" : ""
            }`}
            onClick={comment}
          >
            <span>
              <Send
                w={DEFAULT_ICON_SIZE}
                h={DEFAULT_ICON_SIZE}
                className="fill-white"
              />
            </span>
            <span>Send</span>
          </button>
        </div>
      </section>
    </section>
  );
};

export default CommentModel;
