import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bath,
  Bed,
  Car,
  CheckCircle,
  MapPin,
  Square,
  Tag,
} from "lucide-react";
import "../../sections/PropertyListingsection.css";
import "./PropertyMarqee.css";

/**
 * RealGold Properties — Marquee Property Slider
 * - Continuous marquee (seamless loop)
 * - Faster speed (tweak SPEED_PX_PER_SEC)
 * - No hover pause (continuous marquee)
 * - Drag/swipe with inertia
 * - Better, more aesthetic cards (glass, premium borders, elegant typography)
 *
 * Drop this into your project as: PropertyMarquee.tsx
 * Requires your :root variables already defined globally.
 */

type PropertyCard = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  features: string[];
  badge?: string;
  isNew?: boolean;
  category: "for-sale" | "sold" | "for-rent";
  image: string;
  slug: string;
};

const badgeClass = (badge?: string) => {
  if (!badge) return "";
  const value = badge.toLowerCase();
  if (value.includes("premium")) return "badge-premium";
  if (value.includes("featured")) return "badge-featured";
  if (value.includes("new")) return "badge-new";
  if (value.includes("hot")) return "badge-hot";
  return "";
};

const formatPrice = (price: number, isRent = false) => {
  const formatted = price.toLocaleString("en-US");
  return isRent ? `$${formatted}/mo` : `$${formatted}`;
};

const PropertyCardMarquee = ({ property }: { property: PropertyCard }) => {
  const isSold = property.category === "sold";
  const isRent = property.category === "for-rent";
  const displayPrice = isSold ? property.price : property.price;

  return (
    <div className={`property-card ${property.category}`}>
      <div className="card-image-wrapper">
        <img
          src={property.image}
          alt={property.title}
          className={`card-image ${isSold ? "sold" : ""}`}
          draggable={false}
        />
        <div className="card-overlay" />

        <div className="card-badges">
          {property.badge && (
            <span className={`badge ${badgeClass(property.badge)}`}>
              <Tag size={12} />
              {property.badge}
            </span>
          )}
          {property.isNew && <span className="badge badge-new">New Listing</span>}
          {isSold && (
            <span className="badge badge-sold">
              <CheckCircle size={12} />
              Sold
            </span>
          )}
        </div>

        <div className="card-price-wrapper">
          <div className="price-info">
            <span className="price-current">
              {formatPrice(displayPrice, isRent)}
            </span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{property.title}</h3>
          <div className="card-location">
            <MapPin size={14} />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="card-stats">
          <div className="stat">
            <div className="stat-icon">
              <Bed size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.beds}</span>
              <span className="stat-label">Beds</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Bath size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.baths}</span>
              <span className="stat-label">Baths</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Square size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">
                {(property.sqft / 1000).toFixed(1)}k
              </span>
              <span className="stat-label">Sq Ft</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Car size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.garage}</span>
              <span className="stat-label">Garage</span>
            </div>
          </div>
        </div>

        <div className="card-features">
          {property.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>

        <Link to={`/properties/${property.slug}`} className="card-btn btn-primary">
          <span>View Property</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function PropertyMarquee() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const SPEED_PX_PER_SEC = 42; // ✅ increased marquee speed (was ~18)
  const GAP_PX_FALLBACK = 18;

  const items: PropertyCard[] = useMemo(
    () => [
      {
        id: "p1",
        title: "Harborline Residences",
        location: "Sydney, AU",
        price: 2450000,
        beds: 4,
        baths: 3,
        sqft: 4200,
        garage: 2,
        features: ["Waterfront", "Infinity Pool", "Private Dock"],
        badge: "Featured",
        isNew: true,
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=85",
        slug: "harborline-residences",
      },
      {
        id: "p2",
        title: "Canopy Estate",
        location: "Gold Coast, AU",
        price: 1890000,
        beds: 5,
        baths: 4,
        sqft: 5100,
        garage: 3,
        features: ["Garden Courtyard", "Chef Kitchen", "Cinema Room"],
        badge: "Premium",
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=85",
        slug: "canopy-estate",
      },
      {
        id: "p3",
        title: "Midtown Skylofts",
        location: "Melbourne, AU",
        price: 1320000,
        beds: 3,
        baths: 2,
        sqft: 2100,
        garage: 2,
        features: ["City Views", "Concierge", "Private Lift"],
        badge: "New",
        isNew: true,
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=85",
        slug: "midtown-skylofts",
      },
      {
        id: "p4",
        title: "Cliffside Retreat",
        location: "Byron Bay, AU",
        price: 2890000,
        beds: 4,
        baths: 4,
        sqft: 4700,
        garage: 2,
        features: ["Ocean Terrace", "Sauna", "Guest Suite"],
        badge: "Featured",
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=85",
        slug: "cliffside-retreat",
      },
      {
        id: "p5",
        title: "Verdant Row",
        location: "Brisbane, AU",
        price: 1180000,
        beds: 3,
        baths: 2,
        sqft: 1800,
        garage: 2,
        features: ["Park Front", "Smart Home", "EV Ready"],
        badge: "Hot",
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1600&q=85",
        slug: "verdant-row",
      },
      {
        id: "p6",
        title: "Seabreeze Terrace",
        location: "Perth, AU",
        price: 990000,
        beds: 2,
        baths: 2,
        sqft: 1500,
        garage: 1,
        features: ["Sunset Deck", "Open Plan", "Secure Parking"],
        category: "for-sale",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
        slug: "seabreeze-terrace",
      },
    ],
    [],
  );

  // Duplicate items for seamless marquee (we will render A + A)
  const doubled = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // ----- Helpers -----
    const getGap = () => {
      const cs = window.getComputedStyle(track);
      const g = parseFloat((cs.columnGap || cs.gap || "") as string);
      return Number.isFinite(g) ? g : GAP_PX_FALLBACK;
    };

    const getSetWidth = () => {
      // width of the FIRST set of cards (items.length), including gaps between them
      const children = Array.from(track.children) as HTMLElement[];
      const count = items.length;
      const gap = getGap();
      let w = 0;

      for (let i = 0; i < count; i++) {
        const el = children[i];
        if (!el) break;
        w += el.getBoundingClientRect().width;
        if (i < count - 1) w += gap;
      }
      return w;
    };

    // ----- Animation State -----
    let x = 0;
    let speed = SPEED_PX_PER_SEC;

    // Drag state
    let isDown = false;
    let startX = 0;
    let startOffset = 0;

    // velocity for inertia
    let lastMoveTime = 0;
    let lastMoveX = 0;
    let velocity = 0;

    // Pause control
    const shouldAutoMove = () => !isDown;

    let startY = 0;
    let hasIntent = false;
    const INTENT_PX = 6;

    const getClient = (e: PointerEvent | TouchEvent) => {
      const t = (e as TouchEvent).touches && (e as TouchEvent).touches[0];
      return t ? { x: t.clientX, y: t.clientY } : { x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY };
    };

    const onDown = (e: PointerEvent | TouchEvent) => {
      const { x: clientX, y: clientY } = getClient(e);
      startX = clientX;
      startY = clientY;
      startOffset = x;
      velocity = 0;
      lastMoveTime = performance.now();
      lastMoveX = clientX;
      const isPointer = "pointerType" in e;
      const isMouse = isPointer && (e as PointerEvent).pointerType === "mouse";
      if (isMouse) {
        hasIntent = true;
        isDown = true;
        viewport.classList.add("rgMarquee_dragging");
      } else {
        hasIntent = false;
        isDown = false;
      }
      // don't prevent default here to allow vertical scroll on touch
    };

    const onMove = (e: PointerEvent | TouchEvent) => {
      const isPointer = "pointerType" in e;
      const isMouse = isPointer && (e as PointerEvent).pointerType === "mouse";
      if (isMouse && !(e as PointerEvent).buttons) {
        return;
      }
      const { x: clientX, y: clientY } = getClient(e);
      const dx = clientX - startX;
      const dy = clientY - startY;

      if (!hasIntent) {
        if (Math.abs(dx) > Math.abs(dy) + INTENT_PX) {
          hasIntent = true;
          isDown = true;
          viewport.classList.add("rgMarquee_dragging");
        } else if (Math.abs(dy) > Math.abs(dx) + INTENT_PX) {
          // vertical scroll intent
          return;
        } else {
          return;
        }
      }

      if (!isDown) return;

      x = startOffset + dx;

      const now = performance.now();
      const dt = Math.max(16, now - lastMoveTime);
      const dv = clientX - lastMoveX;
      velocity = dv / dt; // px per ms

      lastMoveTime = now;
      lastMoveX = clientX;
      if ("preventDefault" in e) e.preventDefault();
    };

    const onUp = () => {
      if (!isDown) {
        viewport.classList.remove("rgMarquee_dragging");
        return;
      }
      isDown = false;
      hasIntent = false;
      viewport.classList.remove("rgMarquee_dragging");

      // Inertia
      let throwSpeed = velocity * 1000; // px/sec
      throwSpeed = clamp(throwSpeed, -2200, 2200); // slightly more premium/controlled

      let inertia = throwSpeed;
      const decay = 0.92;

      const drift = () => {
        if (Math.abs(inertia) < 10) return;
        x += inertia * (16 / 1000);
        inertia *= decay;
        requestAnimationFrame(drift);
      };
      requestAnimationFrame(drift);
    };

    // Pointer events
    viewport.addEventListener("pointerdown", onDown as any, { passive: false });
    window.addEventListener("pointermove", onMove as any, { passive: false });
    window.addEventListener("pointerup", onUp);

    // Touch fallback
    viewport.addEventListener("touchstart", onDown as any, { passive: false });
    window.addEventListener("touchmove", onMove as any, { passive: false });
    window.addEventListener("touchend", onUp);

    // RAF loop
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (shouldAutoMove()) {
        speed = SPEED_PX_PER_SEC;
        x -= speed * dt;
      }

      const setW = getSetWidth();

      // Keep x in [-setW, 0] to loop seamlessly
      if (setW > 0) {
        if (x <= -setW) x += setW;
        if (x >= 0) x -= setW;
      }

      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const setW = getSetWidth();
      if (setW > 0) {
        while (x <= -setW) x += setW;
        while (x >= 0) x -= setW;
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("pointerdown", onDown as any);
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("pointerup", onUp);

      viewport.removeEventListener("touchstart", onDown as any);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);

      window.removeEventListener("resize", onResize);
    };
  }, [GAP_PX_FALLBACK, SPEED_PX_PER_SEC, items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const cursor = cursorRef.current;
    if (!viewport || !cursor) return;

    const onEnter = () => {
      cursor.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, .card-btn")) {
        cursor.style.opacity = "0";
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, .card-btn")) {
        cursor.style.opacity = "1";
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.setProperty("--x", `${x}px`);
      cursor.style.setProperty("--y", `${y}px`);
    };

    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerover", onOver);
    viewport.addEventListener("pointerout", onOut);

    return () => {
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerover", onOver);
      viewport.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <section className="rgMarquee property-section">
      <div className="wrap">
        <header className="section-header">
          <div className="section-badge">
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Explore <em>Signature Homes</em>
          </h2>
          <p className="section-subtitle">
            A curated selection of standout residences from across our
            portfolio — updated regularly.
          </p>
        </header>
      </div>

      <div className="rgMarquee__rail" aria-label="Property marquee slider">
        <div className="rgMarquee__cursor" ref={cursorRef} aria-hidden="true">
          <span className="cursor-text">Drag</span>
        </div>
        <div
          className="rgMarquee__fade rgMarquee__fade--l"
          aria-hidden="true"
        />
        <div
          className="rgMarquee__fade rgMarquee__fade--r"
          aria-hidden="true"
        />

        <div className="rgMarquee__viewport" ref={viewportRef}>
          <div className="rgMarquee__track" ref={trackRef}>
            {doubled.map((p, idx) => (
              <div className="property-card-wrap" key={`${p.id}-${idx}`}>
                <PropertyCardMarquee property={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
