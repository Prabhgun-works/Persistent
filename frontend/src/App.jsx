import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitForm from "./components/HabitForm";
import PomoDoro from "./components/PomoTimer";
import "./styles/global.css";
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