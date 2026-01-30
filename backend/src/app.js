import express from "express";
import cors from "cors";

import habitRoutes from "./routes/habits.routes.js";
import pomodoroRoutes from "./routes/pomodoro.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/habits", habitRoutes);
app.use("/pomodoro", pomodoroRoutes);

export default app;