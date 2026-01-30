import { useEffect } from "react";

const CHARS = "P#E-R$S@I+S%T*E!N<T?";

export default function useScrambleText(ref, finalText) {
  useEffect(() => {
    let frame = 0;
    const totalFrames = 50;      // ~5 seconds
    const settleStart = 50;      // scramble for ~3 seconds

    const interval = setInterval(() => {
      const text = finalText
        .split("")
        .map((char, i) => {
          if (frame > settleStart && i < (frame - settleStart) / 2) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (ref.current) ref.current.textContent = text;

      frame++;
      if (frame >= totalFrames) {
        if (ref.current) ref.current.textContent = finalText;
        clearInterval(interval);
      }
    }, 8); // ~60fps

    return () => clearInterval(interval);
  }, [ref, finalText]);
}