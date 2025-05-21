import { useState } from "react";

const FolderStructure = ({ explorer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (explorer.isFolder) setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        //   backgroundColor: "#f5f5f5",
          padding: "4px 8px",
          borderRadius: "4px",
          marginBottom: "4px",
        }}
      >
        <span>
          {explorer.isFolder ? "📁" : "📄"} {explorer.name}
        </span>
        {explorer.isFolder && (
          <span>
            <button style={{ marginLeft: 4 }}>Folder ➕</button>
            <button style={{ marginLeft: 4 }}>File ➕</button>
          </span>
        )}
      </div>

      {isOpen && explorer.items.map((item) => (
        <FolderStructure key={item.id} explorer={item} />
      ))}
    </div>
  );
};

export default FolderStructure;
