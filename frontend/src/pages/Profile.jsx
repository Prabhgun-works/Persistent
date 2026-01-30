import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile">
      <h2>@{user.username}</h2>

      <p>🔥 Longest streak: {user.longestStreak}</p>
      <p>⏱ Total focus minutes: {user.totalMinutes}</p>

      <button
        onClick={() =>
          navigator.share?.({
            title: "Persistent",
            text: `I’ve shown up for ${user.longestStreak} days straight 🔥`,
          })
        }
      >
        Share
      </button>
    </div>
  );
}