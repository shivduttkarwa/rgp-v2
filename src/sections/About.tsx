import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

type AboutProps = {
  introKicker?: string;
  introHeadline?: string;

  sectionKicker?: string;
  sectionTitle?: string;
  sectionBody?: string;

  imageWide?: string;

  // Replaced two-image spread with single left image + right content
  splitKicker?: string;
  splitTitle?: string;
  splitBody?: string;
  splitImage?: string;

  centerTitle?: string;
  centerBody?: string;
  imageBottom?: string;
};

const About: React.FC<AboutProps> = ({
  introKicker = "REAL GOLD PROPERTIES",
  introHeadline = "A modern real estate partner — buying, selling, and renting with local expertise and genuine care.",

  sectionKicker = "MAKING MOVES",
  sectionTitle = "HOMES BOUGHT & SOLD WITH CLARITY.\nRENTALS HANDLED WITH CARE.\nLOCAL INSIGHT THAT SAVES YOU TIME.",
  sectionBody = "From first inspection to final signature, we make the process feel calm and transparent. Whether you're upgrading, investing, or finding the right rental, we focus on the details that matter — pricing, presentation, and smooth communication.",
  imageWide = "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1800&q=85",

  splitKicker = "LOCAL ADVANTAGE",
  splitTitle = "A TEAM THAT KNOWS THE MARKET.\nA PROCESS THAT FEELS EASY.",
  splitBody = "We blend sharp pricing strategy with high-touch support — so sellers feel confident, buyers feel informed, and renters feel taken care of. Clear timelines, quick updates, and zero confusion.",
  splitImage = "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=85",

  centerTitle = "Across Growing Neighbourhoods,\nExplore With Confidence…",
  centerBody = "Straightforward guidance, honest pricing strategy, and clean execution. We help buyers find the right fit, sellers maximize value, and renters move in without stress — with a team that stays responsive at every step.",
  imageBottom = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=85",
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 980) return;

    gsap.registerPlugin(ScrollTrigger);

    const configs = [
      { selector: ".rg-about__wideImg", range: 12 },
      { selector: ".rg-about__splitImg", range: 6 },
      { selector: ".rg-about__bottomImg", range: 12 },
    ];

    const tweens = configs.map(({ selector, range }, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      gsap.set(selector, { yPercent: -range * dir, willChange: "transform" });
      return gsap.to(selector, {
        yPercent: range * dir,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="rg-about" aria-label="About Real Gold Properties">
      {/* 1) Big centered intro statement */}
      <div className="rg-about__intro">
        <div className="rg-about__kicker" data-gsap="fade-up">
          {introKicker}
        </div>
        <h2
          className="rg-about__headline"
          data-gsap="word-write"
          data-gsap-delay="0.1"
        >
          {introHeadline}
        </h2>
      </div>

      {/* 2) Two-column: bigger text left, taller image right */}
      <div className="rg-about__feature rg-about__watermark">
        <div className="rg-about__featureInner">
          <div className="rg-about__copy">
            <div className="rg-about__eyebrow" data-gsap="fade-up">
              {sectionKicker}
            </div>

            <h3
              className="rg-about__capsTitle rg-about__capsTitle--big"
              data-gsap="fade-up"
              data-gsap-delay="0.1"
            >
              {sectionTitle.split("\n").map((line, idx) => (
                <span key={idx} className="rg-about__capsLine">
                  {line}
                </span>
              ))}
            </h3>

            <p
              className="rg-about__body rg-about__body--big"
              data-gsap="fade-up"
              data-gsap-delay="0.2"
            >
              {sectionBody}
            </p>
          </div>

          <figure
            className="rg-about__wideFigure rg-about__wideFigure--tall"
            data-gsap="clip-smooth-down"
            data-gsap-start="top 65%"
          >
            <img
              className="rg-about__wideImg rg-about__wideImg--tall"
              src={imageWide}
              alt="Real Gold Properties lifestyle"
            />
          </figure>
        </div>
      </div>

      {/* 3) Single split: left image, right content */}
      <div className="rg-about__split rg-about__watermark--arch">
        <div className="rg-about__splitInner">
          <figure
            className="rg-about__splitFigure"
            data-gsap="clip-smooth-down"
            data-gsap-start="top 95%"
          >
            <img
              className="rg-about__splitImg"
              src={splitImage}
              alt="Neighbourhood lifestyle"
            />
          </figure>

          <div className="rg-about__splitCopy">
            <div className="rg-about__eyebrow" data-gsap="fade-up">
              {splitKicker}
            </div>

            <h3
              className="rg-about__splitTitle"
              data-gsap="fade-up"
              data-gsap-delay="0.1"
            >
              {splitTitle.split("\n").map((line, idx) => (
                <span key={idx} className="rg-about__splitLine">
                  {line}
                </span>
              ))}
            </h3>

            <p
              className="rg-about__body"
              data-gsap="fade-up"
              data-gsap-delay="0.2"
            >
              {splitBody}
            </p>
          </div>
        </div>
      </div>

      {/* 4) Centered copy + image */}
      <div className="rg-about__center">
        <div className="rg-about__centerInner rg-about__watermark--columns">
          <h3 className="rg-about__centerTitle" data-gsap="fade-up">
            {centerTitle.split("\n").map((line, idx) => (
              <span key={idx} className="rg-about__centerLine">
                {line}
              </span>
            ))}
          </h3>

          <p
            className="rg-about__centerBody"
            data-gsap="fade-up"
            data-gsap-delay="0.1"
          >
            {centerBody}
          </p>

          <figure
            className="rg-about__bottomFigure"
            data-gsap="clip-smooth-down"
            data-gsap-start="top 95%"
            data-gsap-delay="0.15"
          >
            <img
              className="rg-about__bottomImg"
              src={imageBottom}
              alt="A beautiful home exterior"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default About;
