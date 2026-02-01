import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import PomoDoro from "./components/PomoTimer";
import "./styles/global.css";
import ClickSpark from './ui/cursor';
import Settings from "./pages/Settings";
import Dash from "./pages/Dash";
import { useAuth } from "./context/AuthContext";
  

export default function App() {
   const { user } = useAuth();
  return (

<ClickSpark
  sparkColor='#0d0c0cc1'
  sparkSize={12}
  sparkRadius={15}
  sparkCount={6}
  duration={300}
>
  {<>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={user ? <Dash /> : <Navigate to="/login" />} />
      <Route path="/pomodoro" element={user ? <PomoDoro /> : <Navigate to="/login" />} />
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
    </Routes>
    </>}
</ClickSpark>
  );
}