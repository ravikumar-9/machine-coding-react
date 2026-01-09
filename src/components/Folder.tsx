import { File, FolderIcon, FolderOpen, Plus } from "lucide-react";
import type { ExplorerProps, showInputProps } from "../types";
import { useState } from "react";

const Folder = (props: {
  explorerData: ExplorerProps;
  handleInsertNode: any;
}) => {
  const { explorerData, handleInsertNode } = props;
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState<showInputProps>({
    isVisible: false,
    isFolder: null,
  });

  const handleAddFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.target.value !== "") {
      handleInsertNode(e.target.value, showInput.isFolder, explorerData.id);
      setShowInput({ isVisible: false, isFolder: null });
    }
  };

  if (explorerData?.isFolder) {
    return (
      <div className="my-2 mx-2">
        <div
          className={`rounded-md px-3 py-2 w-fit flex items-center gap-2 cursor-pointer hover:bg-slate-200 ${
            expand ? "bg-blue-50" : "bg-gray-100"
          }`}
          onClick={() => setExpand(!expand)}
        >
          <div className="flex items-center gap-2">
            {expand ? <FolderOpen className="text-blue-400" /> : <FolderIcon />}
            {explorerData?.name}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 border border-slate-400 rounded-md px-2 py-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({
                  isVisible: true,
                  isFolder: true,
                });
              }}
            >
              <Plus className="h-3 w-3" />
              <FolderIcon className="h-3 w-3" />
            </button>
            <button
              className="flex items-center gap-1 border border-slate-400 rounded-md px-2 py-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({
                  isVisible: true,
                  isFolder: false,
                });
              }}
            >
              <Plus className="h-3 w-3" />
              <File className="h-3 w-3" />
            </button>
          </div>
        </div>
        {showInput?.isVisible && (
          <div className="flex items-center gap-2 w-fit bg-blue-50 px-2 py-2 my-2">
            {showInput?.isFolder ? <FolderIcon /> : <File />}
            <input
              className="border rounded-md border-slate-300 outline-0 px-2 py-1 focus:border-blue-300"
              autoFocus
              onKeyDown={(e) => handleAddFile(e)}
              onBlur={() => setShowInput({ isFolder: null, isVisible: false })}
            />
          </div>
        )}
        <div className={`${expand ? "block" : "hidden"} pl-12`}>
          {explorerData?.items?.map((exp, index) => (
            <Folder
              key={index}
              explorerData={exp}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <span className="flex items-center gap-2 text-sm bg-gray-100 px-2 py-2 w-56 my-2 mx-2">
        <File />
        {explorerData?.name}
      </span>
    );
  }
};

export default Folder;
