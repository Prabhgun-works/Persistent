import express from "express";
import { saveHabit } from "../services/habit.Service.js";

const router = express.Router();

router.post("/", (req, res) => {
  const habit = saveHabit(req.body);
  res.status(201).json(habit);
});

export default router;