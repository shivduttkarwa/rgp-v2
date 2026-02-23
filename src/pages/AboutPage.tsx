import { useEffect, useRef, useState } from "react";
import BtnSecondary from "../components/BtnSecondary";
import HeroSection from "../sections/HeroSection";
import PropertyMarqee from "../components/reusable/PropertyMarqee";
import "./AboutPage.css";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const img = (name: string) => `${base}images/${name}`;

const accordionItems = [
  {
    title: "Legacy-Level Craftsmanship",
    body: "Every residence is curated with materials, trades, and finishes that age beautifully and perform for decades.",
  },
  {
    title: "View-First Site Planning",
    body: "We position every home to maximize light, landscape, and privacy — with outdoor living at the center.",
  },
  {
    title: "Lifestyle-Ready Amenities",
    body: "From wellness and entertaining to flexible workspaces, every plan is designed for how you live today.",
  },
  {
    title: "Enduring Value",
    body: "We focus on timeless design, premium locations, and low-maintenance materials that protect long-term value.",
  },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const cleanup = initGsapSwitchAnimations(pageRef.current);
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = introRef.current;
    if (!el || el.dataset.wordsSplit === "true") return;
    el.dataset.wordsSplit = "true";

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
          fragment.appendChild(document.createElement("br"));
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

    const words = el.querySelectorAll<HTMLElement>(".intro-word");
    gsap.set(words, { y: 20, autoAlpha: 0 });
    gsap.to(words, {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "top 45%",
        scrub: true,
        toggleActions: "play none none none",
        once: true,
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
            <h2
              className="intro-statement lead"
              ref={introRef}
            >
              Set in the nation’s most{" "}
              <span className="gold-word">admired</span>{" "}
              <span className="gold-word">enclaves</span>,
              <br />
              Real Gold Properties presents a{" "}
              <span className="gold-word">refined</span>{" "}
              <span className="gold-word">collection</span> of bespoke
              residences and{" "}
              <span className="gold-word">private estates</span>.
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

        {/* 4) DREAM BIG */}
        <section className="section">
          <div className="container">
            <div className="two-col">
              <div className="copy stack">
                <div className="eyebrow">DREAM BIG</div>
                <h2 className="h-serif">
                  The Ideal Setting For Custom
                  <br />
                  Coastal &amp; City Residences
                </h2>
                <p>
                  Our projects balance bold architecture with a deep respect for
                  their surroundings. From waterfront sanctuaries to urban
                  penthouses, each home is built around light, space, and
                  enduring value.
                </p>
                <p className="copy-secondary">
                  We collaborate with leading architects, landscape designers,
                  and artisans to deliver residences that feel curated, not
                  constructed.
                </p>
              </div>
              <div>
                <img
                  className="img"
                  alt="Luxury pool"
                  src={img("ps1 (2).jpg")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5) ROOM TO BREATHE */}
        <section className="section section-tight">
          <div className="container">
            <div className="two-col two-col-center">
              <div className="copy stack">
                <h2 className="h-serif">Room To Breathe &amp; Be</h2>
                <p>
                  Every property is positioned for privacy, serenity, and
                  connection. Our communities are designed to feel both
                  exclusive and welcoming — a place to belong.
                </p>
              </div>
              <div>
                <img
                  className="img"
                  alt="Landscape"
                  src={img("hero-rpg-brisbane.jpg")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6) FEATURES / FACILITIES */}
        <section className="section section-mid">
          <div className="container">
            <div className="two-col two-col-start">
              <div>
                <h2 className="feature-title h-serif">Features / Facilities</h2>
                <div className="accordion">
                  {accordionItems.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={item.title}
                        className="acc-item"
                        data-open={isOpen ? "true" : "false"}
                      >
                        <button
                          className="acc-btn"
                          type="button"
                          onClick={() =>
                            setOpenIndex((prev) =>
                              prev === index ? -1 : index,
                            )
                          }
                        >
                          <span className="label">{item.title}</span>
                          <span className="icon">{isOpen ? "–" : "+"}</span>
                        </button>
                        <div className="acc-panel">
                          <div className="inner">{item.body}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <img
                  className="img"
                  alt="Coastal terrace"
                  src={img("ps1 (4).jpg")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7) AVAILABILITY */}
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

        {/* 8) TURN-KEY */}
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

        <PropertyMarqee />
      </main>
    </>
  );
}
