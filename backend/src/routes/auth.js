import express from "express";

const router = express.Router();

// TEMP in-memory user (later replace with DB)
const USERS = [
  { id: 1, username: "persistent_warrior", password: "test123" }
];

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // store user id in cookie
  res.cookie("userId", user.id, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.json({
    user: {
      id: user.id,
      username: user.username
    }
  });
});

// ME (restore session)
router.get("/me", (req, res) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ user: null });
  }

  const user = USERS.find(u => u.id === Number(userId));

  if (!user) {
    return res.status(401).json({ user: null });
  }

  res.json({
    user: {
      id: user.id,
      username: user.username
    }
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("userId");
  res.json({ message: "Logged out" });
});

export default router;