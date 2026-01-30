import { useHabit } from "../contexts/HabitContext";

export default function Streaks() {
  const { stats } = useHabit();

  if (!stats) return null;

  return (
    <div className="stats">
      <p>🔥 Current streak: {stats.currentStreak}</p>
      <p>🏆 Longest streak: {stats.longestStreak ?? stats.currentStreak}</p>
      <p>⏱ Total focus minutes: {stats.totalMinutes ?? 0}</p>
      <p>🎯 Next milestone: Day {stats.nextMilestoneDay}</p>
    </div>
  );
}