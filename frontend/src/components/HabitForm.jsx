import { useState } from "react";
import Timer from "./PomoTimer";

export default function HabitForm({ onSubmit }) {
  const [habitName, setHabitName] = useState("");
  const [targetDays, setTargetDays] = useState(20);
  const [dailyPomodoros, setDailyPomodoros] = useState(2);
  const [milestones, setMilestones] = useState(4);
  const [rewards, setRewards] = useState([]);
  const [daysOffPerWeek, setDaysOffPerWeek] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRewardsChange = (index, value) => {
    const updated = [...rewards];
    updated[index] = value;
    setRewards(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const habitConfig = {
      habitName,
      startDate: Date.now(),
      targetDays,
      dailyPomodoros,
      milestones,
      rewards,
      daysOffPerWeek,
    };

    onSubmit(habitConfig);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <Timer dailyTarget={dailyPomodoros} />;
  }

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <h2>Create Habit</h2>

      <input
        type="text"
        placeholder="Habit name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
      />

      <input
        type="number"
        min={1}
        placeholder="Target days"
        value={targetDays}
        onChange={(e) => setTargetDays(+e.target.value)}
      />

      <label>
        Daily Pomodoro Goal
        <select
          value={dailyPomodoros}
          onChange={(e) => setDailyPomodoros(+e.target.value)}
        >
          <option value={2}>2 (Balanced)</option>
          <option value={3}>3 (Focused)</option>
          <option value={4}>4 (Intense)</option>
        </select>
      </label>

      <input
        type="number"
        min={1}
        placeholder="Number of milestones"
        value={milestones}
        onChange={(e) => setMilestones(+e.target.value)}
      />

      <label>
        Days off per week
        <select
          value={daysOffPerWeek}
          onChange={(e) => setDaysOffPerWeek(+e.target.value)}
        >
          <option value={0}>None</option>
          <option value={1}>1 day</option>
          <option value={2}>2 days</option>
        </select>
      </label>

      <h4>Rewards</h4>
      {[...Array(milestones)].map((_, i) => (
        <input
          key={i}
          placeholder={`Reward for milestone ${i + 1}`}
          value={rewards[i] || ""}
          onChange={(e) => handleRewardsChange(i, e.target.value)}
        />
      ))}

      <button type="submit">Start Habit</button>
    </form>
  );
}