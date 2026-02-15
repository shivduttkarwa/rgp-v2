import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
   CONFIGURATION — all tweakable knobs
   ═══════════════════════════════════════════════════ */
const K = {
  bgZoomFrom: 1.2,
  bgZoomTo: 1.05,
  bgZoomDur: 1.8,
  bgZoomDelay: 0.2,
  arcSweepDur: 1.0,
  arcSweepDelay: 0.3,
  arcSweepEase: "power3.out",
  contentStartDelay: 1.2,
  contentStagger: 0.15,
  contentDur: 0.8,
  contentEase: "power3.out",
  badgeDelay: 1.85,
  badgeDur: 0.6,
  scrub: 1.5,
  pinDistance: 3200,
  contentFadeDur: 0.08,
  contentFadeStagger: 0.015,
  arcExitDur: 0.35,
  arcExitEase: "power2.inOut",
  arcExitDelay: 0.06,
  vignetteMax: 0.5,
  vignetteDur: 0.2,
  vignetteDelay: 0.25,
  bgSettleScale: 1.02,
  bgSettleDur: 0.3,
  accentDelay: 0.38,
  accentDur: 0.15,
  accentLH: "55vh",
  accentRH: "45vh",
  revealDelay: 0.18,
  revealStagger: 0.06,
  revealDur: 0.18,
  revealEase: "power4.out",
  revealXOffset: 100,
  ctaDelay: 0.64,
  ctaDur: 0.14,
  ctaEase: "back.out(1.4)",
  holdDur: 0.36,
  rest: {
    topX: 700,
    cp1x: 780,
    cp1y: 250,
    midX: 620,
    midY: 500,
    cp2x: 460,
    cp2y: 750,
    botX: 540,
  },
  shiftX: -70,
};

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */
function computeFlat(baseX: number): ShapePoints {
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

function computeRest(): ShapePoints {
  const s = K.shiftX;
  return {
    topX: K.rest.topX + s,
    cp1x: K.rest.cp1x + s,
    cp1y: K.rest.cp1y,
    midX: K.rest.midX + s,
    midY: K.rest.midY,
    cp2x: K.rest.cp2x + s,
    cp2y: K.rest.cp2y,
    botX: K.rest.botX + s,
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
  const loaderRef = useRef<HTMLDivElement>(null);
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
  const ptsRef = useRef<ShapePoints>(computeFlat(-300));

  useEffect(() => {
    const pts = ptsRef.current;
    const loader = loaderRef.current;
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

    /* ── apply current pts to SVG ── */
    const applyPath = () => {
      svgPath.setAttribute("d", buildPath(pts));
    };

    /* ── initial states ── */
    gsap.set([revealL1, revealL2], { yPercent: 130, opacity: 0 });
    gsap.set(revealL1, { x: -K.revealXOffset });
    gsap.set(revealL2, { x: K.revealXOffset });
    gsap.set(revealSub, { y: 50, opacity: 0 });
    gsap.set(revealCta, { y: 50, opacity: 0, scale: 0.85 });

    // Custom logo section states
    gsap.set(logo, { opacity: 0, x: -60 });
    gsap.set(card, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 1,
    });
    gsap.set(desc, { opacity: 0 });
    gsap.set(actions, { scale: 0, opacity: 0 });

    gsap.set(badge, { opacity: 0 });
    gsap.set(vignette, { opacity: 0 });
    gsap.set(accentL, { height: 0, opacity: 0 });
    gsap.set(accentR, { height: 0, opacity: 0 });

    Object.assign(pts, computeFlat(-300));
    applyPath();

    /* ── scroll timeline (built after entry completes) ── */
    let scrollTL: gsap.core.Timeline | undefined;

    const buildScrollTimeline = () => {
      const gone = computeFlat(-300);

      scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrap,
          start: "top top",
          end: `+=${K.pinDistance}`,
          scrub: K.scrub,
          pin: true,
          anticipatePin: 1,
          id: "heroPin",
        },
      });

      /* A — content reverse animations */

      // Logo: shrink to 75% and move to top-left corner
      scrollTL.to(
        logo,
        {
          scale: 0.75,
          x: -120,
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
          duration: K.contentFadeDur,
          ease: "power2.in",
        },
        K.contentFadeStagger,
      );

      // Description: fade out
      scrollTL.to(
        desc,
        {
          opacity: 0,
          duration: K.contentFadeDur,
          ease: "power2.in",
        },
        K.contentFadeStagger * 2,
      );

      // Actions/CTA: zoom out (reverse)
      scrollTL.to(
        actions,
        {
          scale: 0,
          opacity: 0,
          duration: K.contentFadeDur,
          ease: "power2.in",
        },
        K.contentFadeStagger * 2.5,
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
      const flattenAtEdge = computeFlat(50);
      scrollTL.to(
        pts,
        {
          ...flattenAtEdge,
          duration: K.arcExitDur * 0.65,
          ease: "power2.inOut",
          onUpdate: applyPath,
        },
        K.arcExitDelay,
      );

      scrollTL.to(
        pts,
        {
          ...gone,
          duration: K.arcExitDur * 0.4,
          ease: "power1.in",
          onUpdate: applyPath,
        },
        K.arcExitDelay + K.arcExitDur * 0.55,
      );

      /* C — vignette */
      scrollTL.to(
        vignette,
        {
          opacity: K.vignetteMax,
          duration: K.vignetteDur,
          ease: "power1.out",
        },
        K.vignetteDelay,
      );

      /* D — BG */
      scrollTL.to(
        bg,
        {
          scale: K.bgSettleScale,
          duration: K.bgSettleDur,
          ease: "power1.out",
        },
        0.15,
      );

      /* E — accents */
      scrollTL.to(
        accentL,
        {
          height: K.accentLH,
          opacity: 0.5,
          duration: K.accentDur,
          ease: "power3.out",
        },
        K.accentDelay,
      );
      scrollTL.to(
        accentR,
        {
          height: K.accentRH,
          opacity: 0.4,
          duration: K.accentDur,
          ease: "power3.out",
        },
        K.accentDelay + 0.04,
      );

      /* F — reveal */
      scrollTL.to(
        revealL1,
        {
          yPercent: 0,
          opacity: 1,
          x: 0,
          duration: K.revealDur,
          ease: K.revealEase,
        },
        K.revealDelay,
      );

      scrollTL.to(
        revealL2,
        {
          yPercent: 0,
          opacity: 1,
          x: 0,
          duration: K.revealDur,
          ease: K.revealEase,
        },
        K.revealDelay + K.revealStagger,
      );

      scrollTL.to(
        revealSub,
        {
          y: 0,
          opacity: 1,
          duration: K.revealDur * 0.8,
          ease: "power3.out",
        },
        K.revealDelay + K.revealStagger * 2,
      );

      scrollTL.to(
        revealCta,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: K.ctaDur,
          ease: K.ctaEase,
        },
        K.ctaDelay,
      );

      /* G — hold */
      scrollTL.to({}, { duration: K.holdDur });
    };

    /* ── entry timeline ── */
    const rest = computeRest();

    const entryTL = gsap.timeline({
      defaults: { ease: K.contentEase },
      onComplete: buildScrollTimeline,
    });

    // loader
    if (loader) {
      entryTL.to(loader, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          if (loader) loader.style.display = "none";
        },
      });
    }

    // BG zoom
    entryTL.fromTo(
      bg,
      { scale: K.bgZoomFrom },
      { scale: K.bgZoomTo, duration: K.bgZoomDur, ease: "power2.out" },
      K.bgZoomDelay,
    );

    // arc sweep
    entryTL.to(
      pts,
      {
        ...rest,
        duration: K.arcSweepDur,
        ease: K.arcSweepEase,
        onUpdate: applyPath,
      },
      K.arcSweepDelay,
    );

    // content - custom animations
    const cs = K.contentStartDelay;
    const sg = K.contentStagger;

    // Logo: fade in from left
    entryTL.to(
      logo,
      {
        opacity: 1,
        x: 0,
        duration: K.contentDur,
        ease: "power3.out",
      },
      cs,
    );

    // Card/Image: clip reveal from left to right
    entryTL.to(
      card,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: K.contentDur * 1.2,
        ease: "power2.inOut",
      },
      cs + sg,
    );

    // Description: fade in
    entryTL.to(
      desc,
      {
        opacity: 1,
        duration: K.contentDur * 0.8,
        ease: "power2.out",
      },
      cs + sg * 2,
    );

    // Actions/CTA: zoom in
    entryTL.to(
      actions,
      {
        scale: 1,
        opacity: 1,
        duration: K.contentDur * 0.7,
        ease: "back.out(1.5)",
      },
      cs + sg * 2.5,
    );

    // badge
    entryTL.to(
      badge,
      { opacity: 1, duration: K.badgeDur, ease: "power2.out" },
      K.badgeDelay,
    );

    /* ── cleanup ── */
    return () => {
      entryTL.kill();
      if (scrollTL) {
        scrollTL.scrollTrigger?.kill();
        scrollTL.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleBadgeClick = () => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  /* ═══════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════ */
  return (
    <>
      {/* ── LOADER ── */}
      <div className="rg-loader" ref={loaderRef}>
        <div className="rg-loader__inner">
          <div className="rg-loader__spinner"></div>
          <div className="rg-loader__text">REAL GOLD</div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="rg-hero-wrap" ref={heroWrapRef}>
        <section className="rg-hero">
          <div className="rg-hero__bg" ref={bgRef} aria-hidden="true"></div>
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
                <a className="rg-btn" href="#">
                  SCHEDULE A PRIVATE VIEWING{" "}
                  <span className="rg-btn__icon" aria-hidden="true">
                    ◆
                  </span>
                </a>
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
              350+ premium properties delivered — luxury villas, penthouses
              &amp; exclusive estates crafted for those who demand the
              extraordinary.
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
    </>
  );
}
