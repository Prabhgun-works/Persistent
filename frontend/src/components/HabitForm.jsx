import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHabit } from "../context/HabitContext";

export default function HabitForm() {
  const [taskName, setTaskName] = useState("");
  const [dailyTarget, setDailyTarget] = useState(2);
  const navigate = useNavigate();
  const { setActiveHabit } = useHabit();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habit = {
      taskName,
      dailyTarget,
      totalDays: 30,
      milestones: 5,
      sundayTarget: 1
    };

    await fetch("http://localhost:5050/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit)
    });

    setActiveHabit(habit);
    navigate("/pomodoro");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Create Habit</h2>

      <input
        placeholder="What are you showing up for?"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />

      <select
        value={dailyTarget}
        onChange={(e) => setDailyTarget(+e.target.value)}
      >
        <option value={2}>2 Pomodoros / day</option>
        <option value={3}>3 Pomodoros / day</option>
        <option value={4}>4 Pomodoros / day</option>
      </select>

      <button type="submit">Start Showing Up</button>
    </form>
  );
}