"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.innerWidth < 1025 ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!isTouchDevice) {
      lenis = new Lenis({
        duration: 1.45,
        smoothWheel: true,
        wheelMultiplier: 0.88,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });
    }

    const syncScroll = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", syncScroll);
    window.addEventListener("load", syncScroll);

    // Refresh after Lenis is ready and after initial layout settles
    const initRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      clearTimeout(initRefreshTimer);
      window.removeEventListener("resize", syncScroll);
      window.removeEventListener("load", syncScroll);
    };
  }, []);

  return <>{children}</>;
}
