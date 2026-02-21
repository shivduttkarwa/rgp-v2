import React, { useEffect, useRef, useState } from "react";
import "./About.css";

type AboutProps = {
  introKicker?: string;
  introHeadline?: string;

  sectionKicker?: string;
  sectionTitle?: string;
  sectionBody?: string;

  imageWideSlides?: string[];
  splitKicker?: string;
  splitTitle?: string;
  splitBody?: string;
  splitImageSlides?: string[];
};

type AutoSliderProps = {
  images: string[];
  alt: string;
  imgClassName?: string;
  heightClassName?: string;
};

const AutoSlider: React.FC<AutoSliderProps> = ({
  images,
  alt,
  imgClassName = "",
  heightClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      { root: null, threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (!isActive) return;

    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [images, isActive]);

  return (
    <div className="rg-about__slider" aria-live="off" ref={containerRef}>
      <div
        className="rg-about__sliderTrack"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            className={`rg-about__slideImg ${imgClassName} ${heightClassName}`}
            src={src}
            alt={alt}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="rg-about__sliderPagination" role="tablist">
        {images.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            type="button"
            className={`rg-about__sliderDot ${idx === index ? "is-active" : ""}`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-pressed={idx === index}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const About: React.FC<AboutProps> = ({
  introKicker = "REAL GOLD PROPERTIES",
  introHeadline = "A modern real estate partner — buying, selling, and renting with local expertise and genuine care.",

  sectionKicker = "MAKING MOVES",
  sectionTitle = "HOMES BOUGHT & SOLD WITH CLARITY.\nRENTALS HANDLED WITH CARE.\nLOCAL INSIGHT THAT SAVES YOU TIME.",
  sectionBody = "From first inspection to final signature, we make the process feel calm and transparent. Whether you're upgrading, investing, or finding the right rental, we focus on the details that matter — pricing, presentation, and smooth communication.",
  imageWideSlides = [
    "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=85",
  ],

  splitKicker = "LOCAL ADVANTAGE",
  splitTitle = "A TEAM THAT KNOWS THE MARKET.\nA PROCESS THAT FEELS EASY.",
  splitBody = "We blend sharp pricing strategy with high-touch support — so sellers feel confident, buyers feel informed, and renters feel taken care of. Clear timelines, quick updates, and zero confusion.",
  splitImageSlides = [
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=85",
  ],
}) => {
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
          <AutoSlider
            images={imageWideSlides}
            alt="Real Gold Properties lifestyle"
            imgClassName="rg-about__wideImg"
            heightClassName="rg-about__wideImg--tall"
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
            <AutoSlider
              images={splitImageSlides}
              alt="Neighbourhood lifestyle"
              imgClassName="rg-about__splitImg"
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
    </section>
  );
};

export default About;
