import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import LightRays from "../ui/background";
import Dock from "../ui/dock";
import HabitForm from "../components/HabitForm";

import { FaUser, FaFireFlameCurved } from "react-icons/fa6";
import { RiTimerFlashLine } from "react-icons/ri";
import { VscSettingsGear } from "react-icons/vsc";

import { useAuth } from "../context/AuthContext";
import { useHabit } from "../context/HabitContext";

import useScrambleText from "../hooks/scram";
import "../styles/global.css";

const Dash = () => {
  const { user } = useAuth();
  const { activeHabit } = useHabit();
  const navigate = useNavigate();

  const headingRef = useRef(null);
  useScrambleText(
    headingRef,
    "Persistent. Not about doing more. About showing up."
  );

  const items = [
    {
      icon: <FaUser size={18} />,
      label: "Profile",
      onClick: () => navigate(user ? "/profile" : "/login"),
    },
    {
      icon: <RiTimerFlashLine size={18} />,
      label: "Pomodoro",
      onClick: () => navigate("/pomodoro"),
    },
    {
      icon: <FaFireFlameCurved size={18} />,
      label: "Streaks",
      onClick: () => navigate("/streaks"),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="page">
      {/* Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={0.9}
        lightSpread={1.1}
        rayLength={3}
        distortion={0}
        noiseAmount={0}
        pulsating={false}
        fadeDistance={1.3}
        saturation={1.1}
        className="custom-rays"
      />

      <img src="/logo.png" alt="Persistent Logo" className="logo" />

      <div className="layout">
        <div className="hero">
          <h1 ref={headingRef} />
          <p>
            A system built for consistency — not intensity.
            <br />
            Build habits. Focus deeply. Let progress track itself.
          </p>
        </div>

        {/* Core UX decision */}
        <div className="habit-section">
          {!activeHabit ? (
            <HabitForm />
          ) : (
            <p className="continue-text">Continue your habit 🚀</p>
          )}
        </div>

        <Dock
          items={items}
          panelHeight={62}
          baseItemSize={58}
          magnification={64}
        />
      </div>
    </div>
  );
};

export default Dash;