// Philosophy.tsx
import React from "react";
import "./Philosophy.css";

type FeatureCard = {
  img: string;
  caption: string;
  alt?: string;
};

type PhilosophyProps = {
  title?: string;
  subtitle?: string;
  heroImg?: string;
  cards?: FeatureCard[];
};

const DEFAULTS = {
  title: "Key Features",
  subtitle:
    "Scandinavian-inspired interiors with floor-to-ceiling glass and natural textures.",
  heroImg:
    "https://files.staging.peachworlds.com/website/905fcf55-150d-44ab-b5e8-96de39798da3/chatgpt-image-3-apr-2025-16-23-39.webp",
  cards: [
    {
      img: "https://files.staging.peachworlds.com/website/dbf16c23-6134-4df6-a509-bd2a6b79ab37/chatgpt-image-3-apr-2025-16-33-58.webp",
      caption:
        "Wake up to nature in the Mini Villa’s panoramic bedroom. Framed by floor-to-ceiling glass.",
      alt: "Panoramic bedroom with floor-to-ceiling glass",
    },
    {
      img: "https://files.staging.peachworlds.com/website/d80b404a-7e8e-40ee-a08c-cbab3f8a7ad3/chatgpt-image-3-apr-2025-16-23-38.webp",
      caption:
        "A spa-like retreat in miniature form—crafted with warm wood tones, and matte black fixtures.",
      alt: "Spa-like bathroom with warm wood tones",
    },
    {
      img: "https://files.staging.peachworlds.com/website/504aad69-04e9-4c61-8e60-4bf340ec746f/chatgpt-image-3-apr-2025-16-23-32.webp",
      caption:
        "The kitchen combines sleek design with smart functionality—compact and fully equipped.",
      alt: "Compact kitchen with smart functionality",
    },
  ] as FeatureCard[],
};

export default function Philosophy(props: PhilosophyProps) {
  const title = props.title ?? DEFAULTS.title;
  const subtitle = props.subtitle ?? DEFAULTS.subtitle;
  const heroImg = props.heroImg ?? DEFAULTS.heroImg;
  const cards = props.cards ?? DEFAULTS.cards;

  return (
    <section className="rg-philo" aria-label="Philosophy / Key Features">
      {/* Top row (logo left, contact button right) */}
      <div className="rg-philo__top">
        <div className="rg-philo__brand" aria-label="Brand mark">
          {/* Minimal tiny-villa style mark (inline SVG) */}
          <svg
            className="rg-philo__logo"
            viewBox="0 0 64 64"
            role="img"
            aria-label="Logo"
          >
            <path
              d="M12 52V22L32 12l20 10v30"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M24 52V26M32 52V22M40 52V26"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <a className="rg-philo__cta" href="#contact">
          <span className="rg-philo__ctaText">Contact Us</span>
          <span className="rg-philo__ctaIcon" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      {/* Key Features split */}
      <div className="rg-philo__wrap">
        <div className="rg-philo__split">
          <div className="rg-philo__copy">
            <h2 className="rg-philo__title">{title}</h2>
            <p className="rg-philo__subtitle">{subtitle}</p>
          </div>

          <div className="rg-philo__media">
            <div className="rg-philo__imgFrame">
              <img
                className="rg-philo__img"
                src={heroImg}
                alt="Key feature interior"
              />
            </div>
          </div>
        </div>

        <div className="rg-philo__divider" role="separator" />

        {/* 3-up gallery */}
        <div className="rg-philo__grid" aria-label="Feature gallery">
          {cards.slice(0, 3).map((card, idx) => (
            <article className="rg-philo__card" key={`${idx}-${card.img}`}>
              <div className="rg-philo__cardMedia">
                <img
                  className="rg-philo__cardImg"
                  src={card.img}
                  alt={card.alt ?? `Feature image ${idx + 1}`}
                  loading="lazy"
                />
              </div>
              <p className="rg-philo__cardCaption">{card.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
