import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import Menu from "./Menu";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const headerBgRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const publicUrl = import.meta.env.BASE_URL || "/";
  const logoSrc = `${import.meta.env.BASE_URL}images/RGP-logo.png`;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (headerRef.current) {
        if (isScrollingUp && currentScrollY > 100) {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          });
          if (headerBgRef.current) {
            gsap.to(headerBgRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        } else if (currentScrollY > 200) {
          gsap.to(headerRef.current, {
            y: "-100%",
            duration: 0.4,
            ease: "power3.out",
          });
        }

        if (currentScrollY <= 100 && headerBgRef.current) {
          gsap.to(headerBgRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    if (location.pathname === "/" || location.pathname === publicUrl) {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
    } else {
      gsap.set(headerRef.current, { y: 0 });
    }
  }, [location.pathname, publicUrl]);

  useEffect(() => {
    const logo = headerRef.current?.querySelector(
      ".rg-header__logo",
    ) as HTMLElement | null;
    if (!logo) return;

    gsap.killTweensOf(logo);
    if (isOpen) {
      if (headerBgRef.current) {
        gsap.to(headerBgRef.current, { scaleY: 0, transformOrigin: "top", duration: 0.3, ease: "power2.in" });
      }
      gsap.to(logo, {
        y: -20,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    } else {
      if (headerBgRef.current && window.scrollY > 100) {
        gsap.to(headerBgRef.current, { scaleY: 1, transformOrigin: "top", duration: 0.4, ease: "power3.out", delay: 1.3 });
      }
      gsap.set(logo, { y: -20, opacity: 0 });
      gsap.to(logo, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 1.4,
      });
    }
  }, [isOpen]);

  return (
    <>
      <header ref={headerRef} className="rg-header" aria-label="Site header">
        <div ref={headerBgRef} className="rg-header__bg" />
        <div className="rg-header__inner">
          <Link
            to="/"
            className="rg-header__logo"
            aria-label="Real Gold Properties"
          >
            <img src={logoSrc} alt="Real Gold Properties" />
          </Link>

          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-pressed={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="hamburger-box">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </header>
      <Menu isOpen={isOpen} onOpenChange={setIsOpen} showButton={false} />
    </>
  );
}
