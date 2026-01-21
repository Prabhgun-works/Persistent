import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const Duration = .1;
  const DAILY_TARGET = 2;

  const totalSeconds = Duration * 60;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [focusSecondsToday, setFocusSecondsToday] = useState(0);

  const intervalRef = useRef(null);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(totalSeconds);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCompletedPomodoros((c) => c + 1);
          setFocusSecondsToday((t) => t + totalSeconds);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning,totalSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <h1>{formatTime(timeLeft)}</h1>

      <div className="timer-buttons">
        <button onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Statistics */}
      <div className="stats">
        <p>
          <strong>Pomodoros Today:</strong>{" "}
          {completedPomodoros} / {DAILY_TARGET}
        </p>

        <p>
          <strong>Focus Time:</strong>{" "}
          {Math.floor(focusSecondsToday / 60)} minutes
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {completedPomodoros >= DAILY_TARGET
            ? "Goal completed 🎯"
            : "In progress"}
        </p>
      </div>
    </div>
  );
}