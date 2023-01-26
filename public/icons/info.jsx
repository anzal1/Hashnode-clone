import React from "react";

const Info = ({ w = 10, h = 10, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={{ width: w, height: h }}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
};

export default Info;
