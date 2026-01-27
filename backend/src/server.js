import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import habitRoutes from "./routes/habits.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.use("/habits", habitRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});