import path from "path";
import { readJSON, writeJSON } from "../utils/fileStore.js";
import { getServerDay, isSunday } from "../utils/date.js"

const logsFile = path.resolve("src/store/dailyLogs.json");

export function recordPomodoro({ habit, timestamp }) {
  const day = getServerDay(timestamp);
  const logs = readJSON(logsFile);

  let entry = logs.find(l => l.date === day);

  const target = isSunday(day)
    ? habit.sundayTarget
    : habit.dailyTarget;

  if (!entry) {
    entry = {
      date: day,
      completed: 0,
      overtime: 0,
      target
    };
    logs.push(entry);
  }

  if (entry.completed < target) {
    entry.completed += 1;
  } else {
    entry.overtime += 1;
  }

  writeJSON(logsFile, logs);
  return entry;
}