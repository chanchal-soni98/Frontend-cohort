import React, { useState, useEffect } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

const initialData = {
  todo: [],
  inProgress: [],
  done: []
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kanban'));
      return saved && saved.todo && saved.inProgress && saved.done ? saved : initialData;
    } catch (err) {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = Array.from(tasks[sourceCol]);
    const destTasks = Array.from(tasks[destCol]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceCol]: sourceTasks });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks
      });
    }
  };

  const addTask = (title) => {
    const newTask = { id: Date.now().toString(), title };
    setTasks(prev => ({ ...prev, todo: [newTask, ...prev.todo] }));
  };

  const updateTaskTitle = (columnId, taskId, newTitle) => {
    const updated = tasks[columnId].map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks({ ...tasks, [columnId]: updated });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Column
          columnId="todo"
          title="Todo"
          tasks={tasks.todo}
          onAddTask={addTask}
          onUpdateTaskTitle={updateTaskTitle}
        />
        <Column
          columnId="inProgress"
          title="In Progress"
          tasks={tasks.inProgress}
          onUpdateTaskTitle={updateTaskTitle}
        />
        <Column
          columnId="done"
          title="Done"
          tasks={tasks.done}
          onUpdateTaskTitle={updateTaskTitle}
        />
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;