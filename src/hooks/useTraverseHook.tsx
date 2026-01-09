import type { ExplorerProps } from "../types";

const useTraverseHook = () => {
  const insertNode = function (
    tree: ExplorerProps,
    folderId: string,
    item: string,
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().toTimeString(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    console.log(latestNode);
    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

export default useTraverseHook;
