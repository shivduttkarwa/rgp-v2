import { useEffect, useRef, useState } from "react";
import "./Preloader.css";

interface PreloaderProps {
  onComplete?: () => void;
}

const STAGES = [
  { target: 30,  speed: 18 },
  { target: 55,  speed: 22 },
  { target: 75,  speed: 16 },
  { target: 90,  speed: 20 },
  { target: 100, speed: 14 },
];

const PARTICLE_COLORS = ["#f5d67b", "#d4a84b", "#b8860b", "#ffd700", "#e6c35c"];

export default function Preloader({ onComplete }: PreloaderProps) {
  const particlesRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [rising, setRising] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Create particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 24; i++) {
      const el = document.createElement("div");
      el.className = "preloader-particle";
      const size = Math.random() * 3 + 1;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = Math.random() * 100 + "%";
      el.style.animationDelay = Math.random() * 3 + "s";
      el.style.animationDuration = Math.random() * 2 + 2.5 + "s";
      el.style.background =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      container.appendChild(el);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  // Progress + curtain trigger
  useEffect(() => {
    let progress = 0;
    let currentStage = 0;
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout>;

    function update() {
      if (cancelled) return;

      if (currentStage >= STAGES.length) {
        onComplete?.();
        timerId = setTimeout(() => {
          if (cancelled) return;
          setRising(true);
          setTimeout(() => setHidden(true), 750);
        }, 120);
        return;
      }

      const stage = STAGES[currentStage];

      if (progress < stage.target) {
        progress += Math.random() * 3 + 1;
        if (progress > stage.target) progress = stage.target;
        if (barRef.current) barRef.current.style.width = progress + "%";
        timerId = setTimeout(update, stage.speed + Math.random() * 20);
      } else {
        currentStage++;
        timerId = setTimeout(update, 80 + Math.random() * 120);
      }
    }

    timerId = setTimeout(update, 400);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`preloader${rising ? " preloader--rising" : ""}`} aria-hidden="true">
      {/* Corner decorations */}
      <div className="preloader-corner preloader-corner-tl" />
      <div className="preloader-corner preloader-corner-tr" />
      <div className="preloader-corner preloader-corner-bl" />
      <div className="preloader-corner preloader-corner-br" />

      {/* Floating particles */}
      <div className="preloader-particles" ref={particlesRef} />

      {/* Logo ring + animated house */}
      <div className="preloader-logo-container">
        <div className="preloader-outer-ring" />
        <div className="preloader-inner-ring" />
        <div className="preloader-dashed-ring" />

        <div className="preloader-diamond" />
        <div className="preloader-diamond" />
        <div className="preloader-diamond" />
        <div className="preloader-diamond" />

        <div className="preloader-house-icon">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#f5d67b" />
                <stop offset="50%"  stopColor="#d4a84b" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
              <linearGradient id="goldGradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#f5d67b" />
                <stop offset="100%" stopColor="#d4a84b" />
              </linearGradient>
            </defs>

            <path className="house-fill" d="M40 12 L12 35 L12 68 L68 68 L68 35 Z" />

            <path className="house-path" d="M8 38 L40 10 L72 38"          style={{ animationDelay: "0s" }} />
            <path className="house-path" d="M56 20 L56 14 L63 14 L63 26"  style={{ animationDelay: "0.3s" }} />
            <path className="house-path" d="M16 35 L16 68"                 style={{ animationDelay: "0.5s" }} />
            <path className="house-path" d="M64 35 L64 68"                 style={{ animationDelay: "0.5s" }} />
            <path className="house-path" d="M16 68 L64 68"                 style={{ animationDelay: "0.7s" }} />
            <path className="house-path" d="M33 68 L33 46 L47 46 L47 68"  style={{ animationDelay: "1s" }} />
            <circle className="house-path" cx="44" cy="57" r="1.5"         style={{ animationDelay: "1.3s", fill: "#d4a84b" }} />
            <path className="house-path" d="M20 42 L20 54 L30 54 L30 42 Z" style={{ animationDelay: "1.1s" }} />
            <path className="house-path" d="M25 42 L25 54"                 style={{ animationDelay: "1.3s" }} />
            <path className="house-path" d="M20 48 L30 48"                 style={{ animationDelay: "1.3s" }} />
            <path className="house-path" d="M50 42 L50 54 L60 54 L60 42 Z" style={{ animationDelay: "1.1s" }} />
            <path className="house-path" d="M55 42 L55 54"                 style={{ animationDelay: "1.3s" }} />
            <path className="house-path" d="M50 48 L60 48"                 style={{ animationDelay: "1.3s" }} />

            <path className="key-path" d="M37 72 L43 72" />
          </svg>
        </div>
      </div>

      {/* Progress */}
      <div className="preloader-progress">
        <div className="preloader-bar-wrapper">
          <div className="preloader-bar" ref={barRef} />
        </div>
        <div className="preloader-loading-text">
          Loading<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}
