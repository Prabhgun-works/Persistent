import path from "path";
import { readJSON, writeJSON } from "../utils/fileStore.js";

const file = path.resolve("src/store/habits.json");

export function saveHabit(habit) {
  const habits = readJSON(file);

  const milestoneInterval = Math.floor(
    habit.totalDays / habit.milestones
  );

  const milestones = Array.from({ length: habit.milestones }, (_, i) => ({
    day: (i + 1) * milestoneInterval,
    reward: habit.rewards[i]
  }));

  const stored = {
    ...habit,
    id: Date.now(),
    milestones
  };

  habits.push(stored);
  writeJSON(file, habits);

  return stored;
}
