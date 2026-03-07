"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants,
} from "@/lib/premiumMotion";

const workflow = [
  {
    title: "Araç kabul",
    detail: "Hasar tespiti ve işlem kapsamı netleştirilir.",
  },
  {
    title: "Uygulama",
    detail: "Onarım/değişim adımları kontrollü biçimde uygulanır.",
  },
  {
    title: "Kontrol",
    detail: "Optik performans ve sızdırmazlık doğrulanır.",
  },
  {
    title: "Teslim",
    detail: "Sonuç müşteriye görsel ve sözlü olarak açıklanır.",
  },
];

export default function WorkshopGallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-surface pb-16 pt-16 text-white sm:pb-20 sm:pt-20 md:pb-24 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-12 md:space-y-14"
        >
          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0, 0.82)}
            className="space-y-4"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              Atölyeden
            </p>
            <h2 className="max-w-[15ch] text-[clamp(2.1rem,10vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[58px] lg:text-[66px]">
              Kontrollü süreç, temiz çalışma, net teslim.
            </h2>
            <p className="max-w-[58ch] text-sm leading-relaxed text-white/72 sm:text-base md:text-lg">
              Atölye operasyonunu hız ve kalite arasında denge kuracak şekilde tasarladık.
              Müşteri için belirsizliği azaltan, ekip için standardı yükselten bir sistemle ilerliyoruz.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.figure
              variants={premiumVariants}
              transition={premiumTransition(0.08, 0.78)}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-dark"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/far.png"
                  alt="Far onarım atölyesinde çalışma anı"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5">
                <p className="text-sm font-medium tracking-tight sm:text-base">
                  Uygulama alanı: yüzey işlemi, izolasyon ve montaj adımları için ayrı çalışma zonları.
                </p>
              </figcaption>
            </motion.figure>

            <motion.figure
              variants={premiumVariants}
              transition={premiumTransition(0.14, 0.78)}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-dark"
            >
              <div className="relative aspect-[16/10] w-full lg:aspect-[10/13]">
                <Image
                  src="/temiz-far-bmw.webp"
                  alt="Restorasyon sonrası far sonucu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5">
                <p className="text-sm font-medium tracking-tight sm:text-base">
                  Teslim standardı: net görüş, dengeli ışık dağılımı, temiz finish.
                </p>
              </figcaption>
            </motion.figure>
          </div>

          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.22, 0.82)}
            className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-7"
          >
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Atölye İş Akışı</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-4 md:gap-4">
              {workflow.map((item, index) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/46">
                    Adım {index + 1}
                  </p>
                  <p className="mt-1 text-base font-semibold tracking-tight">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
