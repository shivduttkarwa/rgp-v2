import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BtnSecondary from "../components/BtnSecondary";
import "./HeroSection.css";

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const publicUrl = import.meta.env.BASE_URL || "/";
  const bgRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const titleOneRef = useRef<HTMLDivElement>(null);
  const titleTwoRef = useRef<HTMLDivElement>(null);
  const revealSubRef = useRef<HTMLDivElement>(null);
  const revealCtaRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can still be blocked on some devices; fallback keeps poster.
      }
    };

    void tryPlay();
    const handlePlaying = () => setVideoReady(true);
    video.addEventListener("playing", handlePlaying);
    return () => {
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  // Set initial states on mount — bg fully visible, only content hidden
  useEffect(() => {
    const bg = bgRef.current;
    const vignette = vignetteRef.current;
    const titleOne = titleOneRef.current;
    const titleTwo = titleTwoRef.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!bg || !vignette || !titleOne || !titleTwo || !revealSub || !revealCta)
      return;

    gsap.set(bg, { opacity: 1, scale: 1 });
    gsap.set(vignette, { opacity: 0.5 });
    gsap.set([titleOne, titleTwo], { y: 50, opacity: 0 });
    gsap.set([revealSub, revealCta], { x: -60, opacity: 0 });
    gsap.set(revealCta, { scale: 0.9 });
  }, []);

  // Animate titles + subtitle + CTA after ready
  useEffect(() => {
    if (!ready) return;

    const titleOne = titleOneRef.current;
    const titleTwo = titleTwoRef.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!titleOne || !titleTwo || !revealSub || !revealCta) return;

    const splitToChars = (el: HTMLElement) => {
      if (el.dataset.charSplit === "true") {
        return Array.from(el.querySelectorAll<HTMLElement>(".hero-char"));
      }
      el.dataset.charSplit = "true";

      const allChars: HTMLElement[] = [];
      const processText = (text: string, container: HTMLElement) => {
        const parts = text.split(/(\s+)/);
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            container.appendChild(document.createTextNode(part));
          } else if (part) {
            const wordWrap = document.createElement("span");
            wordWrap.className = "hero-word";
            wordWrap.style.cssText =
              "display:inline-block;overflow:hidden;vertical-align:top";
            part.split("").forEach((ch) => {
              const charSpan = document.createElement("span");
              charSpan.className = "hero-char";
              charSpan.style.display = "inline-block";
              charSpan.textContent = ch;
              wordWrap.appendChild(charSpan);
              allChars.push(charSpan);
            });
            container.appendChild(wordWrap);
          }
        });
      };

      const originalNodes = Array.from(el.childNodes);
      el.innerHTML = "";
      originalNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          processText(node.textContent || "", el);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const wrapper = document.createElement(
            (node as Element).nodeName.toLowerCase(),
          );
          Array.from((node as Element).attributes).forEach((attr) =>
            wrapper.setAttribute(attr.name, attr.value),
          );
          processText(node.textContent || "", wrapper);
          el.appendChild(wrapper);
        }
      });

      return allChars;
    };

    const titleOneChars = splitToChars(titleOne);
    const titleTwoChars = splitToChars(titleTwo);

    gsap.set([...titleOneChars, ...titleTwoChars], { y: 40, opacity: 0 });
    gsap.set([titleOne, titleTwo], { opacity: 1 });

    const tl = gsap.timeline({ delay: 0.9 });
    tl.to(titleOneChars, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "back.out(1.4)",
      stagger: 0.03,
    });
    tl.to(
      titleTwoChars,
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "back.out(1.4)",
        stagger: 0.03,
      },
      0.25,
    );
    tl.to(
      revealSub,
      { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
      0.9,
    );
    tl.to(
      revealCta,
      { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power4.out" },
      1,
    );

    return () => {
      tl.kill();
    };
  }, [ready]);

  /* ═══════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════ */
  return (
    <div className="rg-hero-wrap">
      <section className="rg-hero">
        <div
          className={`rg-hero__bg ${videoReady ? "rg-hero__bg--ready" : ""}`}
          ref={bgRef}
          aria-hidden="true"
        >
          <img
            className="rg-hero__bg-poster"
            src={`${publicUrl}images/hero-rpg-brisbane.jpg`}
            alt=""
            loading="eager"
            fetchPriority="high"
          />
          <video
            className="rg-hero__bg-video"
            ref={videoRef}
            src={`${publicUrl}vids/hero-rgp.mp4`}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            preload="auto"
            poster={`${publicUrl}images/hero-rpg-brisbane.jpg`}
            onLoadedMetadata={() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setVideoReady(true));
              });
            }}
            onCanPlay={() => {
              setVideoReady(true);
              void videoRef.current?.play();
            }}
          />
        </div>
        <div
          className="rg-hero__vignette"
          ref={vignetteRef}
          aria-hidden="true"
        ></div>
        {/* ── REVEAL ── */}
        <div className="rg-hero__reveal">
          <div className="rg-reveal__title">
            <div className="rg-reveal__line">
              <div className="rg-reveal__text" ref={titleOneRef}>
                Luxury <span className="rg-gold">Redefined</span>
              </div>
            </div>
            <div className="rg-reveal__line">
              <div className="rg-reveal__text" ref={titleTwoRef}>
                Living <span className="rg-amber">Elevated</span>
              </div>
            </div>
          </div>
          <div className="rg-reveal__sub" ref={revealSubRef}>
            350+ premium properties delivered — luxury villas, penthouses &amp;
            exclusive estates crafted for those who demand the extraordinary.
          </div>
          <div className="rg-reveal__cta" ref={revealCtaRef}>
            <BtnSecondary label="Explore Properties" />
          </div>
        </div>
      </section>
    </div>
  );
}
