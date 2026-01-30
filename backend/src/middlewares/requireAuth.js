export default function requireAuth(req, res, next) {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  req.user = { id: Number(userId) };
  next();
}
