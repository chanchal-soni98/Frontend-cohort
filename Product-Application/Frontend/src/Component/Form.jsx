import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending", // Default status
    dueDate: "",
  });
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const fetchTasks = async () => {
    try {
      const response = await axios("http://localhost:3000/getTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {  // handling post and put request if it exists then update it otherwise create a new one
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/updateTask/${editId}`, formData);
        alert("Product updated successfully");
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/task", formData);
        alert("Product added successfully");
      }

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
      fetchTasks(); // Refresh task list after add/update
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteTask/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate.slice(0, 10),
    });
    setEditId(task._id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const styles = {
    formContainer: {
      minWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "16px",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      textAlign: "left",
      marginBottom: "6px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#333",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
      color: "#333",
      backgroundColor: "white",
    },
    select: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
      color: "#333",
      backgroundColor: "white",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };
  const cellStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h1 style={styles.heading}>{editId ? "Edit Product" : "Add Product"}</h1>

        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Product Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product title"
            style={styles.input}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Product Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter product description"
            style={styles.input}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="status" style={styles.label}>Product Status</label>
          <select
            id="status"
            style={styles.select}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dueDate" style={styles.label}>Product Due Date</label>
          <input
            type="date"
            id="dueDate"
            style={styles.input}
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Product List</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Due Date</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td style={cellStyle}>{task.title}</td>
                <td style={cellStyle}>{task.description}</td>
                <td style={cellStyle}>{task.status}</td>
                <td style={cellStyle}>{task.dueDate?.slice(0, 10)}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(task)} style={{ marginRight: "10px", backgroundColor: '#007bff', color: 'white' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task._id)} style={{backgroundColor:'red'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};



export default Form;
