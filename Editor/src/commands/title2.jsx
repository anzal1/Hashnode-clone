import * as React from "react";
import { insertAtLineStart } from "../utils/InsertTextAtPosition";

export const title2 = {
  name: "title2",
  keyCommand: "title2",
  shortcuts: "ctrlcmd+2",
  value: "title2",
  buttonProps: {
    "aria-label": "Insert title2 (ctrl + 2)",
    title: "Insert title2 (ctrl + 2)",
  },
  icon: <div style={{ fontSize: 16, textAlign: "left" }}>Title 2</div>,
  execute: (state, api) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("## ");
    } else {
      insertAtLineStart("## ", state.selection.start, api.textArea);
    }
  },
};
