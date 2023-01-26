import * as React from "react";
import { insertAtLineStart } from "../utils/InsertTextAtPosition";

export const title3 = {
  name: "title3",
  keyCommand: "title3",
  shortcuts: "ctrlcmd+3",
  value: "title3",
  buttonProps: {
    "aria-label": "Insert title3 (ctrl + 3)",
    title: "Insert title3 (ctrl + 3)",
  },
  icon: <div style={{ fontSize: 15, textAlign: "left" }}>Title 3</div>,
  execute: (state, api) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("### ");
    } else {
      insertAtLineStart("### ", state.selection.start, api.textArea);
    }
  },
};
