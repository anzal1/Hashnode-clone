import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Context } from "utils/context/main";
import { UPLOAD_QUERY } from "utils/helpers/gql/mutation";
import { UploadImage } from "utils/helpers/miniFunctions";

const Basic = ({ allfields, details, setDetails, submit, loading }) => {
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadImage] = useMutation(UPLOAD_QUERY);

  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImage] = useMutation(UPLOAD_QUERY);

  const { setToast } = useContext(Context);

  useEffect(() => {
    if (uploadedFile?.url) {
      setDetails((prev) => ({ ...prev, profile_photo: uploadedFile }));
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (coverImageFile?.url) {
      setDetails((prev) => ({ ...prev, cover_image: coverImageFile }));
    }
  }, [coverImageFile]);

  const handleFileChange = async (
    e,
    uploadFunction,
    setLoading,
    setFile,
    setToast
  ) => {
    try {
      const types = [
        "image/png",
        "image/webp",
        "image/jpg",
        "iamge/jpeg",
        "image/jfif",
      ];

      const fileType = e.target.files[0].type;

      if (!types.includes(fileType)) {
        return setToast({
          msg: "File Type unsuppported",
          status: true,
          type: "info",
        });
      }

      await UploadImage(e, uploadFunction, setLoading, setFile, setToast);
    } catch (error) {
      setToast({
        msg: "Error uploading",
        status: true,
        type: "error",
      });
    }
  };
  return (
    <div className="w-full md:w-[calc(100%/2-16px)]">
      <h1 className="text-2xl font-semibold text-black dark:text-dark-heading_color">
        Basic Info
      </h1>

      {allfields.basic.map((field) => {
        return (
          <div className="my-4" key={field._id}>
            <label
              htmlFor={field._id}
              className="block mb-1 text-light-paragraph_color dark:text-dark-paragraph_color"
            >
              {field.label}
            </label>
            {field.type === "INPUT" ? (
              <input
                type="text"
                id={field._id}
                name={field.name}
                autoComplete={"off"}
                placeholder={field.placeholder}
                value={details[field.name] || ""}
                disabled={field.disabled || false}
                onChange={(e) => {
                  field.onChange(e, details, setDetails);
                }}
                data-isnested={field.path}
                className={`input ${
                  field.disabled
                    ? "text-light-paragraph_color dark:text-dark-paragraph_color"
                    : ""
                }`}
              />
            ) : field.type === "TEXTAREA" ? (
              <textarea
                id={field._id}
                name={field.name}
                value={details[field.name] || ""}
                placeholder={field.placeholder}
                onChange={field.onChange}
                className="textarea"
                data-isnested={field.path}
              />
            ) : field.name === "profile_photo" ? (
              details.profile_photo.url ? (
                fileUploading ? (
                  <>
                    <label
                      htmlFor={field._id}
                      className="rounded-full w-44 h-44 flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                    >
                      <div className="">Uploading...</div>
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          uploadImage,
                          setFileUploading,

                          setUploadedFile,

                          setToast
                        )
                      }
                      id={field._id}
                      hidden
                    />
                    <label htmlFor={field._id}>
                      <Image
                        src={details.profile_photo.url}
                        width={146}
                        height={146}
                        alt="Profile image"
                        className="rounded-full object-cover"
                      />
                    </label>
                  </>
                )
              ) : (
                <>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        uploadImage,
                        setFileUploading,
                        setUploadedFile,
                        setToast
                      )
                    }
                    id={field._id}
                    hidden
                  />
                  <label
                    htmlFor={field._id}
                    className="rounded-full w-44 h-44 flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                  >
                    <div className="">Upload Profile</div>
                  </label>
                </>
              )
            ) : details.cover_image.url ? (
              coverImageUploading ? (
                <>
                  <label
                    htmlFor={field._id}
                    className="rounded-md w-full h-[350px] flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                  >
                    <div className="">Uploading...</div>
                  </label>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        coverImage,
                        setCoverImageUploading,
                        setCoverImageFile,
                        setToast
                      )
                    }
                    id={field._id}
                    hidden
                  />
                  <label
                    htmlFor={field._id}
                    className="rounded-md w-full h-[350px] flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                  >
                    <img
                      src={details.cover_image.url}
                      alt="Cover image"
                      className="rounded-md object-cover w-full h-full"
                    />
                  </label>
                </>
              )
            ) : (
              <>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      coverImage,
                      setCoverImageUploading,
                      null,
                      setCoverImageFile,
                      null,
                      setToast
                    )
                  }
                  id={field._id}
                  hidden
                />
                <label
                  htmlFor={field._id}
                  className="rounded-md w-full h-[350px] flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                >
                  <div className="">Upload Cover</div>
                </label>
              </>
            )}
          </div>
        );
      })}

      <h1 className="text-2xl mt-10 font-semibold text-black dark:text-dark-heading_color">
        About you
      </h1>
      {allfields.about.map((field) => {
        return (
          <div className="my-4" key={field._id}>
            <label htmlFor={field._id} className="block mb-1">
              {field.label}
            </label>
            {field.type === "INPUT" ? (
              <input
                id={field._id}
                type="text"
                value={
                  field.path
                    ? details[field.path][field.name] || ""
                    : details[field.name] || ""
                }
                name={field.name}
                placeholder={field.placeholder}
                className="input"
                onChange={field.onChange}
                data-isnested={field.path}
              />
            ) : (
              field.type === "TEXTAREA" && (
                <textarea
                  id={field._id}
                  value={
                    field.path
                      ? details[field.path][field.name]
                      : details[field.name] || ""
                  }
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                  className="textarea"
                  data-isnested={field.path}
                />
              )
            )}
          </div>
        );
      })}

      <button
        disabled={loading}
        onClick={submit}
        className={`btn-tertiary rounded-full ${
          loading ? "cursor-not-allowed opacity-25" : ""
        }`}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default Basic;
