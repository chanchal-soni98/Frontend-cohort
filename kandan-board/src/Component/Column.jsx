import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ columnId, title, tasks, onAddTask, onUpdateTaskTitle }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAddTask(input);
      setInput('');
    }
  };

  return (
    <div style={{ margin: '0 10px', width: '300px' }}>
      <h3>{title} ({tasks.length})</h3>
      {columnId === 'todo' && (
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: '#f4f4f4',
              minHeight: '300px',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            {tasks.map((task, index) => (
              <Card
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                onUpdateTitle={onUpdateTaskTitle}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;