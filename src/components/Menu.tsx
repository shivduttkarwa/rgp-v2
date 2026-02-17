import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showButton?: boolean;
}

export default function Menu({ isOpen, onOpenChange, showButton = true }: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof isOpen === "boolean";
  const open = isControlled ? isOpen : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (open) {
      body.classList.add("menu-open");
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      body.classList.remove("menu-open");
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      body.classList.remove("menu-open");
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger Button */}
      {showButton && (
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="hamburger-box">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      )}

      {/* Overlay Menu */}
      <nav className={`overlay-menu ${open ? "active" : ""}`}>
        {/* Animated Background Panels */}
        <div className="menu-bg">
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
        </div>

        <div className="menu-content">
          {/* Navigation */}
          <div className="menu-main">
            <ul className="menu-nav">
              {[
                { num: "01", label: "Home",         to: "/" },
                { num: "02", label: "About",        to: "/about" },
                { num: "03", label: "Services",     to: "/services" },
                { num: "04", label: "Testimonials", to: "/testimonials" },
                { num: "05", label: "Contact",      to: "/contact" },
              ].map(({ num, label, to }) => (
                <li className="menu-item" key={to}>
                  <Link to={to} className="menu-link" onClick={closeMenu}>
                    <span className="menu-number">{num}</span>
                    <span className="menu-text">{label}</span>
                    <svg
                      className="menu-arrow"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aside Info */}
          <aside className="menu-aside">
            <div>
              <div className="menu-info-block">
                <div className="menu-info-label">Location</div>
                <p className="menu-info-text">
                  PO Box 4024
                  <br />
                  Forest Lake QLD 4078
                </p>
              </div>

              <div className="menu-info-block">
                <div className="menu-info-label">Contact</div>
                <p className="menu-info-text">
                  <a href="mailto:admin@realgoldproperties.com.au">
                    admin@realgoldproperties.com.au
                  </a>
                  <br />
                  <a href="tel:+61450009291">0450 009 291</a>
                </p>
              </div>
            </div>

            <div className="menu-social">
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">Dribbble</a>
              <a href="#">LinkedIn</a>
            </div>
          </aside>
        </div>

      </nav>
    </>
  );
}
