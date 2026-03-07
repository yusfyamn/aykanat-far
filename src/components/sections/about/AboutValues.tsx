"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion";

const values = [
  {
    title: "Profesyonel Ekipman",
    description: "Sektörün en gelişmiş restorasyon ekipmanları ve malzemeleri ile çalışıyoruz.",
    icon: "⚙️"
  },
  {
    title: "Uzman Kadro",
    description: "Yılların deneyimine sahip, sertifikalı teknisyenlerimizle hizmet veriyoruz.",
    icon: "👨‍🔧"
  },
  {
    title: "Kalite Garantisi",
    description: "Tüm işlemlerimizde fabrika standartlarına uygun kalite kontrolü yapıyoruz.",
    icon: "✓"
  },
  {
    title: "Hızlı Servis",
    description: "45-60 dakika içinde profesyonel restorasyon hizmeti sunuyoruz.",
    icon: "⚡"
  }
];

export default function AboutValues() {
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
            className="space-y-3 sm:space-y-4"
          >
            <h2 className="text-[clamp(2.1rem,10vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[58px] lg:text-[66px]">
              Yaklaşımımız
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              Her araç ve her far için özel değerlendirme yaparak, en uygun restorasyon 
              yöntemini belirliyoruz.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={premiumVariants}
                transition={premiumTransition(0.08 + index * 0.08, 0.78)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-7 md:p-8"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}