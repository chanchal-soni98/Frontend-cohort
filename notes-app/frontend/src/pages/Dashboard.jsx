import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchNotes() {
      try {
        const res = await fetch("http://localhost:5000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        } else {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError("Failed to fetch notes");
          }
        }
      } catch {
        setError("Network error");
      }
    }
    fetchNotes();
  }, [token, navigate]);

  async function handleAddNote(e) {
    e.preventDefault();
    setError("");
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const newNote = await res.json();
        setNotes(prev => [...prev, newNote]);
        setTitle("");
        setContent("");
      } else {
        setError("Failed to add note");
      }
    } catch {
      setError("Network error");
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setNotes(prev => prev.filter(note => note.id !== id));
      } else {
        setError("Failed to delete note");
      }
    } catch {
      setError("Network error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Add Note</h3>
      <form onSubmit={handleAddNote}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Add Note</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Your Notes</h3>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <b>{note.title}</b> <br />
            {note.content} <br />
            <button onClick={() => handleDelete(note.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
