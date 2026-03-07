"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { premiumReveal, premiumTransition } from "@/lib/premiumMotion";

export default function AboutHero() {
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 720);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-dark pt-20"
      style={{ minHeight: "100svh" }}
    >
      <div
        className="absolute inset-0"
      >
        <img
          src="/hakkimizda-hero.jpeg"
          alt="Hakkımızda hero"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/98 via-black/84 to-black/26 md:from-black/95 md:via-black/72 md:to-black/18" />
      <div className="absolute inset-0 md:hidden bg-gradient-to-r from-black/95 via-black/78 to-black/30" />
      <div className="absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-black/86 via-black/54 to-transparent md:w-[58%] md:from-black/68 md:via-black/34" />
      <div className="absolute inset-0 bg-black/28 md:bg-black/22" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24 lg:px-12 xl:px-14">
        <motion.div
          className="max-w-[780px] space-y-5 sm:space-y-6"
          initial={premiumReveal.initial}
          animate={introReady ? premiumReveal.animate : premiumReveal.initial}
          transition={premiumTransition(0, 0.98)}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40 sm:text-xs">
            Hakkımızda
          </p>
          <h1 className="max-w-[14ch] text-[clamp(1.8rem,8.2vw,3.95rem)] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[60px]">
            <span className="inline-block pb-[0.18em]">Far restorasyonunda premium sonuç.</span>
          </h1>
          <p className="max-w-[29ch] text-[0.92rem] leading-relaxed text-white/84 sm:max-w-[65ch] sm:text-xl md:text-[1.3rem]">
            Aracın farını doğru teknikle yeniliyor, net görüş ve kalıcı sonuç
            sağlıyoruz.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
