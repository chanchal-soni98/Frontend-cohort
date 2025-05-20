const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const USERS_FILE = "./data/users.json";
const JWT_SECRET = "zxcvbnm";

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const users = await readUsers();
  const existingUser = users.find((user) => user.username === username);

  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const users = await readUsers();
  const user = users.find((u) => u.username === username);

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
