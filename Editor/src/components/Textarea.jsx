import React, { useContext, useEffect, useRef } from "react";
import { TextAreaCommandOrchestrator } from "../commands";
import { EditorContext } from "../Context";
import handleKeyDown from "./handleKeyDown";
import shortcutsHandle from "./shortcuts";

const Textarea = ({ onChange }) => {
  const { dispatch, markdown, commands, extraCmds, preview } =
    useContext(EditorContext);
  const textRef = useRef(null);
  const executeRef = useRef();
  const statesRef = useRef({ preview });

  useEffect(() => {
    statesRef.current = { preview };
  }, [preview]);

  useEffect(() => {
    if (textRef.current && dispatch) {
      const commandOrchestrator = new TextAreaCommandOrchestrator(
        textRef.current
      );
      executeRef.current = commandOrchestrator;
      dispatch({ textarea: textRef.current, commandOrchestrator });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e) => {
    handleKeyDown(e, 2, false);
    shortcutsHandle(
      e,
      [...(commands || []), ...(extraCmds || [])],
      executeRef.current,
      dispatch,
      statesRef.current
    );
  };
  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener("keydown", onKeyDown);
    }
    return () => {
      if (textRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        textRef.current.removeEventListener("keydown", onKeyDown);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      ref={textRef}
      placeholder={"Tell your story..."}
      value={markdown}
      className="w-full bg-transparent outline-none py-6 text-editor"
      onChange={(e) => {
        dispatch && dispatch({ markdown: e.target.value });
        onChange && onChange(e);
      }}
    />
  );
};

export default Textarea;
