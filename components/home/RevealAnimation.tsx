"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

let hasPlayedFullOnce = false;

export default function RevealAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
        return;
      }

      const isFirstLoad = !hasPlayedFullOnce;
      hasPlayedFullOnce = true;

      document.body.classList.add("playing-reveal");
      // Note: Since CustomEase and SplitText might not be available as plugins in the standard gsap package
      // (they are often part of GSAP Premium), we'll use standard eases and manual splitting.

      const isMobile = window.innerWidth <= 1000;

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
      });

      // Initial state setup for things that need to be hidden/positioned
      gsap.set(".reveal-char span", { y: "100%" });
      gsap.set(".reveal-tag .reveal-word", { y: "100%" });

      // Timeline Sequence
      if (isFirstLoad) {
        // 1. Tags appear
        tl.to(
          ".reveal-tag .reveal-word",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.1,
          },
          0.5,
        );

        // 2. Intro Title Characters Slide Up
        tl.to(
          ".reveal-intro-title .reveal-char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
          },
          0.5,
        );

        // 3. Intro Title Characters (except first) Slide Down
        tl.to(
          ".reveal-intro-title .reveal-char:not(.first-char) span",
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.05,
          },
          2,
        );

        // 4. Outro Title Characters (10) Slide Up
        tl.to(
          ".reveal-outro-title .reveal-char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.75,
          },
          2.5,
        );

        // 5. First Char Expansion/Movement
        tl.to(
          ".reveal-intro-title .first-char",
          {
            x: isMobile ? "2rem" : "6rem", // Adjusted for EXO vs original
            duration: 1,
          },
          3.5,
        );

        tl.to(
          ".reveal-outro-title .reveal-char",
          {
            x: isMobile ? "-1rem" : "-4rem",
            duration: 1,
          },
          3.5,
        );

        // 6. Final Transformation
        tl.to(
          ".reveal-intro-title .first-char",
          {
            x: isMobile ? "1.5rem" : "4.5rem",
            y: isMobile ? "-0.5rem" : "-1.5rem",
            fontWeight: "900",
            scale: 0.75,
            duration: 0.75,
          },
          4.5,
        );

        tl.to(
          ".reveal-outro-title .reveal-char",
          {
            x: isMobile ? "-1rem" : "-3rem",
            fontSize: isMobile ? "4rem" : "8rem",
            fontWeight: "500",
            duration: 0.75,
            onComplete: () => {
              gsap.set(".reveal-preloader", {
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              });
              gsap.set(".reveal-split-overlay", {
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              });
            },
          },
          4.5,
        );

        // 7. Hide Tags
        tl.to(
          ".reveal-tag .reveal-word",
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.1,
          },
          5.5,
        );
      } else {
        // Skip to end state for split
        gsap.set(".reveal-preloader", {
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        });
        gsap.set(".reveal-split-overlay", {
          clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
        });
      }

      // 8. Split and Reveal
      tl.to(
        [".reveal-preloader", ".reveal-split-overlay"],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            setIsVisible(false); // Remove from DOM after finish
            document.body.classList.remove("playing-reveal");
          },
        },
        isFirstLoad ? 6 : 0,
      );
    },
    { scope: containerRef },
  );

  if (!isVisible) return null;

  const splitTextToSpans = (
    text: string,
    className: string = "",
    addFirstCharClass: boolean = false,
  ) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={cn(
          "reveal-char",
          className,
          addFirstCharClass && i === 0 && "first-char",
        )}
      >
        <span>{char === " " ? "\u00A0" : char}</span>
      </span>
    ));
  };

  const splitWordsToSpans = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="reveal-word-wrapper">
        <span className="reveal-word">{word}</span>
        {i < text.split(" ").length - 1 && "\u00A0"}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="reveal-container fixed inset-0 z-9999 pointer-events-none overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        nav { display: none !important; }
        body { overflow: hidden !important; }
      `,
        }}
      />
      <div className="reveal-preloader reveal-overlay">
        <div className="reveal-intro-title">
          <h1 className="reveal-title-gradient">
            {splitTextToSpans("EXOPLANET", "", true)}
          </h1>
        </div>
        <div className="reveal-outro-title">
          <h1>{splitTextToSpans("10")}</h1>
        </div>
      </div>

      <div className="reveal-split-overlay reveal-overlay">
        <div className="reveal-intro-title">
          <h1 className="reveal-title-gradient">
            {splitTextToSpans("EXOPLANET", "", true)}
          </h1>
        </div>
        <div className="reveal-outro-title">
          <h1>{splitTextToSpans("10")}</h1>
        </div>
      </div>

      <div className="reveal-tags-overlay">
        <div className="reveal-tag tag-1">
          <p>{splitWordsToSpans("Pubg")}</p>
        </div>
        <div className="reveal-tag tag-2">
          <p>{splitWordsToSpans("Apex Legends")}</p>
        </div>
        <div className="reveal-tag tag-3">
          <p>{splitWordsToSpans("Valorant")}</p>
        </div>
      </div>
    </div>
  );
}
