import React from "react";

const Correct = ({ w = 10, h = 10, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={{ width: w, height: h }}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
    </svg>
  );
};

export default Correct;
