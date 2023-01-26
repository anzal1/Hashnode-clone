import React from "react";

const Bold = ({ w = 10, h = 10, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={{ width: w, height: h }}
      viewBox="0 0 384 512"
    >
      <path d="M314.7 251.7c32.1-21.6 53.3-58.2 53.3-99.7 0-66.16-53.8-120-120-120H16C7.156 32 0 39.16 0 48s7.156 16 16 16h16v384H16c-8.844 0-16 7.2-16 16s7.156 16 16 16h248c66.17 0 120-53.84 120-120 0-48-28.5-89.2-69.3-108.3zM64 64h184c48.53 0 88 39.47 88 88s-39.5 88-88 88H64V64zm200 384H64V272h200c48.53 0 88 39.47 88 88s-39.5 88-88 88z"></path>
    </svg>
  );
};

export default Bold;
