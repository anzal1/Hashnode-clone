import React from "react";

const Italic = ({ w = 10, h = 10, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={{ width: w, height: h }}
      viewBox="0 0 384 512"
    >
      <path d="M384 48c0 8.84-7.2 16-16 16h-83.27L132.1 448H208c8.844 0 16 7.156 16 16s-7.2 16-16 16H16c-8.844 0-16-7.2-16-16s7.156-16 16-16h83.27l152.6-384H176c-8.8 0-16-7.16-16-16s7.2-16 16-16h192c8.8 0 16 7.16 16 16z"></path>
    </svg>
  );
};

export default Italic;
