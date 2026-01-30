/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export function HabitProvider({ children }) {
  const [activeHabit, setActiveHabit] = useState(null);
  const [stats, setStats] = useState(null);

  const completePomodoro = async () => {
    if (!activeHabit) return;

    const res = await fetch("http://localhost:5050/pomodoro/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        habit: activeHabit,
        timestamp: Date.now()
      })
    });

    const data = await res.json();
    setStats(data.stats);
  };

  return (
    <HabitContext.Provider
      value={{
        activeHabit,
        setActiveHabit,
        stats,
        completePomodoro
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export const useHabit = () => useContext(HabitContext);