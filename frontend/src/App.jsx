import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitForm from "./components/HabitForm";
import PomoDoro from "./components/PomoTimer";
import "./styles/global.css";
import ClickSpark from './ui/cursor';
import Dash from "./pages/Dash";
  

export default function App() {
  return (

<ClickSpark
  sparkColor='#0d0c0cc1'
  sparkSize={12}
  sparkRadius={15}
  sparkCount={6}
  duration={300}
>
  {<BrowserRouter>
      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pomodoro" element={<PomoDoro />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>}
</ClickSpark>
  );
}