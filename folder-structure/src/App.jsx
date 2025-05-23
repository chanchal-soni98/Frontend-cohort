import { useState } from "react";
import explorerData from "./data/explorer";
import FolderStructure from "./components/FolderStructure";
import { insertNode } from "./utils";

const App = () => {
  const [explorer, setExplorer] = useState(explorerData);

  const handleInsert = (folderId, itemName, isFolder) => {
    const updatedTree = insertNode({ ...explorer }, folderId, itemName, isFolder);
    setExplorer(updatedTree);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 VS Code Folder Structure</h2>
      <FolderStructure explorer={explorer} handleInsert={handleInsert} />
    </div>
  );
};

export default App;
