import React from "react";

export function reducer(state, action) {
  return { ...state, ...action };
}

export const EditorContext = React.createContext({ markdown: "" });
