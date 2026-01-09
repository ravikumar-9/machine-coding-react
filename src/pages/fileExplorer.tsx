import { useState } from "react";
import explorer from "../data/folderData";
import Folder from "../components/Folder";
import useTraverseHook from "../hooks/useTraverseHook";
import React from "react";

const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseHook();

  const handleInsertNode = (
    item: string,
    isFolder: boolean,
    folderId: string
  ) => {
    const latestData = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(latestData);
  };

  return (
    <div>
      <Folder explorerData={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
};

export default FileExplorer;
