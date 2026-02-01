/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check session on page refresh
  useEffect(() => {
    fetch("http://localhost:5050/auth/me", {
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const login = async (username, password) => {
    const res = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    setUser(data);
  };

  const signup = async (username, password) => {
    await fetch("http://localhost:5050/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  };

  const logout = async () => {
    await fetch("http://localhost:5050/auth/logout", {
      credentials: "include"
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);