"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { premiumReveal, premiumTransition } from "@/lib/premiumMotion";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const mission1Ref = useRef<HTMLParagraphElement>(null);
  const mission2Ref = useRef<HTMLParagraphElement>(null);
  const lightOverlayRef = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mobileHeroHeight, setMobileHeroHeight] = useState<number | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileHeroHeight(window.innerHeight);
      setIsMobileViewport(true);
    }
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const globalWindow = window as Window & { __heroScrollLocked?: boolean };
    const scrollYBeforeLock = window.scrollY;
    const preventScroll = (e: Event) => e.preventDefault();
    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Spacebar"];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };
    if (globalWindow) {
      globalWindow.__heroScrollLocked = isScrollLocked;
    }
    window.dispatchEvent(
      new CustomEvent("hero-scroll-lock", {
        detail: { locked: isScrollLocked },
      })
    );

    if (isScrollLocked) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = `-${scrollYBeforeLock}px`;

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";
      const top = body.style.top;
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      const restoreY = top ? Math.abs(parseInt(top, 10)) : 0;
      if (!Number.isNaN(restoreY)) window.scrollTo(0, restoreY);

      window.removeEventListener("wheel", preventScroll as EventListener);
      window.removeEventListener("touchmove", preventScroll as EventListener);
      window.removeEventListener("keydown", preventKeyScroll as EventListener);
    }

    return () => {
      if (globalWindow) {
        globalWindow.__heroScrollLocked = false;
      }
      window.dispatchEvent(
        new CustomEvent("hero-scroll-lock", {
          detail: { locked: false },
        })
      );
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      window.removeEventListener("wheel", preventScroll as EventListener);
      window.removeEventListener("touchmove", preventScroll as EventListener);
      window.removeEventListener("keydown", preventKeyScroll as EventListener);
    };
  }, [isScrollLocked]);

  const { isPreloaderDone } = usePreloader();

  useEffect(() => {
    if (!isPreloaderDone) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      setIntroReady(true);
      setIsScrollLocked(false);
      if (lightOverlayRef.current) {
        gsap.set(lightOverlayRef.current, { opacity: 0 });
      }
      return;
    }

    let ctx: gsap.Context | null = null;
    let introTl: gsap.core.Timeline | null = null;
    let introFallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const unlockAfterReady = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsScrollLocked(false);
        });
      });
    };

    const initScrollTrigger = () => {
      ctx = gsap.context(() => {
        const els = {
          section: sectionRef.current,
          image: imageRef.current,
          header: headerRef.current,
          white: whiteRef.current,
          hint: hintRef.current,
          mission: missionRef.current,
          mission1: mission1Ref.current,
          mission2: mission2Ref.current,
        };
        if (Object.values(els).some((el) => !el)) return;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const zoomStrength = isMobile ? 3.9 : 6;
        const blurMax = isMobile ? 8 : 20;
        const pinLength = isMobile ? 1.15 : 1.5;
        const mission1Start = isMobile ? 0.46 : 0.5;
        const mission2Start = isMobile ? 0.57 : 0.6;

        // Set initial states
        gsap.set(els.image, { scale: 1, filter: 'blur(0px)' });
        gsap.set(els.header, { opacity: 1 });
        gsap.set(els.hint, { opacity: 1 });
        gsap.set(els.white, { opacity: 0 });
        gsap.set(els.mission, { opacity: 1 });
        gsap.set(els.mission1, { opacity: 0 });
        gsap.set(els.mission2, { opacity: 0 });

        // Kill any existing ScrollTriggers on this element
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === els.section) st.kill();
        });

        ScrollTrigger.create({
          trigger: els.section,
          start: "top top",
          end: () => `+=${window.innerHeight * pinLength}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Zoom + blur on image as we approach white.
            const scale = 1 + p * zoomStrength;
            const imageBlur = p <= 0.15 ? 0 : ((p - 0.15) / 0.85) * blurMax;
            gsap.set(els.image, { 
              scale,
              filter: `blur(${imageBlur}px)`
            });

            // Header fades
            const headerOpacity = p <= 0.15 ? 1 : Math.max(0, 1 - (p - 0.15) / 0.15);
            gsap.set(els.header, {
              opacity: headerOpacity,
            });

            // Hint
            gsap.set(els.hint, { opacity: Math.max(0, 1 - p / 0.08) });

            // White flash (entering the light) - starts earlier
            const whiteOpacity = p <= 0.2 ? 0 : (p - 0.2) / 0.8;
            gsap.set(els.white, { opacity: whiteOpacity });

            // Mission text 1 - reveal from top-left with blur gradient
            const mission1Progress = p <= mission1Start ? 0 : Math.min(1, (p - mission1Start) / 0.25);
            const mission1Opacity = mission1Progress > 0 ? 1 : 0;
            // Create a diagonal gradient reveal effect
            const mission1GradientPos = mission1Progress * 150; // 0 to 150%
            gsap.set(els.mission1, { 
              opacity: mission1Opacity,
              WebkitMaskImage: `linear-gradient(135deg, 
                rgba(0,0,0,1) ${mission1GradientPos - 30}%, 
                rgba(0,0,0,0.3) ${mission1GradientPos}%, 
                rgba(0,0,0,0) ${mission1GradientPos + 20}%)`,
              maskImage: `linear-gradient(135deg, 
                rgba(0,0,0,1) ${mission1GradientPos - 30}%, 
                rgba(0,0,0,0.3) ${mission1GradientPos}%, 
                rgba(0,0,0,0) ${mission1GradientPos + 20}%)`
            });

            // Mission text 2 - reveal from top-left with blur gradient (delayed)
            const mission2Progress = p <= mission2Start ? 0 : Math.min(1, (p - mission2Start) / 0.25);
            const mission2Opacity = mission2Progress > 0 ? 1 : 0;
            const mission2GradientPos = mission2Progress * 150;
            gsap.set(els.mission2, { 
              opacity: mission2Opacity,
              WebkitMaskImage: `linear-gradient(135deg, 
                rgba(0,0,0,1) ${mission2GradientPos - 30}%, 
                rgba(0,0,0,0.3) ${mission2GradientPos}%, 
                rgba(0,0,0,0) ${mission2GradientPos + 20}%)`,
              maskImage: `linear-gradient(135deg, 
                rgba(0,0,0,1) ${mission2GradientPos - 30}%, 
                rgba(0,0,0,0.3) ${mission2GradientPos}%, 
                rgba(0,0,0,0) ${mission2GradientPos + 20}%)`
            });
          },
        });
      }, sectionRef);
    };

    const runHeroIntro = () => {
      if (!imageRef.current || !lightOverlayRef.current) {
        setIntroReady(true);
        initScrollTrigger();
        setTimeout(() => {
          ScrollTrigger.refresh();
          unlockAfterReady();
        }, 80);
        return;
      }

      introTl = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          if (introFallbackTimer) {
            clearTimeout(introFallbackTimer);
            introFallbackTimer = null;
          }
          initScrollTrigger();
          setTimeout(() => {
            ScrollTrigger.refresh();
            unlockAfterReady();
          }, 80);
        },
      });

      introTl
        .set(imageRef.current, {
          scale: 1,
          filter: "blur(1.5px)",
          transformOrigin: "50% 50%",
        })
        .set(lightOverlayRef.current, { opacity: 1, "--revealRadius": "0vmax" })
        .to(
          lightOverlayRef.current,
          {
            "--revealRadius": "120vmax",
            duration: 1.82,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          imageRef.current,
          {
            filter: "blur(0px)",
            duration: 1.82,
            ease: "power2.inOut",
          },
          0
        )
        .call(() => {
          setIntroReady(true);
        }, [], 0.76)
        .to(
          lightOverlayRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "+=0.04"
        );
    };

    // Fallback: if intro timeline cannot complete (image/network edge cases), keep UI usable.
    introFallbackTimer = setTimeout(() => {
      setIntroReady(true);
      if (!ScrollTrigger.getAll().some((st) => st.trigger === sectionRef.current)) {
        initScrollTrigger();
        setTimeout(() => {
          ScrollTrigger.refresh();
          unlockAfterReady();
        }, 80);
      } else {
        unlockAfterReady();
      }
    }, 2600);

    runHeroIntro();

    // Handle viewport resize (mobile address bar hide/show)
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (introFallbackTimer) {
        clearTimeout(introFallbackTimer);
      }
      introTl?.kill();
      ctx?.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isPreloaderDone]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-dark"
      style={mobileHeroHeight ? { height: `${mobileHeroHeight}px` } : { height: "100dvh" }}
    >
      <div className="h-full w-full max-w-none px-0">
        <div className="relative h-full overflow-hidden bg-dark">
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Luxury car headlight"
              className="hidden h-full w-full object-cover md:block"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-mobile.png"
              alt="Luxury car headlight"
              className="block h-full w-full object-cover object-center md:hidden"
            />
          </div>

          <div
            ref={headerRef}
            className="absolute inset-0 z-10 flex flex-col justify-between px-[clamp(16px,3.2vw,56px)] pb-[clamp(56px,7vw,112px)] pt-[clamp(20px,3vw,40px)] will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <div className="mt-[clamp(64px,10vh,132px)] flex items-start justify-end">
              {/* Top Right Heading (Mobile: Top Right, Desktop: Top Right) */}
              <motion.h1
                className="max-w-[11ch] pb-2 text-right text-[clamp(1.95rem,6.3vw,5.8rem)] font-medium leading-[0.9] tracking-tighter text-white md:mr-[clamp(10px,2.2vw,44px)] md:max-w-none md:pb-0"
                style={{ fontFamily: "Satoshi, sans-serif" }}
                initial={premiumReveal.initial}
                animate={introReady ? premiumReveal.animate : premiumReveal.initial}
                transition={premiumTransition(-0.12, 1.1)}
              >
                Onarım Odaklı<br />Çözüm
              </motion.h1>
            </div>
            {/* Bottom section layout container */}
            <div className="mb-[clamp(38px,5.2vh,90px)] flex flex-col justify-end gap-3 sm:gap-4 md:items-start md:gap-5 md:flex-col">
              
              {/* Bottom Left Heading */}
              <motion.div
                className="w-full text-left md:order-1 md:ml-[clamp(10px,2.8vw,56px)] md:max-w-none md:text-left"
                initial={premiumReveal.initial}
                animate={introReady ? premiumReveal.animate : premiumReveal.initial}
                transition={premiumTransition(-0.08, 1.08)}
              >
                <h2
                  className="pr-0 pb-2 text-[clamp(1.95rem,6.3vw,5.8rem)] font-medium leading-[0.9] tracking-tighter text-white md:pr-2 md:pb-0"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  Geceye<br />İmza Netlik
                </h2>
              </motion.div>

              {/* Description (Mobile: Bottom Left, Desktop: Bottom Left under heading) */}
              <motion.div
                className="max-w-[300px] text-left md:order-2 md:ml-[clamp(10px,2.8vw,56px)] md:max-w-[min(88vw,620px)] md:text-left"
                initial={premiumReveal.initial}
                animate={introReady ? premiumReveal.animate : premiumReveal.initial}
                transition={premiumTransition(-0.02, 1.08)}
              >
                <p className="mb-4 font-satoshi text-[clamp(0.95rem,1.55vw,1.9rem)] leading-relaxed text-white/78 md:mb-5 md:text-white/92">
                  <span className="block">Çünkü biz biliyoruz ki; doğru aydınlatma,</span>
                  <span className="block">güvenli bir yolculuğun başlangıcıdır.</span>
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            ref={hintRef}
            className="pointer-events-none absolute bottom-6 inset-x-0 z-10 flex flex-col items-center gap-2 md:bottom-8 lg:bottom-10"
            initial={premiumReveal.initial}
            animate={introReady ? premiumReveal.animate : premiumReveal.initial}
            transition={premiumTransition(0.08, 0.92)}
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/30">Kaydır</span>
            <div className="flex h-8 w-5 justify-center rounded-full border border-white/20 pt-1.5">
              <div className="h-1 w-1 animate-bounce rounded-full bg-accent" />
            </div>
          </motion.div>

          <div ref={whiteRef} className="absolute inset-0 z-20 bg-white opacity-0 will-change-[opacity]" />

          {/* Light reveal overlay - dark overlay that fades out to reveal the headlight */}
          <div
            ref={lightOverlayRef}
            className="absolute inset-0 z-16 pointer-events-none"
            style={
              {
                opacity: isMobileViewport ? 0 : 1,
                "--revealRadius": "0vmax",
                background:
                  "radial-gradient(circle at 50.5% 53.5%, rgba(0,0,0,0) var(--revealRadius), rgba(0,0,0,1) calc(var(--revealRadius) + 2.2vmax))",
              } as Record<string, string | number>
            }
          />

          <div
            className="absolute inset-0 z-[17] pointer-events-none"
            style={
              {
                opacity: isMobileViewport ? 0 : 0.12,
                mixBlendMode: "screen",
                filter: "blur(1.8px)",
                background:
                  "radial-gradient(circle at 50.5% 53.5%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.12) 5.5%, rgba(255,255,255,0) 12%)",
              } as Record<string, string | number>
            }
          />

          {/* Mission text on white background */}
          <div
            ref={missionRef}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-[clamp(16px,3.2vw,56px)] py-[clamp(42px,7vh,96px)]"
            style={{ opacity: 1 }}
          >
            <div className="w-full max-w-[1600px] space-y-8 md:space-y-10">
              <p
                ref={mission1Ref}
                className="text-[clamp(1.22rem,2.45vw,2.85rem)] font-medium leading-[1.24] tracking-[-0.015em] text-[#111111]"
                style={{
                  opacity: 0,
                  fontFamily: "Satoshi, sans-serif",
                  WebkitMaskImage: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                  maskImage: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)"
                }}
              >
                Firmamız, yüksek maliyetli parça değişimi yerine mümkün olan her durumda onarım ve yenileme odaklı çözümler sunarak, sigorta şirketleri ve filo firmalarına ekonomik ve sürdürülebilir hizmet sağlamayı amaçlar.
              </p>

              <p
                ref={mission2Ref}
                className="text-[clamp(1.22rem,2.45vw,2.85rem)] font-medium leading-[1.24] tracking-[-0.015em] text-[#111111]"
                style={{
                  opacity: 0,
                  fontFamily: "Satoshi, sans-serif",
                  WebkitMaskImage: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                  maskImage: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)"
                }}
              >
                Tüm uygulamalarımızda orijinal far yapısının korunması, sızdırmazlığın sağlanması ve ışık performansının fabrika standartlarına yakın seviyede geri kazandırılması önceliğimizdir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
