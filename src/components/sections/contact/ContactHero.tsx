"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { premiumReveal, premiumTransition } from "@/lib/premiumMotion";
import { PremiumAnchorButton, PremiumLinkButton } from "@/components/ui/PremiumCta";

const trustItems = [
  { value: "15 dk", label: "Ortalama ilk geri dönüş" },
  { value: "Pzt-Cts", label: "09:00 - 19:00 aktif destek" },
  { value: "%97", label: "Memnuniyet oranı" },
];

export default function ContactHero() {
  const [introReady, setIntroReady] = useState(false);
  const [mobileHeroHeight, setMobileHeroHeight] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setMobileHeroHeight(window.innerHeight);
    }
  }, []);

  return (
    <section
      className="relative flex w-full items-center overflow-hidden bg-dark pt-20 max-[430px]:pt-16 max-[393px]:pt-14 md:min-h-screen"
      style={mobileHeroHeight ? { height: `${mobileHeroHeight}px` } : { minHeight: "100dvh" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 24%, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 48%), radial-gradient(circle at 86% 80%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 45%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/80" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 max-[430px]:px-3 max-[430px]:pb-12 max-[393px]:px-2.5 max-[393px]:pb-11 sm:px-6 sm:pb-20 md:px-8 md:pb-24 lg:px-10 xl:px-12">
        <motion.div
          className="max-w-[820px] space-y-5 max-[430px]:space-y-4 sm:space-y-6"
          initial={premiumReveal.initial}
          animate={introReady ? premiumReveal.animate : premiumReveal.initial}
          transition={premiumTransition(0, 0.98)}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40 sm:text-xs">
            Iletisim
          </p>
          <h1 className="max-w-[15ch] text-[clamp(2.3rem,10vw,5rem)] font-semibold leading-[0.9] tracking-[-0.03em] max-[430px]:max-w-[16ch] max-[430px]:text-[clamp(1.7rem,8.9vw,2.38rem)] max-[393px]:text-[clamp(1.58rem,8.8vw,2.22rem)] max-[375px]:text-[clamp(1.5rem,8.5vw,2.08rem)]">
            Araciniz icin en dogru far cozumunu birlikte netlestirelim.
          </h1>
          <p className="max-w-[62ch] text-sm leading-relaxed text-white/72 max-[430px]:text-[13px] max-[393px]:text-[12.5px] sm:text-base md:text-lg">
            Kisa bir on degerlendirme ile aracinizin ihtiyacini belirliyor,
            sure ve maliyet planini net sekilde paylasiyoruz. Size uygun
            saat araliginda hizli geri donus sagliyoruz.
          </p>

          <div className="flex flex-col gap-3 pt-2 max-[430px]:gap-2.5 sm:flex-row sm:items-center">
            <PremiumLinkButton
              href="#contact-form"
              className="max-[430px]:px-5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
            >
              Formu Doldur
            </PremiumLinkButton>
            <PremiumAnchorButton
              href="tel:+905551234567"
              className="max-[430px]:px-5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
            >
              Hemen Ara
            </PremiumAnchorButton>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-3 max-[430px]:mt-8 max-[430px]:gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-4"
          initial={premiumReveal.initial}
          animate={introReady ? premiumReveal.animate : premiumReveal.initial}
          transition={premiumTransition(0.18, 0.82)}
        >
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 md:backdrop-blur-sm max-[430px]:rounded-xl max-[430px]:px-4 max-[430px]:py-3 sm:px-6"
            >
              <p className="text-3xl font-semibold leading-none tracking-[-0.03em] max-[430px]:text-2xl sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-white/62 max-[430px]:text-[12px] sm:text-base">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
