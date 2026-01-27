import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filePath = path.resolve("src/store/habits.json");

router.post("/", (req, res) => {
  const habit = req.body;

  const data = JSON.parse(fs.readFileSync(filePath));
  data.push({
    ...habit,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Habit saved" });
});

router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

export default router;