import path from "path";
import { readJSON, writeJSON } from "../utils/fileStore.js";

const statsFile = path.resolve("src/store/stats.json");

export function updateStreak(dailyLog) {
  const stats = readJSON(statsFile, {
    currentStreak: 0,
    totalDaysCompleted: 0
  });

  if (dailyLog.completed >= dailyLog.target) {
    stats.currentStreak += 1;
    stats.totalDaysCompleted += 1;
  }

  writeJSON(statsFile, stats);
  return stats;
}