import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../Redux/todoSlice';

const Todo = () => {
    const todos = useSelector((state)=> state.todo.todos);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [title, setTitle]= useState('');

    const add = () =>{
      dispatch(addTodo({title, name}));
      setTitle('');
      setName('');
    }
    const edit = (id) =>{
      const newTitle = prompt("Enter new title");
      const newName = prompt("Enter new name");
      if (newTitle && newName) {
        dispatch(editTodo({id, title: newTitle, name: newName}));
      }
    }

  return (
    <div>
        <h1>Todo List</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={add}>Submit</button>

        <h1>Todo Item</h1>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h2>Title: {todo.title}</h2>
            <p>Name: {todo.name}</p>
            <button onClick={() => dispatch(deleteTodo({id: todo.id}))}>Delete</button>
            <button onClick={()=> edit(todo.id)}>Edit</button>
          </div>
        ))}
    </div>
  )
}

export default Todo