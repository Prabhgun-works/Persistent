import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { HabitProvider } from "./context/HabitContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <HabitProvider>
        <ThemeProvider>
        <App />
      </ThemeProvider>
      </HabitProvider>
    </AuthProvider>
  </BrowserRouter>
);