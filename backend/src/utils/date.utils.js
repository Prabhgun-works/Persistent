// Normalize any timestamp into a YYYY-MM-DD key
export function getDayKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}