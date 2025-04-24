import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, index, columnId, onUpdateTitle }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleBlur = () => {
    setEditing(false);
    onUpdateTitle(columnId, task.id, value);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: '10px',
            margin: '5px 0',
            background: 'white',
            borderRadius: '4px',
            ...provided.draggableProps.style
          }}
          onDoubleClick={() => setEditing(true)}
        >
          {editing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span>{task.title}</span>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;