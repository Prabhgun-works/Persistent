import express from "express";
import fs from "fs";

const router = express.Router();

// resolve path relative to THIS file
const filePath = new URL("../store/habits.json", import.meta.url);

// helper
function readHabits() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeHabits(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all habits
router.get("/", (req, res) => {
  const habits = readHabits();
  res.json(habits);
});

// POST new habit
router.post("/", (req, res) => {
  const habits = readHabits();

  const newHabit = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  habits.push(newHabit);
  writeHabits(habits);

  res.status(201).json(newHabit);
});

export default router;