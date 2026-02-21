import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./PropertySlider.css";

export type PSSlide = {
  tab: string;
  eyebrow: string;
  headline: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  cta: string;
  coverSrc: string;
  floatSrc: string;
};

const DEFAULT_SLIDES: PSSlide[] = [
  {
    tab: "BUY",
    eyebrow: "BUYER'S GUIDE",
    headline: "FIND YOUR\nPERFECT HOME",
    body: "Curated listings, expert guidance, and zero pressure. We match you with the right property at the right price, every time.",
    stats: [
      { value: "320+", label: "Active Listings" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    cta: "BROWSE LISTINGS",
    coverSrc:
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=85",
  },
  {
    tab: "SELL",
    eyebrow: "SELLER'S EDGE",
    headline: "SELL SMARTER,\nEARN MORE",
    body: "Sharp pricing strategy, professional presentation, and maximum market exposure — from day one to closing day.",
    stats: [
      { value: "14", label: "Avg. Days on Market" },
      { value: "103%", label: "List-to-Sale Ratio" },
    ],
    cta: "GET A VALUATION",
    coverSrc:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=700&q=85",
  },
  {
    tab: "RENT",
    eyebrow: "RENTAL MANAGEMENT",
    headline: "PREMIUM RENTALS,\nHASSLE-FREE",
    body: "From tenant screening to lease signing, every step handled with care — so landlords relax and renters feel at home.",
    stats: [
      { value: "500+", label: "Managed Units" },
      { value: "4.9★", label: "Tenant Rating" },
    ],
    cta: "VIEW RENTALS",
    coverSrc:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=700&q=85",
  },
];

type Props = {
  slides?: PSSlide[];
};

const PropertySlider: React.FC<Props> = ({ slides = DEFAULT_SLIDES }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimatingRef = useRef(false);
  const autoRef = useRef<number | null>(null);
  const activeIdxRef = useRef(0);

  const coverRefs = useRef<(HTMLImageElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  const AUTO_DELAY = 6200;

  /* ── initial layout ── */
  useEffect(() => {
    slides.forEach((_, i) => {
      const cover = coverRefs.current[i];
      const content = contentRefs.current[i];
      const float = floatRefs.current[i];

      if (i === 0) {
        if (cover) gsap.set(cover, { autoAlpha: 1 });
        if (content) gsap.set(content, { autoAlpha: 1 });
        if (float) gsap.set(float, { autoAlpha: 1, x: 0 });
      } else {
        if (cover) gsap.set(cover, { autoAlpha: 0 });
        if (content) gsap.set(content, { autoAlpha: 0 });
        if (float) gsap.set(float, { autoAlpha: 0, x: 60 });
      }
    });

    /* animate first slide content in */
    const c0 = contentRefs.current[0];
    if (c0) {
      const kids = Array.from(c0.children) as HTMLElement[];
      gsap.fromTo(
        kids,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    }
  }, [slides]);

  /* ── progress bar reset helper ── */
  const resetProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.set(bar, { scaleX: 0 });
    gsap.to(bar, {
      scaleX: 1,
      duration: AUTO_DELAY / 1000,
      ease: "none",
    });
  }, []);

  /* ── go-to ── */
  const goTo = useCallback(
    (next: number) => {
      const prev = activeIdxRef.current;
      if (isAnimatingRef.current || next === prev) return;
      isAnimatingRef.current = true;
      activeIdxRef.current = next;

      const prevCover = coverRefs.current[prev];
      const nextCover = coverRefs.current[next];
      const prevContent = contentRefs.current[prev];
      const nextContent = contentRefs.current[next];
      const prevFloat = floatRefs.current[prev];
      const nextFloat = floatRefs.current[next];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          isAnimatingRef.current = false;
          setActiveIdx(next);
        },
      });

      /* out: content children */
      if (prevContent) {
        const kids = Array.from(prevContent.children) as HTMLElement[];
        tl.to(
          kids,
          { y: -28, autoAlpha: 0, stagger: 0.05, duration: 0.38, ease: "power2.in" },
          0
        );
      }

      /* out: float */
      if (prevFloat) {
        tl.to(prevFloat, { x: -50, autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 0);
      }

      /* covers cross-fade */
      if (prevCover) {
        tl.to(prevCover, { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" }, 0.15);
      }
      if (nextCover) {
        gsap.set(nextCover, { autoAlpha: 0 });
        tl.to(nextCover, { autoAlpha: 1, duration: 0.65, ease: "power2.inOut" }, 0.15);
      }

      /* in: float */
      if (nextFloat) {
        gsap.set(nextFloat, { x: 60, autoAlpha: 0 });
        tl.to(nextFloat, { x: 0, autoAlpha: 1, duration: 0.65 }, 0.3);
      }

      /* in: content children */
      if (nextContent) {
        gsap.set(nextContent, { autoAlpha: 1 });
        const kids = Array.from(nextContent.children) as HTMLElement[];
        gsap.set(kids, { y: 52, autoAlpha: 0 });
        tl.to(kids, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.62 }, 0.42);
      }

      resetProgress();
    },
    [resetProgress]
  );

  /* ── auto-advance ── */
  useEffect(() => {
    resetProgress();
    if (autoRef.current) window.clearTimeout(autoRef.current);
    autoRef.current = window.setTimeout(() => {
      goTo((activeIdxRef.current + 1) % slides.length);
    }, AUTO_DELAY);
    return () => {
      if (autoRef.current) window.clearTimeout(autoRef.current);
    };
  }, [activeIdx, goTo, slides.length, resetProgress]);

  /* ── derived ── */
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === slides.length - 1;
  const padded = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <div className="rg-ps">
      {/* ── Left accent panel ── */}
      <div className="rg-ps__accent" aria-hidden="true">
        <div className="rg-ps__accentNoise" />

        <div className="rg-ps__monogram">RG</div>

        <nav className="rg-ps__tabs" role="tablist" aria-label="Service tabs">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIdx}
              className={`rg-ps__tab ${i === activeIdx ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              type="button"
            >
              {s.tab}
            </button>
          ))}
        </nav>

        <div className="rg-ps__counter">
          <span className="rg-ps__counterCurrent">{padded(activeIdx)}</span>
          <span className="rg-ps__counterSep" />
          <span className="rg-ps__counterTotal">{padded(slides.length - 1)}</span>
        </div>
      </div>

      {/* ── Floating property frame (the "outside the card" image) ── */}
      <div className="rg-ps__floatWrap" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="rg-ps__floatFrame"
            ref={(el) => {
              floatRefs.current[i] = el;
            }}
          >
            <img
              src={slide.floatSrc}
              alt=""
              className="rg-ps__floatImg"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="rg-ps__floatBadge">{slide.tab}</div>
          </div>
        ))}
      </div>

      {/* ── Main card track ── */}
      <div className="rg-ps__track">
        {/* Stacked slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="rg-ps__slide"
            role="tabpanel"
            aria-hidden={i !== activeIdx}
          >
            <img
              ref={(el) => {
                coverRefs.current[i] = el;
              }}
              src={slide.coverSrc}
              alt=""
              className="rg-ps__cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="rg-ps__overlay" />

            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="rg-ps__content"
            >
              <span className="rg-ps__eyebrow">{slide.eyebrow}</span>
              <h3 className="rg-ps__headline">
                {slide.headline.split("\n").map((ln, j) => (
                  <span key={j} className="rg-ps__headlineLine">
                    {ln}
                  </span>
                ))}
              </h3>
              <p className="rg-ps__body">{slide.body}</p>
              <div className="rg-ps__stats">
                {slide.stats.map((st, j) => (
                  <div key={j} className="rg-ps__stat">
                    <span className="rg-ps__statValue">{st.value}</span>
                    <span className="rg-ps__statLabel">{st.label}</span>
                  </div>
                ))}
              </div>
              <button className="rg-ps__cta" type="button">
                {slide.cta}
                <svg
                  className="rg-ps__ctaArrow"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <button
          className={`rg-ps__navBtn rg-ps__navBtn--prev ${isFirst ? "is-disabled" : ""}`}
          onClick={() => goTo(activeIdx - 1)}
          disabled={isFirst}
          aria-label="Previous slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`rg-ps__navBtn rg-ps__navBtn--next ${isLast ? "is-disabled" : ""}`}
          onClick={() => goTo(activeIdx + 1)}
          disabled={isLast}
          aria-label="Next slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="rg-ps__progress" aria-hidden="true">
          <span
            className="rg-ps__progressBar"
            ref={progressRef}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
