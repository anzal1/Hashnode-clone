import { useContext } from "react";
import { getCommands, getExtraCommands } from "../commands";
import { EditorContext } from "../Context";

const Toolbar = ({ preview }) => {
  console.log({ preview });
  const { dispatch, commandOrchestrator } = useContext(EditorContext);

  const handler = (command) => {
    if (command.keyCommand === "preview") {
      dispatch({ preview: true });
    } else if (command.keyCommand === "write") {
      dispatch({ preview: false });
    }
    commandOrchestrator && commandOrchestrator.executeCommand(command);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-3 border-y px-2 py-[0.5rem] dark:border-[#2a354d] border-gray-400">
      <div className="flex gap-4">
        {getExtraCommands().map((command) => {
          return (
            <button
              className={`editor-state-btn py-1 font-semibold text-md flex items-center gap-2
                ${
                  command.keyCommand === "preview"
                    ? preview
                      ? "text-blue"
                      : "text-gray-800 dark:text-gray-200"
                    : !preview
                    ? "text-blue"
                    : "text-gray-800 dark:text-gray-200"
                }
                `}
              title={command.buttonProps.title}
              key={command.name}
              onClick={() => handler(command)}
            >
              {command.icon}
              {command.name.substring(0, 1).toUpperCase() +
                command.name.slice(1, command.name.length)}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        {getCommands().map((command) => {
          return command.keyCommand !== "divider" ? (
            <button
              className={
                "iconBtn py-1 text-gray-600 dark:text-gray-200 font-semibold"
              }
              title={command.buttonProps.title}
              key={command.name}
              onClick={() => handler(command)}
            >
              {command.icon}
            </button>
          ) : (
            <div className="w-[1px] bg-gray-600 dark:bg-gray-400 mx-1"></div>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
