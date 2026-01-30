import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // restore session on refresh
    fetch("http://localhost:5050/auth/me", {
      credentials: "include",
    })
      .then(res => res.ok && res.json())
      .then(data => data && setUser(data.user));
  }, []);

  const login = async (payload) => {
    const res = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch("http://localhost:5050/auth/logout", {
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);