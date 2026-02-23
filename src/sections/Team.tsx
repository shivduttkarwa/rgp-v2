import { useState } from "react";
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
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "James Morrison",
    role: "Founder & Chief Executive",
    bio: "Visionary leader with over two decades of experience reshaping luxury real estate across three continents. Pioneer of the boutique estate concept.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    stats: [
      { value: "22", label: "Years Exp." },
      { value: "$4.2B", label: "Sales Volume" },
      { value: "340+", label: "Properties" },
    ],
    tags: ["Luxury Estates", "Investment Strategy", "Market Analysis"],
    email: "james@luxestate.com",
    social: {
      linkedin: "#",
      twitter: "#",
    },
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
      { value: "15", label: "Years Exp." },
      { value: "12", label: "Awards" },
      { value: "200+", label: "Projects" },
    ],
    tags: ["Visual Identity", "Photography", "Brand Strategy"],
    email: "sarah@luxestate.com",
    social: {
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Head of Global Sales",
    bio: "Master negotiator with an unparalleled network of UHNW clients. Closed over $2B in transactions with a reputation for discretion and results.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    stats: [
      { value: "18", label: "Years Exp." },
      { value: "$2.1B", label: "Closed Deals" },
      { value: "98%", label: "Client Retention" },
    ],
    tags: ["Negotiations", "Private Clients", "Off-Market"],
    email: "michael@luxestate.com",
    social: {
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Emma Williams",
    role: "Principal Architect",
    bio: "RIBA-certified architect merging sustainability with timeless design. Leads our in-house architectural evaluation and renovation advisory team.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    stats: [
      { value: "14", label: "Years Exp." },
      { value: "85", label: "Projects" },
      { value: "6", label: "Countries" },
    ],
    tags: ["Sustainable Design", "Renovations", "Historic Properties"],
    email: "emma@luxestate.com",
    social: {
      linkedin: "#",
      instagram: "#",
    },
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
      { value: "16", label: "Years Exp." },
      { value: "$1.8B", label: "AUM" },
      { value: "32%", label: "Avg. ROI" },
    ],
    tags: ["Portfolio Strategy", "Family Offices", "Market Intelligence"],
    email: "david@luxestate.com",
    social: {
      linkedin: "#",
    },
  },
];

const Team = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
        {teamMembers.map((member, index) => (
          <article
            key={member.id}
            className={`exp-card ${activeCard === member.id ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(member.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="card-image">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>

            <span className="card-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="vertical-name">{member.name}</h3>

            <div className="content">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <div className="content-divider"></div>

              {member.quote && (
                <div className="member-quote">
                  <p>"{member.quote}"</p>
                </div>
              )}

              <p className="member-bio">{member.bio}</p>

              <div className="member-stats">
                {member.stats.map((stat, idx) => (
                  <div key={idx} className="stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="member-tags">
                {member.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="member-actions">
                <button className="btn-profile">
                  View Profile
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="social-links">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="social-link"
                      aria-label="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="social-link"
                      aria-label="X/Twitter"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                        <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
                      </svg>
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      className="social-link"
                      aria-label="Instagram"
                    >
                      <svg viewBox="0 0 24 24">
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  )}
                </div>
                <a href={`mailto:${member.email}`} className="email-link">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email
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
