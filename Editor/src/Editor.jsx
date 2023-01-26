import { useReducer, useRef, useEffect } from "react";
import { TextAreaCommandOrchestrator } from "./commands";
import handleKeyDown from "./components/handleKeyDown";
import shortcutsHandle from "./components/shortcuts";
import { EditorContext, reducer } from "./Context";
import { getCommands, getExtraCommands } from "./commands";
import Toolbar from "./components/Toolbar";
import Preview from "./components/Preview";
import Textarea from "./components/Textarea";

const Editor = ({
  value,
  defaultTabEnable = false,
  preview = false,
  onChange,
  tabSize = 2,
}) => {
  // const textRef = useRef(null);
  const commands = getCommands();
  const extraCmds = getExtraCommands();
  const [state, dispatch] = useReducer(reducer, {
    markdown: value,
    defaultTabEnable,
    commands: commands,
    extraCommands: extraCmds,
    preview: false,
  });

  // const executeRef = useRef();
  // const statesRef = useRef({ preview });

  // useEffect(() => {
  //   statesRef.current = { preview };
  // }, [preview]);

  // useEffect(() => {
  //   if (textRef.current && dispatch) {
  //     const commandOrchestrator = new TextAreaCommandOrchestrator(
  //       textRef.current
  //     );
  //     executeRef.current = commandOrchestrator;
  //     dispatch({ textarea: textRef.current, commandOrchestrator });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const onKeyDown = (e) => {
  //   handleKeyDown(e, tabSize, defaultTabEnable);
  //   shortcutsHandle(
  //     e,
  //     [...(commands || []), ...(extraCmds || [])],
  //     executeRef.current,
  //     dispatch,
  //     statesRef.current
  //   );
  // };
  // useEffect(() => {
  //     if (textRef.current) {
  //       textRef.current.addEventListener("keydown", onKeyDown);
  //     }
  //     return () => {
  //       if (textRef.current) {
  //         // eslint-disable-next-line react-hooks/exhaustive-deps
  //         textRef.current.removeEventListener("keydown", onKeyDown);
  //       }
  //     };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      <div className="w-full">
        <Toolbar preview={state.preview} />

        {state.preview ? (
          <Preview markdown={state.markdown} />
        ) : (
          <Textarea
            onChange={(evn) => {
              onChange && onChange(evn.target.value, evn, state);
              // if (textareaProps && textareaProps.onChange) {
              //   textareaProps.onChange(evn);
              // }
            }}
          />
          // <textarea
          //   autoComplete="off"
          //   autoCorrect="off"
          //   autoCapitalize="off"
          //   spellCheck={false}
          //   ref={textRef}
          //   placeholder={"Tell your story..."}
          //   value={state.markdown}
          //   className="w-full bg-transparent outline-none py-6 text-editor"
          //   onChange={(e) => {
          //     dispatch && dispatch({ markdown: e.target.value });
          //     onChange && onChange(e);
          //   }}
          // />
        )}
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
