import { useEffect, useRef } from "react";
import BtnSecondary from "../components/BtnSecondary";
import HeroSection from "../sections/HeroSection";
import PropertyMarqee from "../components/reusable/PropertyMarqee";
import Timeline from "../sections/Timeline";
import "./AboutPage.css";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const img = (name: string) => `${base}images/${name}`;

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLHeadingElement | null>(null);
  const introMaxProgressRef = useRef(0);

  useEffect(() => {
    const cleanup = initGsapSwitchAnimations(pageRef.current);
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = introRef.current;
    if (!el || el.dataset.linesSplit === "true") return;
    el.dataset.linesSplit = "true";

    const fragment = document.createDocumentFragment();
    const nodes = Array.from(el.childNodes);

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "intro-word";
            span.textContent = part;
            fragment.appendChild(span);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName.toLowerCase() === "br") {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }
        const text = element.textContent || "";
        const span = document.createElement("span");
        const isGold = element.classList.contains("gold-word");
        span.className = isGold ? "intro-word gold-word" : "intro-word";
        span.textContent = text;
        fragment.appendChild(span);
      }
    });

    el.innerHTML = "";
    el.appendChild(fragment);

    const words = Array.from(el.querySelectorAll<HTMLElement>(".intro-word"));
    if (!words.length) return;

    // Group words by rendered line (supports responsive line wrapping).
    const lines: HTMLElement[][] = [];
    let currentTop: number | null = null;
    let lineWords: HTMLElement[] = [];

    words.forEach((word) => {
      const top = word.offsetTop;
      if (currentTop === null) currentTop = top;
      if (Math.abs(top - currentTop) > 2) {
        lines.push(lineWords);
        lineWords = [];
        currentTop = top;
      }
      lineWords.push(word);
    });
    if (lineWords.length) lines.push(lineWords);

    el.innerHTML = "";
    lines.forEach((line) => {
      const lineWrap = document.createElement("span");
      lineWrap.className = "intro-line";
      const lineText = document.createElement("span");
      lineText.className = "intro-line-text";
      lineWrap.appendChild(lineText);
      line.forEach((word, i) => {
        lineText.appendChild(word);
        if (i < line.length - 1) {
          lineText.appendChild(document.createTextNode(" "));
        }
      });
      el.appendChild(lineWrap);
    });

    const lineTexts = el.querySelectorAll<HTMLElement>(".intro-line-text");
    gsap.set(lineTexts, { yPercent: 100, autoAlpha: 0 });
    const tl = gsap.to(lineTexts, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      paused: true,
    });

    introMaxProgressRef.current = 0;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 35%",
      scrub: true,
      onUpdate: (self) => {
        const next = Math.max(self.progress, introMaxProgressRef.current);
        introMaxProgressRef.current = next;
        tl.progress(next);
        if (next >= 1) {
          tl.progress(1);
          self.kill();
        }
      },
    });
  }, []);

  return (
    <>
      <HeroSection
        showVideo={false}
        showCta={false}
        bgImage="images/hero1.jpg"
        titleLine1={
          <>
            Crafted For <span className="rg-gold">Life</span>
          </>
        }
        titleLine2={
          <>
            Designed To <span className="rg-amber">Endure</span>
          </>
        }
        subtitle="Real Gold Properties curates refined residences across Australia — quiet luxury, timeless materials, and spaces that grow with the people who live in them."
      />
      <main className="about-page" ref={pageRef}>
        {/* 2) STATEMENT */}
        <section className="section section-spacious">
          <div className="container center stack">
            <h2 className="intro-statement lead" ref={introRef}>
              Within Australia’s most <span className="gold-word">admired</span>{" "}
              enclaves, Real Gold Properties curates a{" "}
              <span className="gold-word">refined</span> portfolio of bespoke
              residences and <span className="gold-word">private estates</span>.
            </h2>
          </div>
        </section>

        {/* 3) GREEN SPLIT */}
        <section className="split-green">
          <div className="container">
            <div className="wrap">
              <div className="img-card">
                <img alt="Coastal residence" src={img("ps1 (6).jpg")} />
              </div>
              <div className="stack">
                <h3 className="h-serif">
                  More Beautiful Than
                  <br />
                  You Expect
                </h3>
                <p className="split-desc">
                  We craft homes that become the center of life — places where
                  family, friends, and community gather year after year. Each
                  residence is designed to feel timeless, effortless, and deeply
                  personal.
                </p>
                <p className="split-desc">
                  From curated coastal enclaves to private city retreats, every
                  detail is considered: light, scale, flow, and the quiet
                  luxuries that make a home feel truly yours.
                </p>
                <div className="split-cta">
                  <BtnSecondary label="Explore Our Homes" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Timeline />

        {/* 4) TURN-KEY */}
        <section className="img-overlay">
          <img alt="Turn-key residences" src={img("ps1 (5).jpg")} />
          <div className="overlay-card">
            <h3 className="h-serif">
              Turn-Key
              <br />
              Residences
            </h3>
            <p>
              Meticulously prepared homes, curated down to the smallest detail —
              ready for immediate move-in.
            </p>
            <a className="cta" href="/properties">
              LEARN MORE
            </a>
          </div>
        </section>

        {/* 5) AVAILABILITY */}
        <section className="avail">
          <div className="grid">
            <div className="photo">
              <img alt="Availability" src={img("ps1 (1).jpg")} />
            </div>
            <div className="panel">
              <div className="eyebrow">AVAILABILITY</div>
              <h3 className="h-serif">
                Own Your Piece
                <br />
                Of The Coast
              </h3>
              <p>
                Explore a curated selection of private estates, penthouses, and
                new releases across our portfolio.
              </p>
              <a className="link-underline" href="/properties">
                VIEW AVAILABLE PROPERTIES
              </a>
            </div>
          </div>
        </section>

        <PropertyMarqee />
      </main>
    </>
  );
}
