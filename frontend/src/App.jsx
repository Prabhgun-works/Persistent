import { useState } from "react";
import HabitForm from "./components/HabitForm";
import Timer from "./components/PomoTimer";
import './styles/global.css';
export default function App() {
  const [habitConfig, setHabitConfig] = useState(null);

  return (
    <div>
      {!habitConfig ? (
        <HabitForm onSubmit={setHabitConfig} />
      ) : (
        <Timer habit={habitConfig} />
      )}
    </div>
  );
}