const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const authenticate = require("../middleware/authenticate");

const NOTES_FILE = "./data/notes.json";

const readNotes = async () => {
  try {
    const data = await fs.readFile(NOTES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeNotes = async (notes) => {
  await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
};

router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ message: "Title and content are required" });

  const newNote = {
    id: uuidv4(),
    title,
    content,
    userId: req.user.userId,
    createdAt: new Date().toISOString(),
  };

  const notes = await readNotes();
  notes.push(newNote);
  await writeNotes(notes);

  res.status(201).json({ message: "Note created", note: newNote });
});

router.get("/", authenticate, async (req, res) => {
  const notes = await readNotes();
  const userNotes = notes.filter((note) => note.userId === req.user.userId);
  res.json(userNotes);
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const notes = await readNotes();
  const note = notes.find((n) => n.id === id);

  if (!note)
    return res.status(404).json({ message: "Note not found" });

  if (note.userId !== req.user.userId)
    return res.status(403).json({ message: "Not allowed to delete this note" });

  const updatedNotes = notes.filter((n) => n.id !== id);
  await writeNotes(updatedNotes);

  res.json({ message: "Note deleted" });
});

module.exports = router;
