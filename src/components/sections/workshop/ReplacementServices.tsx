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

const replacementServices = [
  {
    title: "Komple Far Değişimi",
    description: "Onarılamayacak durumdaki farlar için orijinal veya muadil yedek parça temini ve montajı.",
    icon: "🔄"
  },
  {
    title: "Far Camı Değişimi",
    description: "Sadece camı hasarlı farlar için cam değişimi hizmeti. Gövde korunur, maliyet düşer.",
    icon: "💎"
  },
  {
    title: "Lens Değişimi",
    description: "İç lens ve difüzör değişimi ile ışık kalitesinin yenilenmesi.",
    icon: "🔍"
  },
  {
    title: "Reflektör Değişimi",
    description: "Yanmış veya hasarlı reflektörlerin değişimi ile ışık performansının geri kazandırılması.",
    icon: "✨"
  },
  {
    title: "Orijinal Parça Temini",
    description: "Tüm marka ve modeller için orijinal yedek parça tedariki.",
    icon: "📦"
  },
  {
    title: "Muadil Parça Seçenekleri",
    description: "Kaliteli muadil parçalarla ekonomik çözümler.",
    icon: "💰"
  }
];

export default function ReplacementServices() {
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
            <h2 className="text-[clamp(2.1rem,10vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              Değişim Hizmetlerimiz
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              Onarım mümkün değilse, size en uygun yedek parça seçeneklerini sunuyoruz.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-7 lg:gap-8">
            {replacementServices.map((service, index) => (
              <motion.div
                key={service.title}
                variants={premiumVariants}
                transition={premiumTransition(0.08 + index * 0.06, 0.78)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-7"
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.48, 0.82)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 md:p-8"
          >
            <h3 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Parça Garantisi
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              <div>
                <h4 className="mb-2 font-semibold text-accent">Orijinal Parçalar</h4>
                <p className="text-sm text-white/70">
                  Tüm orijinal yedek parçalar üretici garantisi ile gelir.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-accent">Muadil Parçalar</h4>
                <p className="text-sm text-white/70">
                  Kaliteli muadil parçalar için 1 yıl işçilik garantisi sunuyoruz.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}