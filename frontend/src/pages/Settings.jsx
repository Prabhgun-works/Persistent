import { useState } from "react";

export default function Settings() {
  const [dailyPomodoros, setDailyPomodoros] = useState(2);
  const [theme, setTheme] = useState("dark");

  return (
    <div className="settings">
      <h2>Settings</h2>

      <section>
        <label>Daily focus goal</label>
        <select
          value={dailyPomodoros}
          onChange={(e) => setDailyPomodoros(+e.target.value)}
        >
          <option value={1}>1 Pomodoro</option>
          <option value={2}>2 Pomodoros</option>
          <option value={3}>3 Pomodoros</option>
          <option value={4}>4 Pomodoros</option>
        </select>
        <p className="hint">
          You can always do more — this is just the minimum.
        </p>
      </section>

      <section>
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="dark">Dark (default)</option>
          <option value="light">Light</option>
        </select>
      </section>

      <section>
        <label>
          <input type="checkbox" defaultChecked />
          Sunday concession enabled
        </label>
      </section>
    </div>
  );
}