import React, { useRef } from "react";
import LightRays from "../ui/background";
import Dock from "../ui/dock";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa6";
import { RiTimerFlashLine } from "react-icons/ri";
import { FaFireFlameCurved } from "react-icons/fa6";
import { VscSettingsGear } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/global.css";
import useScrambleText from "../hooks/scram.jsx";

const Dash = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const headingRef = useRef(null);

  useScrambleText(
    headingRef,
    "Persistent. Not about doing more. About showing up."
  );

  return (
    <div className="page">
      {/* background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={0.9}
        lightSpread={1.1}
        rayLength={3}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1.3}
        saturation={1.1}
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
