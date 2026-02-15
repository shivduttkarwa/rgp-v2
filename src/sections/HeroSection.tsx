import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BtnPrimary from "../components/BtnPrimary";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */
interface ShapePoints {
  topX: number;
  cp1x: number;
  cp1y: number;
  midX: number;
  midY: number;
  cp2x: number;
  cp2y: number;
  botX: number;
}

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */
function flat(baseX: number): ShapePoints {
  return {
    topX: baseX,
    cp1x: baseX,
    cp1y: 250,
    midX: baseX,
    midY: 500,
    cp2x: baseX,
    cp2y: 750,
    botX: baseX,
  };
}

function buildPath(p: ShapePoints): string {
  return `M 0 0
    L ${p.topX} 0
    Q ${p.cp1x} ${p.cp1y} ${p.midX} ${p.midY}
    Q ${p.cp2x} ${p.cp2y} ${p.botX} 1000
    L 0 1000 Z`;
}

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HeroSection() {
  const svgPathRef = useRef<SVGPathElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const accentLRef = useRef<HTMLDivElement>(null);
  const accentRRef = useRef<HTMLDivElement>(null);
  const revealL1Ref = useRef<HTMLDivElement>(null);
  const revealL2Ref = useRef<HTMLDivElement>(null);
  const revealSubRef = useRef<HTMLDivElement>(null);
  const revealCtaRef = useRef<HTMLAnchorElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgPath = svgPathRef.current;
    const bg = bgRef.current;
    const badge = badgeRef.current;
    const logo = logoRef.current;
    const card = cardRef.current;
    const desc = descRef.current;
    const actions = actionsRef.current;
    const vignette = vignetteRef.current;
    const accentL = accentLRef.current;
    const accentR = accentRRef.current;
    const revealL1 = revealL1Ref.current;
    const revealL2 = revealL2Ref.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;
    const heroWrap = heroWrapRef.current;

    if (
      !svgPath ||
      !bg ||
      !badge ||
      !logo ||
      !card ||
      !desc ||
      !actions ||
      !vignette ||
      !accentL ||
      !accentR ||
      !revealL1 ||
      !revealL2 ||
      !revealSub ||
      !revealCta ||
      !heroWrap
    )
      return;

    const pts = flat(-300);

    /* ── apply current pts to SVG ── */
    const applyPath = () => {
      svgPath.setAttribute("d", buildPath(pts));
    };

    /* ── initial states ── */
    gsap.set([revealL1, revealL2, revealSub, revealCta], {
      x: -300,
      opacity: 0,
    });
    gsap.set(revealCta, { scale: 0.85 });

    // Custom logo section states
    gsap.set(logo, { opacity: 0, x: -60 });
    gsap.set(card, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 1,
    });
    gsap.set(desc, { opacity: 0 });
    gsap.set(actions, { scale: 0, opacity: 0 });
    gsap.set(bg, { opacity: 0 });

    gsap.set(badge, { opacity: 0 });
    gsap.set(vignette, { opacity: 0 });
    gsap.set(accentL, { height: 0, opacity: 0 });
    gsap.set(accentR, { height: 0, opacity: 0 });

    applyPath();

    /* ── scroll timeline (built after entry completes) ── */
    let scrollTL: gsap.core.Timeline | undefined;

    const buildScrollTimeline = () => {
      const gone = flat(-300);

      scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrap,
          start: "top top",
          end: "+=3200",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          id: "heroPin",
        },
      });

      // Recalculate after pin/scrollbar changes to prevent layout shift.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      /* A — content reverse animations */

      // Logo: shrink to 75% and move to top-left corner
      scrollTL.to(
        logo,
        {
          scale: 0.75,
          x: -170,
          y: -110,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0,
      );

      // Card/Image: clip un-reveal (right to left)
      scrollTL.to(
        card,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 0.08,
          ease: "power2.in",
        },
        0.015,
      );

      // Description: fade out
      scrollTL.to(
        desc,
        {
          opacity: 0,
          duration: 0.08,
          ease: "power2.in",
        },
        0.03,
      );

      // Actions/CTA: zoom out (reverse)
      scrollTL.to(
        actions,
        {
          scale: 0,
          opacity: 0,
          duration: 0.08,
          ease: "power2.in",
        },
        0.0375,
      );

      scrollTL.to(
        badge,
        {
          opacity: 0,
          scale: 0.7,
          duration: 0.06,
          ease: "power2.in",
        },
        0,
      );

      /* B — arc flows back */
      const flattenAtEdge = flat(50);
      scrollTL.to(
        pts,
        {
          ...flattenAtEdge,
          duration: 0.2275,
          ease: "power2.inOut",
          onUpdate: applyPath,
        },
        0.06,
      );

      scrollTL.to(
        pts,
        {
          ...gone,
          duration: 0.14,
          ease: "power1.in",
          onUpdate: applyPath,
        },
        0.2525,
      );

      /* C — vignette */
      scrollTL.to(
        vignette,
        {
          opacity: 0.5,
          duration: 0.2,
          ease: "power1.out",
        },
        0.25,
      );

      /* D — BG */
      scrollTL.to(
        bg,
        {
          scale: 1.02,
          duration: 0.3,
          ease: "power1.out",
        },
        0.15,
      );

      /* E — accents */
      scrollTL.to(
        accentL,
        {
          height: "55vh",
          opacity: 0.5,
          duration: 0.15,
          ease: "power3.out",
        },
        0.38,
      );
      scrollTL.to(
        accentR,
        {
          height: "45vh",
          opacity: 0.4,
          duration: 0.15,
          ease: "power3.out",
        },
        0.42,
      );

      /* F — reveal (all slide from left to right, staggered) */
      scrollTL.to(
        revealL1,
        {
          x: 0,
          opacity: 1,
          duration: 0.18,
          ease: "power4.out",
        },
        0.18,
      );

      scrollTL.to(
        revealL2,
        {
          x: 0,
          opacity: 1,
          duration: 0.18,
          ease: "power4.out",
        },
        0.24,
      );

      scrollTL.to(
        revealSub,
        {
          x: 0,
          opacity: 1,
          duration: 0.18,
          ease: "power4.out",
        },
        0.3,
      );

      scrollTL.to(
        revealCta,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: "power4.out",
        },
        0.36,
      );

      /* G — hold */
      scrollTL.to({}, { duration: 0.36 });
    };

    /* ── entry timeline ── */
    const entryTL = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: buildScrollTimeline,
    });

    // BG fade in (first)
    entryTL.to(bg, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);

    // BG zoom
    entryTL.fromTo(
      bg,
      { scale: 1.2 },
      { scale: 1.05, duration: 1.8, ease: "power2.out" },
      0.2,
    );

    // arc sweep
    entryTL.to(
      pts,
      {
        topX: 630,
        cp1x: 710,
        cp1y: 250,
        midX: 550,
        midY: 500,
        cp2x: 390,
        cp2y: 750,
        botX: 470,
        duration: 1,
        ease: "power3.out",
        onUpdate: applyPath,
      },
      0.3,
    );

    // content - custom animations
    // Logo: fade in from left
    entryTL.to(
      logo,
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      1.2,
    );

    // Card/Image: clip reveal from left to right
    entryTL.to(
      card,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.96,
        ease: "power2.inOut",
      },
      1.35,
    );

    // Description: fade in
    entryTL.to(
      desc,
      {
        opacity: 1,
        duration: 0.64,
        ease: "power2.out",
      },
      1.5,
    );

    // Actions/CTA: zoom in
    entryTL.to(
      actions,
      {
        scale: 1,
        opacity: 1,
        duration: 0.56,
        ease: "back.out(1.5)",
      },
      1.575,
    );

    // badge
    entryTL.to(badge, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.85);

    /* ── cleanup ── */
    return () => {
      entryTL.kill();
      if (scrollTL) {
        scrollTL.scrollTrigger?.kill();
        scrollTL.kill();
      }
    };
  }, []);

  const handleBadgeClick = () => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  /* ═══════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════ */
  return (
    <div className="rg-hero-wrap" ref={heroWrapRef}>
      <section className="rg-hero">
        <div
          className="rg-hero__bg"
          ref={bgRef}
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(0deg, rgba(7, 20, 37, 0.2), rgba(7, 20, 37, 0.15)), url("public/images/journal_3.jpg")',
          }}
        ></div>
        <div
          className="rg-hero__vignette"
          ref={vignetteRef}
          aria-hidden="true"
        ></div>
        <div
          className="rg-hero__accent rg-hero__accent--left"
          ref={accentLRef}
          aria-hidden="true"
        ></div>
        <div
          className="rg-hero__accent rg-hero__accent--right"
          ref={accentRRef}
          aria-hidden="true"
        ></div>

        <div className="rg-hero__overlay">
          <svg
            className="rg-hero__shape"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path ref={svgPathRef} d="" />
          </svg>

          <div className="rg-hero__content">
            <div className="rg-hero__logo" ref={logoRef}>
              <img
                src="/images/RGP-logo.png"
                alt="Real Gold Properties"
                className="rg-hero__logoMark"
              />
            </div>

            <div className="rg-hero__card" ref={cardRef}>
              <img
                className="rg-hero__cardImg"
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=80&auto=format&fit=crop"
                alt="Luxury property"
              />
            </div>

            <p className="rg-hero__desc" ref={descRef}>
              Curating exceptional properties that embody luxury,
              sophistication, and timeless value — your vision, our expertise.
            </p>

            <div className="rg-hero__actions" ref={actionsRef}>
              <BtnPrimary label="Schedule a Private Viewing" />
            </div>
          </div>
        </div>

        {/* ── REVEAL (shown on scroll) ── */}
        <div className="rg-hero__reveal">
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" ref={revealL1Ref}>
              Where <span className="rg-gold">Gold</span>
            </div>
          </div>
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" ref={revealL2Ref}>
              Meets <span className="rg-amber">Home</span>
            </div>
          </div>
          <div className="rg-reveal__sub" ref={revealSubRef}>
            350+ premium properties delivered — luxury villas, penthouses &amp;
            exclusive estates crafted for those who demand the extraordinary.
          </div>
          <a className="rg-reveal__cta" ref={revealCtaRef} href="#">
            EXPLORE PROPERTIES <span style={{ fontSize: "16px" }}>→</span>
          </a>
        </div>

        <button
          className="rg-hero__badge"
          ref={badgeRef}
          type="button"
          aria-label="Scroll"
          onClick={handleBadgeClick}
        >
          <span className="rg-hero__badgeInner">SCROLL</span>
        </button>
      </section>
    </div>
  );
}
