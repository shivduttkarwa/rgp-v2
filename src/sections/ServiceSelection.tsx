import {
  Home,
  Key,
  Building,
  ArrowRight,
  TrendingUp,
  Search,
  CalendarCheck,
  MessageCircle,
  Phone,
} from "lucide-react";
import "./ServiceSelection.css";

const services = [
  {
    id: "buy",
    icon: Search,
    secondaryIcon: Key,
    headline: "Advisory",
    title: "Buyer Support",
    subtitle: "And Guidance",
    description:
      "Clear advice and local insight to help you buy with confidence—pricing, comparables, and negotiation support tailored to your goals.",
    features: [
      "Buyer support and advisory",
      "Residential property sales",
      "House & land packages",
    ],
    cta: "Speak With Us",
    theme: "buy",
  },
  {
    id: "sell",
    icon: TrendingUp,
    secondaryIcon: Home,
    headline: "Insights",
    title: "Property Appraisals",
    subtitle: "& Market Analysis",
    description:
      "Professional appraisals, transparent pricing strategy, and data-led guidance to help you make the right move at the right time.",
    features: [
      "Property appraisals and market analysis",
      "Honest communication",
      "Results driven outcomes",
    ],
    cta: "Request an Appraisal",
    theme: "sell",
  },
  {
    id: "rent",
    icon: CalendarCheck,
    secondaryIcon: Building,
    headline: "Management",
    title: "Rentals &",
    subtitle: "Property Management",
    description:
      "Reliable tenancy, proactive maintenance, and smooth day-to-day management for landlords and tenants alike.",
    features: [
      "Quality tenant selection",
      "Reliable rent collection",
      "Routine inspections & maintenance",
    ],
    cta: "View Services",
    theme: "rent",
  },
];

const ServiceSelection = () => {
  return (
    <section className="svc">
      <div className="svc__container">
        {/* Header */}
        <header className="svc__header">
          <span className="svc__eyebrow" data-gsap="fade-up">
            How Can We Help You?
          </span>
          <h2
            className="svc__title"
            data-gsap="char-reveal"
            data-gsap-start="top 85%"
          >
            What Are You <em>Looking For?</em>
          </h2>
          <p
            className="svc__subtitle"
            data-gsap="fade-up"
            data-gsap-delay="0.2"
          >
            Whether you're buying, selling, or renting — we're here to make your
            real estate journey seamless and rewarding.
          </p>
        </header>

        {/* Service Cards */}
        <div
          className="svc__grid"
          data-gsap="clip-smooth-down"
          data-gsap-stagger="0.14"
          data-gsap-delay="0.1"
          data-gsap-mobile="clip-smooth-down"
          data-gsap-mobile-cards-start="top 90%"
        >
          {services.map((service) => (
            <article
              key={service.id}
              className={`svc-card svc-card--${service.theme}`}
            >
              {/* Card Header */}
              <div className="svc-card__header">
                <div className="svc-card__icon-wrap">
                  <service.icon className="svc-card__icon" />
                </div>
                <span className="svc-card__headline">{service.headline}</span>
              </div>

              {/* Card Content */}
              <div className="svc-card__content">
                <h3 className="svc-card__title">{service.title}</h3>
                <p className="svc-card__title-sub">{service.subtitle}</p>
                <p className="svc-card__desc">{service.description}</p>

                {/* Features */}
                <ul className="svc-card__features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="svc-card__feature">
                      <span className="svc-card__feature-dot" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="svc-card__footer">
                <button className="svc-card__btn">
                  <span>{service.cta}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Background Icon */}
              <service.secondaryIcon className="svc-card__bg-icon" />
            </article>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="svc-cta">
        <div className="svc-cta__container">
          {/* Decorative Elements */}
          <div className="svc-cta__decor svc-cta__decor--left" />
          <div className="svc-cta__decor svc-cta__decor--right" />

          {/* Content */}
          <div className="svc-cta__content">
            <span className="svc-cta__eyebrow" data-gsap="fade-up">
              Need Guidance?
            </span>
            <h3
              className="svc-cta__title"
              data-gsap="char-reveal"
              data-gsap-start="top 85%"
            >
              Not Sure Where to <em>Start?</em>
            </h3>
            <p
              className="svc-cta__text"
              data-gsap="fade-up"
              data-gsap-delay="0.15"
            >
              Our experienced advisors are here to understand your needs and
              guide you through every step of your real estate journey.
            </p>

            {/* CTA Buttons */}
            <div className="svc-cta__actions">
              <a
                href="/contact"
                className="svc-cta__btn svc-cta__btn--primary"
                data-gsap="btn-clip-reveal"
                data-gsap-delay="0.2"
              >
                <MessageCircle size={20} />
                <span>Talk to an Expert</span>
                <ArrowRight size={18} />
              </a>
              <a
                data-gsap="btn-clip-reveal"
                data-gsap-delay="0.2"
                href="tel:+61450009291"
                className="svc-cta__btn svc-cta__btn--secondary"
              >
                <Phone size={18} />
                <span>0450 009 291</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              data-gsap="zoom-in"
              data-gsap-stagger="0.3 "
              className="svc-cta__trust"
            >
              <div className="svc-cta__trust-item">
                <span className="svc-cta__trust-value">15+</span>
                <span className="svc-cta__trust-label">Years Experience</span>
              </div>
              <div className="svc-cta__trust-divider" />
              <div className="svc-cta__trust-item">
                <span className="svc-cta__trust-value">2,500+</span>
                <span className="svc-cta__trust-label">Happy Clients</span>
              </div>
              <div className="svc-cta__trust-divider" />
              <div className="svc-cta__trust-item">
                <span className="svc-cta__trust-value">24/7</span>
                <span className="svc-cta__trust-label">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
