import express from "express";
import { recordPomodoro } from "../services/pomodoro.Service.js";
import { updateStreak } from "../services/streak.Service.js";
import requireAuth from "../middlewares/requireAuth.js";
import { getDayKey } from "../utils/date.utils.js";
const router = express.Router();

router.post("/complete", requireAuth, (req, res) => {
  const { habitId, timestamp } = req.body;
  const userId = req.user.id;

  const dailyLog = recordPomodoro({
    userId,
    habitId,
    timestamp
  });

  const stats = updateStreak(dailyLog);

  res.json({ dailyLog, stats });
});

export default router;