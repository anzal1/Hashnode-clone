import { insertTextAtPosition } from "../utils/InsertTextAtPosition";
import { bold } from "./bold";
import { code, codeBlock } from "./code";
import { comment } from "./comment";
import { divider } from "./divider";
// import { fullscreen } from "./fullscreen";
import { group } from "./group";
import { hr } from "./hr";
import { image } from "./image";
import { italic } from "./italic";
import { link } from "./link";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
} from "./list";
import { codeWrite, codePreview } from "./preview"; // removed codeLive function
import { quote } from "./quote";
import { strikethrough } from "./strikeThrough";
import { title } from "./title";
import { title1 } from "./title1";
import { title2 } from "./title2";
import { title3 } from "./title3";
import { title4 } from "./title4";
import { title5 } from "./title5";
import { title6 } from "./title6";

const getCommands = () => [
  bold,
  italic,
  strikethrough,
  hr,
  group([title1, title2, title3, title4, title5, title6], {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title", title: "Insert title" },
  }),
  divider,
  link,
  quote,
  code,
  codeBlock,
  comment,
  image,
  divider,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
];

const getExtraCommands = () => [codeWrite, codePreview];

function getStateFromTextArea(textArea) {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd,
    },
    text: textArea.value,
    selectedText: textArea.value?.slice(
      textArea.selectionStart,
      textArea.selectionEnd
    ),
  };
}

class TextAreaTextApi {
  textArea;

  constructor(textArea) {
    this.textArea = textArea;
  }

  /**
   * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
   * selection start and selection end will be the same and will both point to the end
   * @param text Text that should replace the current selection
   */
  replaceSelection(text) {
    insertTextAtPosition(this.textArea, text);
    return getStateFromTextArea(this.textArea);
  }

  /**
   * Selects the specified text range
   * @param selection
   */
  setSelectionRange(selection) {
    this.textArea.focus();
    this.textArea.selectionStart = selection.start;
    this.textArea.selectionEnd = selection.end;
    return getStateFromTextArea(this.textArea);
  }
}

class TextAreaCommandOrchestrator {
  textArea;
  textApi;

  constructor(textArea) {
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  getState() {
    if (!this.textArea) return false;
    return getStateFromTextArea(this.textArea);
  }

  executeCommand(command, dispatch, state, shortcuts) {
    command.execute &&
      command.execute(
        getStateFromTextArea(this.textArea),
        this.textApi,
        dispatch,
        state,
        shortcuts
      );
  }
}

export {
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  bold,
  codeBlock,
  italic,
  strikethrough,
  hr,
  group,
  divider,
  link,
  quote,
  code,
  image,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  codeWrite,
  // codeLive,
  codePreview,
  // fullscreen,
  // Tool method.
  getCommands,
  getExtraCommands,
  getStateFromTextArea,
  TextAreaCommandOrchestrator,
  TextAreaTextApi,
};
