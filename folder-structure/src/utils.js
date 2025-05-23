export const insertNode = (tree, folderId, itemName, isFolder) => {
  if (tree.id === folderId && tree.isFolder) {
    tree.items = [
      ...tree.items,
      {
        id: Date.now(),
        name: itemName,
        isFolder,
        items: isFolder ? [] : undefined,
      },
    ];
    return tree;
  }

  tree.items = tree.items?.map(item =>
    item.isFolder ? insertNode(item, folderId, itemName, isFolder) : item
  );

  return tree;
};
