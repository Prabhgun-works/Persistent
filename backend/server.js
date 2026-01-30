import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.js";
import habitRoutes from "./src/routes/habits.js";
import pomodoroRoutes from "./src/routes/pomodoro.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/habits", habitRoutes);
app.use("/pomodoro", pomodoroRoutes);

app.listen(5050, () => {
  console.log("Server running on port 5050");
});