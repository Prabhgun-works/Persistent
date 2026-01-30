import { useEffect, useState } from "react";
import { useHabit } from "../context/HabitContext";

const WORK = 25 * 60;
const BREAK = 5 * 60;

export default function PomoDoro() {
  const { activeHabit, completePomodoro } = useHabit();
  const [seconds, setSeconds] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!running) return;

    const t = setTimeout(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [running, seconds]);

  useEffect(() => {
    
    if (seconds !== 0) return;

    setRunning(false);

    if (!isBreak) {
      completePomodoro(); // 🔥 backend decides streaks
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isBreak]);

  const reset = () => {
    setRunning(false);
    setSeconds(isBreak ? BREAK : WORK);
  };

  const format = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="pomodoro">
      <h2>{activeHabit?.taskName}</h2>
      <h1>{format(seconds)}</h1>

      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => {
          setIsBreak(!isBreak);
          setSeconds(!isBreak ? BREAK : WORK);
        }}>
          {isBreak ? "Work" : "Break"}
        </button>
      </div>
    </div>
  );
}