import fs from "fs";
import path from "path";

export function readJSON(filePath, defaultValue = []) {
  if (!fs.existsSync(filePath)) return defaultValue;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}