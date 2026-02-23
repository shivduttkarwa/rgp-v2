import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [hidden, setHidden] = useState(false);

  // Keep ref in sync without causing effect re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.documentElement.classList.add("scroll-locked");
    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, []);

  // Progress + curtain — no onComplete in deps, use ref instead
  useEffect(() => {
    let progress = 0;
    let currentStage = 0;
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout>;

    function update() {
      if (cancelled) return;

      if (currentStage >= STAGES.length) {
        // Fire immediately so browser gets 120ms to paint newly-visible content
        // before the curtain animation starts — prevents jank frame during slide
        onCompleteRef.current?.();

        timerId = setTimeout(() => {
          if (cancelled) return;
          const el = preloaderRef.current;
          if (!el) return;

          gsap.to(el, {
            y: "-100%",
            duration: 0.75,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              document.documentElement.classList.remove("scroll-locked");
              setHidden(true);
            },
          });
        }, 120);
        return;
      }

      const stage = STAGES[currentStage];

      if (progress < stage.target) {
        progress += Math.random() * 3 + 1;
        if (progress > stage.target) progress = stage.target;
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
  }, []); // empty deps — onComplete accessed via ref

  if (hidden) return null;

  return (
    <div className="preloader" ref={preloaderRef} aria-hidden="true">
      {/* Corner decorations */}
      <div className="preloader-corner preloader-corner-tl" />
      <div className="preloader-corner preloader-corner-tr" />
      <div className="preloader-corner preloader-corner-bl" />
      <div className="preloader-corner preloader-corner-br" />

      {/* Logo ring + animated house */}
      <div className="preloader-logo-container">
        <div className="preloader-outer-ring" />
        <div className="preloader-inner-ring" />
        <div className="preloader-dashed-ring" />

        <div className="preloader-house-icon">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#fad840" />
                <stop offset="50%"  stopColor="#f9c307" />
                <stop offset="100%" stopColor="#d4a200" />
              </linearGradient>
              <linearGradient id="goldGradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#fad840" />
                <stop offset="100%" stopColor="#f9c307" />
              </linearGradient>
            </defs>

            <path className="house-fill" d="M40 12 L12 35 L12 68 L68 68 L68 35 Z" />

            <path className="house-path" d="M8 38 L40 10 L72 38"          style={{ animationDelay: "0s" }} />
            <path className="house-path" d="M56 20 L56 14 L63 14 L63 26"  style={{ animationDelay: "0.3s" }} />
            <path className="house-path" d="M16 35 L16 68"                 style={{ animationDelay: "0.5s" }} />
            <path className="house-path" d="M64 35 L64 68"                 style={{ animationDelay: "0.5s" }} />
            <path className="house-path" d="M16 68 L64 68"                 style={{ animationDelay: "0.7s" }} />
            <path className="house-path" d="M33 68 L33 46 L47 46 L47 68"  style={{ animationDelay: "1s" }} />
            <circle className="house-path" cx="44" cy="57" r="1.5"         style={{ animationDelay: "1.3s", fill: "#f9c307" }} />
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

    </div>
  );
}
