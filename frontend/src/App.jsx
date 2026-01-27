import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitForm from "./HabitForm";
import PomoDoro from "./PomoDoro";
import "./global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HabitForm />} />
        <Route path="/pomodoro" element={<PomoDoro />} />
      </Routes>
    </BrowserRouter>
  );
}