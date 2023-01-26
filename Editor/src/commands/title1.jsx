import React from "react";
import handleReverse from "../utils/handleReverse";
import { insertAtLineStart } from "../utils/InsertTextAtPosition";

export const title1 = {
  name: "title1",
  keyCommand: "title1",
  shortcuts: "ctrlcmd+1",
  value: "title1",
  buttonProps: {
    "aria-label": "Insert title1 (ctrl + 1)",
    title: "Insert title1 (ctrl + 1)",
  },
  icon: <div style={{ fontSize: 18, textAlign: "left" }}>Title 1</div>,
  execute: (state, api) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      if (handleReverse(/^# .*$/, api, state, 1)) {
        return;
      }
      api.replaceSelection("# ");
    } else {
      insertAtLineStart("# ", state.selection.start, api.textArea);
    }
  },
};
