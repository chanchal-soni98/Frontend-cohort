import { useState } from 'react'
import './App.css'

function Todo() {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(true);

  const [todos, setTodo] = useState([]);
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!isEditing){
      const newTodo = {'id': Math.random() ,'title': title, 'name': name};
      setTodo([...todos,newTodo]);
      
    }else{
      const updated = todos.map((todo)=> 
      todo.id==editId ? {...todo,name,title} : todo)
      setTodo(updated);
      setIsEditing(false);
      setEditId('')
    }
    setName('');
      setTitle('');
    
  }

  const deleteHandler = (id) =>{
    let temp = todos.filter((todo)=> todo.id!=id);
    setTodo(temp)
  }

  const editHandler = (id) =>{
    let todoEdit = todos.find(todo => todo.id==id);
    setName(todoEdit.name);
    setTitle(todoEdit.title)
    setIsEditing(true);
    setEditId(id)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p><input placeholder='Enter Title' value={title} onChange={(e)=> setTitle(e.target.value)}/></p>
        <p><input placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)}/></p>
        <button type='submit'>Submit</button>
      </form>

      {todos.map((todo)=> (
         <div key={todo.id}>
          <h1>My Todo</h1>
          <p>{todo.id}</p>
          <h2>{todo.name}</h2>
          <h2>{todo.title}</h2>
          <button onClick={()=> deleteHandler(todo.id)}>Delete</button>
          <button onClick={()=> editHandler(todo.id)}>Edit</button>
        </div>
      ))}
    </>
  )
}

export default Todo
