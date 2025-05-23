import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const FolderStructure = ({ explorer, level = 0, handleInsert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState({ visible: false, isFolder: null });

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() === "button") return;
    if (explorer.isFolder) setIsOpen(!isOpen);
  };

  const onAdd = (isFolder) => {
    setShowInput({ visible: true, isFolder });
  };

  const onSubmit = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsert(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ visible: false, isFolder: null });
      setIsOpen(true);
    }
  };

  return (
    <div style={{ marginLeft: level * 10 }}>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "4px",
          marginBottom: "4px",
          backgroundColor: isOpen ? "#f0f0f0" : "transparent",
        }}
      >
        <span>{explorer.isFolder ? "📁" : "📄"} {explorer.name}</span>

        {explorer.isFolder && (
          <span>
            <button onClick={() => onAdd(true)}>Folder <FaPlus /></button>
            <button onClick={() => onAdd(false)}>File <FaPlus /></button>
          </span>
        )}
      </div>

      {showInput.visible && (
        <div style={{ marginLeft: 16 }}>
          <span>{showInput.isFolder ? "📁" : "📄"}</span>
          <input style={{padding: "4px", marginLeft: "8px"}}
            type="text"
            autoFocus
            onKeyDown={onSubmit}
            onBlur={() => setShowInput({ visible: false, isFolder: null })}
            placeholder={`Enter ${showInput.isFolder ? "folder" : "file"} name`}
          />
        </div>
      )}

      {isOpen && explorer.items?.map((item) => (
        <FolderStructure
          key={item.id}
          explorer={item}
          level={level + 1}
          handleInsert={handleInsert}
        />
      ))}
    </div>
  );
};

export default FolderStructure;
