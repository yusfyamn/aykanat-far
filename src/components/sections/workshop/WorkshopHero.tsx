"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { premiumReveal, premiumTransition } from "@/lib/premiumMotion";

const desktopImages = [
  "/far-atolyesi.jpeg",
  "/far-atolyesi1.jpeg",
  "/far-atolyesi2.jpeg",
  "/far-atolyesi3.jpeg",
];

const mobileImages = [
  "/mobil-far-onarim-hero1.webp",
  "/mobil-far-onarim-hero2.webp",
  "/mobil-far-onarim-hero3.webp",
  "/mobil-far-onarim-hero4.webp",
];

export default function WorkshopHero() {
  const [index, setIndex] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeImages = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);
  const safeIndex = useMemo(
    () => ((index % activeImages.length) + activeImages.length) % activeImages.length,
    [index, activeImages.length]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeImages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [activeImages.length]);

  useEffect(() => {
    setIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 720);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex w-full h-[100svh] items-center overflow-hidden bg-dark pt-20 md:h-screen"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImages[safeIndex]}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeImages[safeIndex]}
              alt="Far onarım atölyesi"
              fill
              priority={safeIndex === 0}
              sizes="100vw"
              className="object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/98 via-black/84 to-black/26 md:from-black/95 md:via-black/72 md:to-black/18" />
      <div className="absolute inset-0 md:hidden bg-gradient-to-r from-black/95 via-black/78 to-black/30" />
      <div className="absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-black/86 via-black/54 to-transparent md:w-[58%] md:from-black/68 md:via-black/34" />
      <div className="absolute inset-0 bg-black/28 md:bg-black/22" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          className="max-w-[860px] space-y-5 sm:space-y-6"
          initial={premiumReveal.initial}
          animate={introReady ? premiumReveal.animate : premiumReveal.initial}
          transition={premiumTransition(0, 0.96)}
        >
          <p className="text-[12px] uppercase tracking-[0.22em] text-white/42 sm:text-xs">Far Atölyesi</p>
          <h1 className="max-w-[14ch] pb-[0.1em] text-[clamp(1.9rem,8.6vw,3.95rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            Far Onarım Atölyesi
          </h1>
          <p className="max-w-[29ch] text-[0.98rem] leading-relaxed text-white/84 sm:max-w-[65ch] sm:text-xl md:text-[1.3rem]">
            Her araca özel planla, doğru ekipman ve uzman uygulamayla kalıcı onarım
            sonucu üretiyoruz.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex w-[min(1280px,92vw)] -translate-x-1/2 gap-2 rounded-full bg-black/28 px-3 py-2 md:backdrop-blur-md">
        {activeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Görsel ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/22 transition-colors hover:bg-white/35"
          >
            <motion.span
              key={`${safeIndex}-${i}`}
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              initial={{ width: i < safeIndex ? "100%" : i === safeIndex ? "0%" : "0%" }}
              animate={{ width: i < safeIndex ? "100%" : i === safeIndex ? "100%" : "0%" }}
              transition={{ duration: i === safeIndex ? 4.2 : 0.35, ease: "linear" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
