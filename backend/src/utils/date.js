import { GRACE_MINUTES } from "../config/.env";

export function getServerDay(timestamp = Date.now()) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 10);
}

export function isWithinGraceWindow(timestamp) {
  const date = new Date(timestamp);
  return date.getHours() === 0 && date.getMinutes() <= GRACE_MINUTES;
}

export function isSunday(dateStr) {
  return new Date(dateStr).getDay() === 0;
}