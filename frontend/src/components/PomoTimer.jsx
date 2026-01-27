import { useEffect, useState } from "react";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function Pomodoro({ habit }) {
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    if (!running) return;

    const timer = setTimeout(() => { //Eslint screams of state update solved 
      setSeconds((prev) => {
        if (prev === 1) {
          setRunning(false);

          if (!isBreak) {
            setCompletedPomodoros((c) => c + 1);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [running, isBreak]);

  const startPause = () => setRunning(!running);

  const reset = () => {
    setRunning(false);
    setSeconds(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const startBreak = () => {
    setIsBreak(true);
    setSeconds(BREAK_TIME);
    setRunning(false);
  };

  const backToWork = () => {
    setIsBreak(false);
    setSeconds(WORK_TIME);
    setRunning(false);
  };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>{habit?.habitName}</h2>
      <h1>{format(seconds)}</h1>

      <button onClick={startPause}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={reset}>Reset</button>

      {!isBreak ? (
        <button onClick={startBreak}>Break</button>
      ) : (
        <button onClick={backToWork}>Work</button>
      )}

      <p>Completed Pomodoros: {completedPomodoros}</p>
    </div>
  );
}