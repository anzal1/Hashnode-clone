import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Preview = ({ markdown }) => {
  return (
    <div className="text-gray-100 max-h-[500px] overflow-auto markdown-preview">
      <ReactMarkdown
        children={markdown || "No Markdown to show"}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

export default Preview;
