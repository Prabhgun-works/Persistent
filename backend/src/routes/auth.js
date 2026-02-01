import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const USERS_FILE = path.resolve("src/data/users.json");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = {
    id: Date.now().toString(),
    username,
    password
  };

  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Signup successful" });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.cookie("userId", user.id, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.json({ id: user.id, username: user.username });
});
router.get("/me", (req, res) => {
  const { userId } = req.cookies;
  if (!userId) return res.status(401).json({ message: "Not logged in" });

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const user = users.find(u => u.id === userId);

  if (!user) return res.status(401).json({ message: "Invalid session" });

  res.json({ id: user.id, username: user.username });
});
export default router;