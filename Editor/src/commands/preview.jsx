import * as React from "react";

export const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  shortcuts: "ctrlcmd+9",
  buttonProps: {
    "aria-label": "Preview code (ctrl + 9)",
    title: "Preview code (ctrl + 9)",
  },
  icon: (
    <svg viewBox="0 0 576 512">
      <path
        fill="currentColor"
        d="M288 288a64 64 0 000-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 01-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0064 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 96a128 128 0 11-128 128A128.14 128.14 0 01288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 01129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 00320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 01544 256c-50.53 98.69-148.64 160-256 160z"
      ></path>
    </svg>
  ),
  execute: (state, api, dispatch, executeCommandState, shortcuts) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ ...state, preview: true });
    }
  },
};

export const codeWrite = {
  name: "write",
  keyCommand: "write",
  value: "write",
  shortcuts: "ctrlcmd+7",
  buttonProps: {
    "aria-label": "Edit code (ctrl + 7)",
    title: "Edit code (ctrl + 7)",
  },
  icon: (
    <svg viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"
      ></path>
    </svg>
  ),
  execute: (state, api, dispatch, executeCommandState, shortcuts) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ ...state, preview: false });
    }
  },
};

// export const codeLive = {
//   name: "live",
//   keyCommand: "preview",
//   value: "live",
//   shortcuts: "ctrlcmd+8",
//   buttonProps: {
//     "aria-label": "Live code (ctrl + 8)",
//     title: "Live code (ctrl + 8)",
//   },
//   icon: (
//     <svg width="12" height="12" viewBox="0 0 520 520">
//       <polygon
//         fill="currentColor"
//         points="0 71.293 0 122 179 122 179 397 0 397 0 449.707 232 449.413 232 71.293"
//       />
//       <polygon
//         fill="currentColor"
//         points="289 71.293 520 71.293 520 122 341 123 341 396 520 396 520 449.707 289 449.413"
//       />
//     </svg>
//   ),
//   execute: (state, api, dispatch, executeCommandState, shortcuts) => {
//     api.textArea.focus();
//     if (shortcuts && dispatch && executeCommandState) {
//       dispatch({ preview: "live" });
//     }
//   },
// };
