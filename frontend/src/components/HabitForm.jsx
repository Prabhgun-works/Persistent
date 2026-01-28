import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HabitForm() {
  const [taskName, setTaskName] = useState("");
  const [dailyTarget, setDailyTarget] = useState(2);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habit = {
      taskName,
      dailyTarget,
      startDate: Date.now(),
    };

    await fetch("http://localhost:5050/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit),
    });

    navigate("/pomodoro", { state: habit });
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2>Create Habit</h2>

      <input
        placeholder="Task name"
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

      <button type="submit">Start Focus</button>
    </form>
  );
}