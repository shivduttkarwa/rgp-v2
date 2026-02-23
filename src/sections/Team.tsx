import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "./Team.css";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
  stats: {
    value: string;
    label: string;
  }[];
  tags: string[];
  email: string;
  phone: string;
  social: {
    linkedin?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Singh",
    role: "Founder & Chief Executive",
    bio: "Visionary leader with over two decades of experience reshaping luxury real estate across three continents. Pioneer of the boutique estate concept.",
    image: "/images/rahul-singh.jpg",
    stats: [
      { value: "12", label: "Years Exp." },
      { value: "$850M", label: "Sales Volume" },
      { value: "120+", label: "Properties" },
    ],
    tags: ["Luxury Estates", "Investment Strategy", "Market Analysis"],
    email: "rahul@luxestate.com",
    phone: "+91 98100 00001",
    social: { linkedin: "#" },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "Award-winning designer bringing editorial elegance and cinematic vision to luxury property presentation. Former Art Director at Architectural Digest.",
    quote: "Every property has a soul. Our job is to reveal it.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    stats: [
      { value: "10", label: "Years Exp." },
      { value: "6", label: "Awards" },
      { value: "80+", label: "Projects" },
    ],
    tags: ["Visual Identity", "Photography", "Brand Strategy"],
    email: "sarah@luxestate.com",
    phone: "+91 98100 00002",
    social: { linkedin: "#" },
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Head of Global Sales",
    bio: "Master negotiator with an unparalleled network of UHNW clients. Closed over $2B in transactions with a reputation for discretion and results.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    stats: [
      { value: "10", label: "Years Exp." },
      { value: "$620M", label: "Closed Deals" },
      { value: "94%", label: "Client Retention" },
    ],
    tags: ["Negotiations", "Private Clients", "Off-Market"],
    email: "michael@luxestate.com",
    phone: "+91 98100 00003",
    social: { linkedin: "#" },
  },
  {
    id: 4,
    name: "Emma Williams",
    role: "Principal Architect",
    bio: "RIBA-certified architect merging sustainability with timeless design. Leads our in-house architectural evaluation and renovation advisory team.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    stats: [
      { value: "9", label: "Years Exp." },
      { value: "42", label: "Projects" },
      { value: "3", label: "Countries" },
    ],
    tags: ["Sustainable Design", "Renovations", "Historic Properties"],
    email: "emma@luxestate.com",
    phone: "+91 98100 00004",
    social: { linkedin: "#" },
  },
  {
    id: 5,
    name: "David Park",
    role: "Investment Director",
    bio: "Former Goldman Sachs VP now directing strategic property investments. Specializes in portfolio optimization for family offices and institutions.",
    quote: "Real estate isn't just property—it's generational wealth.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    stats: [
      { value: "8", label: "Years Exp." },
      { value: "$320M", label: "AUM" },
      { value: "22%", label: "Avg. ROI" },
    ],
    tags: ["Portfolio Strategy", "Family Offices", "Market Intelligence"],
    email: "david@luxestate.com",
    phone: "+91 98100 00005",
    social: { linkedin: "#" },
  },
];

const Team = () => {
  const defaultActiveId = 1;
  const [activeCard, setActiveCard] = useState<number | null>(defaultActiveId);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const hasAnimated = useRef(false);
  const members = useMemo(() => teamMembers, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length || activeCard == null) return;

    const activeEl = cards.find(
      (card) => Number(card.dataset.cardId) === activeCard
    );

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    cards.forEach((card) => {
      const isActive = card === activeEl;
      const content = card.querySelector(".content") as HTMLElement | null;
      const blend = card.querySelector(".card-blend") as HTMLElement | null;

      gsap.killTweensOf(card);
      if (blend) gsap.killTweensOf(blend);
      if (content) gsap.killTweensOf(content);

      if (!isMobile) {
        gsap.to(card, {
          flexGrow: isActive ? 5 : 1,
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.set(card, { flexGrow: 0 });
      }

      if (blend) {
        if (isMobile) {
          gsap.set(blend, { autoAlpha: 1 });
        } else {
          gsap.to(blend, {
            autoAlpha: isActive ? 1 : 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }

      if (!content) return;

      if (isMobile) {
        gsap.set(content, { autoAlpha: 1 });
        return;
      }

      if (isActive) {
        const contentDelay = hasAnimated.current ? 0.28 : 0.4;
        gsap.to(content, { autoAlpha: 1, duration: 0.05, delay: contentDelay });
        const items = content.querySelectorAll("[data-animate]");
        gsap.killTweensOf(items);
        gsap.set(items, { y: 22, autoAlpha: 0 });
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          delay: contentDelay + 0.05,
          onComplete: () => {
            hasAnimated.current = true;
          },
        });
      } else {
        gsap.set(content, { autoAlpha: 0 });
      }
    });
  }, [activeCard]);

  return (
    <section className="team-section">
      {/* Section Header */}
      <header className="team__header">
        <span className="team__eyebrow">Our Collective</span>
        <h2 className="team__title">
          Meet the <em>Visionaries</em>
        </h2>
        <p className="team__subtitle">
          A curated ensemble of creative minds and industry veterans shaping
          the future of luxury real estate.
        </p>
      </header>

      {/* Expanding Cards */}
      <div className="team-expanding">
        {members.map((member) => (
          <article
            key={member.id}
            ref={(el) => {
              cardRefs.current[member.id] = el;
            }}
            data-card-id={member.id}
            className={`exp-card ${activeCard === member.id ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(member.id)}
            onMouseLeave={() => setActiveCard(defaultActiveId)}
            onClick={() => setActiveCard(member.id)}
          >
            <div className="card-image">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>
            <div className="card-blend" aria-hidden="true"></div>

            <h3 className="vertical-name">{member.name}</h3>

            <div className="content">
              <h3 className="member-name" data-animate="fade-up">
                {member.name}
              </h3>
              <p className="member-role" data-animate="fade-up">
                {member.role}
              </p>
              <div className="content-divider" data-animate="fade-up"></div>

              {member.quote && (
                <div className="member-quote" data-animate="fade-up">
                  <p>"{member.quote}"</p>
                </div>
              )}

              <p className="member-bio" data-animate="fade-up">
                {member.bio}
              </p>

              <div className="member-stats" data-animate="fade-up">
                {member.stats.map((stat, idx) => (
                  <div key={idx} className="stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="member-tags" data-animate="fade-up">
                {member.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="member-actions" data-animate="fade-up">
                <a href={`tel:${member.phone}`} className="action-btn action-btn--phone" aria-label="Call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call</span>
                </a>
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="action-btn action-btn--linkedin" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
                <a href={`mailto:${member.email}`} className="action-btn action-btn--email" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Team;
