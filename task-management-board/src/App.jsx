import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [allTasks, setAllTasks] = useState([]); 
  const [tasks, setTasks] = useState([]);     
  const [catFilter, setCatFilter] = useState('');

  const handletask = (e) => {
    e.preventDefault();
    let newTask = {
      id: Date.now(),
      title,
      category,
      complete: false,
    };
    const updatedTasks = [...allTasks, newTask];
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
    setTitle('');
    setCategory('');
  };

  const handleComplete = (id) => {
    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setAllTasks(updated);
    applyFilter(catFilter, updated); 
  };

  const handleDelete = (id) => {
    const remaining = allTasks.filter((task) => task.id !== id);
    setAllTasks(remaining);
    applyFilter(catFilter, remaining);
  };

  const handleClear = () => {
    setAllTasks([]);
    setTasks([]);
  };

  const RemainingTask = () => {
    return allTasks.reduce((acc, curr) => (!curr.complete ? acc + 1 : acc), 0);
  };

  const handleFilter = (e) => {
    const input = e.target.value;
    setCatFilter(input);
    applyFilter(input, allTasks);
  };

  const applyFilter = (input, taskList) => {
    if (input.trim() === '') {
      setTasks(taskList); 
    } else {
      const filtered = taskList.filter((task) =>
        task.category.toLowerCase().includes(input.toLowerCase())
      );
      setTasks(filtered);
    }
  };

  return (
    <>
      <h1>Task Management Board</h1>
      <h2>Remaining: {RemainingTask()}</h2>

      <div>
        <input
          value={catFilter}
          onChange={handleFilter}
          placeholder="Filter by Category"
        />
      </div>

      <button onClick={handleClear}>Clear All</button>

      <form onSubmit={handletask}>
        <div style={{ margin: '10px' }}>
          <input
            value={title}
            placeholder="Enter your title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
          </select>
        </div>
        <button style={{ margin: '10px' }} type="submit">
          Submit
        </button>
      </form>

      <h1>Task List</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks.map((item) => (
          <div style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }} key={item.id}>
            <p
              style={{
                textDecoration: item.complete ? 'line-through' : 'none',
                color: item.complete && '#999'
              }}
            >
              {item.title}
            </p>
            <p>{item.category}</p>
            <div>
              <input
                type="checkbox"
                checked={item.complete}
                onChange={() => handleComplete(item.id)}
              />
              <label>{item.complete ? 'Completed' : 'Pending'}</label>
            </div>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
