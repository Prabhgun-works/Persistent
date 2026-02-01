import { useEffect, useState } from "react";
import { useHabit } from "../context/HabitContext";
import "../styles/pomodoro.css";

const WORK = 25 * 60;
const BREAK = 5 * 60;

export default function Pomodoro() {
  const { activeHabit, completePomodoro } = useHabit();

  const [seconds, setSeconds] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  /* ---------- TIMER TICK ---------- */
  useEffect(() => {
    if (!running) return;

    const t = setTimeout(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [running, seconds]);

  /* ---------- SESSION END ---------- */
  useEffect(() => {
    if (seconds !== 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRunning(false);

    // only count streaks if a habit exists
    if (!isBreak && activeHabit) {
      completePomodoro();
    }
  }, [seconds, isBreak, activeHabit, completePomodoro]);

  /* ---------- HELPERS ---------- */
  const reset = () => {
    setRunning(false);
    setSeconds(isBreak ? BREAK : WORK);
  };

  const toggleMode = () => {
    setIsBreak(b => !b);
    setSeconds(!isBreak ? BREAK : WORK);
    setRunning(false);
  };

  const format = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  /* ---------- UI ---------- */
  return (
    <div className={`pomodoro-timer ${running ? "pomodoro-running" : ""}`}>
      
      <p className="habit-label">
        {activeHabit
          ? `Focusing on: ${activeHabit.taskName}`
          : "Free focus session"}
      </p>

      <h1 className="timer">{format(seconds)}</h1>

      <div className="controls">
        <button onClick={() => setRunning(r => !r)}>
          {running ? "Pause" : "Start"}
        </button>

        <button onClick={reset}>Reset</button>

        <button onClick={toggleMode}>
          {isBreak ? "Work" : "Break"}
        </button>
      </div>
    </div>
  );
}