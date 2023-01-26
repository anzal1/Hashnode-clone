import React from "react";

const CardLoading = () => {
  return (
    <div className="card border-0 border-b-2 rounded-none px-4 mb-spacing">
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full bg-light-border_primary dark:bg-dark-border_primary"></div>
        <div className="w-full">
          <div className="w-2/12 mb-2 h-4 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
          <div className="w-2/12 h-4 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="py-4 w-full h-full">
          <div className="w-6/12 mb-4 h-6 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
          <div className="w-10/12 mb-2 h-4 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
          <div className="w-10/12 mb-2 h-4 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
          <div className="w-10/12 mb-2 h-4 rounded-md bg-light-border_primary dark:bg-dark-border_primary"></div>
        </div>
        <div className="w-[250px] h-[100px] bg-light-border_primary dark:bg-dark-border_primary rounded-md"></div>
      </div>
    </div>
  );
};

export default CardLoading;
