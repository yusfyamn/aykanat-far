"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PremiumAnchorButton } from "@/components/ui/PremiumCta";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumTransition,
  premiumVariants,
} from "@/lib/premiumMotion";

export default function AboutCTA() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-8 pt-6 text-[#101010] max-[430px]:pb-7 max-[430px]:pt-5 max-[393px]:pb-6 max-[393px]:pt-4 sm:pt-8 md:pb-8 md:pt-8 lg:pb-2 lg:pt-6 xl:pb-2"
    >
      <div className="w-full px-2.5 sm:px-6 md:px-4">
        <div className="mx-auto w-full max-w-[1480px]">
          <motion.div
            variants={premiumVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={premiumTransition(0, 0.86)}
            className="relative overflow-hidden rounded-[20px] bg-dark px-3 py-10 text-white max-[430px]:px-2.5 max-[393px]:px-2 sm:rounded-[20px] sm:px-6 sm:py-14 md:rounded-[24px] md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-14"
          >
            <motion.div
              ref={parallaxRef}
              className="absolute inset-x-0 -top-24 -bottom-24"
              style={{ y: bgY }}
            >
              <div className="relative h-full w-full scale-[1.08] will-change-transform">
                <Image
                  src="/cta.webp"
                  alt="Arka plan"
                  fill
                  className="object-cover brightness-[0.84]"
                  sizes="100vw"
                />
              </div>
            </motion.div>
            <div className="absolute inset-0 md:hidden">
              <Image
                src="/cta-mobil.webp"
                alt="Arka plan"
                fill
                className="object-cover brightness-[0.84]"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/36 to-black/24" />

            <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-col items-center gap-8 max-[430px]:gap-6">
              <div>
                <motion.h2
                  variants={premiumVariants}
                  transition={premiumTransition(0.08, 0.82)}
                  className="mx-auto max-w-[14ch] pb-[0.1em] text-center text-[clamp(1.78rem,7.8vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] max-[430px]:max-w-none max-[430px]:text-[clamp(1.58rem,6.6vw,1.98rem)] max-[393px]:text-[clamp(1.5rem,6.4vw,1.9rem)] max-[375px]:text-[clamp(1.44rem,6.2vw,1.82rem)]"
                >
                  Farlarınız için doğru
                  <br />
                  planı birlikte çıkaralım.
                </motion.h2>

                <motion.p
                  variants={premiumVariants}
                  transition={premiumTransition(0.16, 0.78)}
                  className="mx-auto mt-4 max-w-[52ch] text-center text-[0.98rem] leading-relaxed text-white/72 max-[430px]:mt-3 max-[430px]:text-[0.9rem] max-[393px]:text-[0.86rem] sm:text-base md:mt-5 md:text-lg"
                >
                  <span className="block">Farın durumunu hızlıca analiz ediyor,</span>
                  <span className="block">en doğru işlemi net bir planla sunuyoruz.</span>
                </motion.p>
              </div>

              <motion.div
                variants={premiumVariants}
                transition={premiumTransition(0.22, 0.76)}
                className="flex flex-col items-center gap-2.5 max-[430px]:gap-2 md:gap-2.5 lg:gap-3"
              >
                <PremiumAnchorButton
                  href="https://wa.me/905065166156"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth={false}
                  className="mx-auto w-auto px-4 py-2.5 text-[14px] max-[430px]:py-2.5 max-[430px]:text-[13px] md:px-4 md:py-2.5 md:text-[14px] lg:px-5 lg:text-sm"
                >
                  Bize Ulaşın
                </PremiumAnchorButton>
                <p className="pt-1 text-center text-[0.85rem] tracking-[0.08em] text-white/55 max-[430px]:text-[0.8rem] sm:text-sm md:pt-0">
                  Pazartesi - Cumartesi | 09:00 - 19:00
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
