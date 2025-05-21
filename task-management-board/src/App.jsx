import { useState } from 'react'


function App() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  // const [complete, setComplete] = useState(false)
  const [tasks, setTask] = useState([]);

  const handletask = (e) => {
    e.preventDefault();
    let newTask = {
      id: Date.now(),
      title,
      category,
      complete: false
    }
    setTask([...tasks,newTask]);
    setTitle('');
    setCategory('')
  }

  const handleComplete = (id) =>{
    const completeTask = tasks.map((task)=> task.id==id ? {...task, 'complete': !task.complete} : task);
    // setComplete(true)
    setTask(completeTask)

  }

  const handleDelete = (id) =>{
    const remainingData = tasks.filter((task)=> task.id!=id);
    setTask(remainingData);
  }

  const handleClear = ()=>{
    setTask([]);
  }
  const RemainingTask = () =>{
    return tasks.reduce((acc,curr)=>{
    if(!curr.complete){
      acc++
    }
    return acc;
    },0);
  }
  
  return (
    <>
      <h1>Task Management Board</h1>
      <h2>Remaining: {RemainingTask()}</h2>
      <button onClick={()=>{handleClear()}}>Clear All</button>
      <form onSubmit={handletask}>
        <div style={{margin: '10px'}}><input value={title} placeholder='Enter your title' onChange={(e)=> setTitle(e.target.value)}/></div>
        <div style={{margin: '10px'}}><select value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
        </select></div>
        <button style={{margin: '10px'}} type='submit'>Submit</button>
      </form>
      <h1>Task List</h1>
      <div style={{display: 'flex'}}>
        {tasks.map((item)=>(
        <div style={{margin: '10px'}} key={item.id}>
          <p style={{textDecoration: item.complete ? 'line-through' : 'none', color: item.complete && '#999'}} >{item.title}</p>
          <p>{item.category}</p>
          <div>{<input type='checkbox' checked={item.complete} onChange={()=>handleComplete(item.id)}/>} <label>{item.complete? 'Completed': 'Pending'}</label></div>
          <button onClick={()=> handleDelete(item.id)}>Delete</button>
        </div>
      ))}
      </div>
      
    </>
  )
}

export default App
