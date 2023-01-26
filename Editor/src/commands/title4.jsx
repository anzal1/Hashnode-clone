import * as React from "react";
import { insertAtLineStart } from "../utils/InsertTextAtPosition";

export const title4 = {
  name: "title4",
  keyCommand: "title4",
  shortcuts: "ctrlcmd+4",
  value: "title4",
  buttonProps: {
    "aria-label": "Insert title4 (ctrl + 4)",
    title: "Insert title4 (ctrl + 4)",
  },
  icon: <div style={{ fontSize: 14, textAlign: "left" }}>Title 4</div>,
  execute: (state, api) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("#### ");
    } else {
      insertAtLineStart("#### ", state.selection.start, api.textArea);
    }
  },
};
