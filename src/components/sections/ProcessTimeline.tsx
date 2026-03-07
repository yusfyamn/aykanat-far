"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PremiumLinkButton } from "@/components/ui/PremiumCta";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion";

const stats = [
  { value: "3.200+", label: "Tamamlanan Far Restorasyonu" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "45-60 dk", label: "Ortalama Uygulama Süresi" },
  { value: "5 Adım", label: "Standart Premium Restorasyon Süreci" }
];

export default function ProcessTimeline() {
  return (
    <section
      id="process"
      className="bg-white pb-8 pt-16 text-[#101010] sm:pt-20 md:pb-10 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-1 md:px-2">
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <p className="w-fit pb-[0.12em] text-[18px] font-medium leading-[1.12] tracking-tight text-black/45 sm:text-[24px] md:text-[34px] lg:-translate-x-12 xl:-translate-x-20">
            Hakkımızda
          </p>

          <div className="mt-4">
            <div className="h-px w-full bg-black/10 lg:-translate-x-12 lg:w-[calc(100%+3rem)] xl:-translate-x-20 xl:w-[calc(100%+5rem)]" />
            <motion.div
              variants={premiumStagger(0.12, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: PREMIUM_VIEWPORT_MARGIN, amount: PREMIUM_VIEWPORT_AMOUNT }}
              className="grid gap-10 pt-8 sm:gap-12 sm:pt-10 md:gap-14 md:pt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] lg:gap-x-16 xl:gap-x-20"
            >
              <div className="w-full max-w-none lg:justify-self-start lg:-translate-x-12 xl:-translate-x-20">
                <motion.h2
                  variants={premiumVariants}
                  transition={premiumTransition(0.02, 0.82)}
                  className="max-w-[18ch] pb-[0.14em] text-[clamp(1.75rem,8.2vw,3.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] sm:max-w-none md:text-[58px] lg:text-[66px]"
                >
                  Far restorasyonunda net süreç ve premium sonuç için buradayız.
                </motion.h2>

                <motion.p
                  variants={premiumVariants}
                  transition={premiumTransition(0.14, 0.78)}
                  className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-black/65 sm:mt-5 sm:text-base md:max-w-none md:text-[20px]"
                >
                  Gereksiz adımları çıkarıp, farın ihtiyacı olan işlemi doğru sırada
                  uyguluyoruz. Sonuç daha berrak, daha dengeli ve daha uzun ömürlü
                  oluyor.
                </motion.p>

                <motion.div
                  variants={premiumVariants}
                  transition={premiumTransition(0.2, 0.86)}
                  className="mt-7 sm:mt-8 md:mt-10"
                >
                  <Image
                    src="/golf-kalem-cizim.png"
                    alt="Kalem çizim golf görseli"
                    width={900}
                    height={560}
                    className="h-auto w-[96%] max-w-[430px] select-none object-contain opacity-70 sm:w-[84%] sm:max-w-[500px] md:ml-4 md:w-[88%] md:max-w-none lg:ml-8 lg:w-[94%]"
                  />
                </motion.div>
              </div>

              <div className="mt-1 space-y-0 lg:mt-0 lg:w-[420px] lg:justify-self-end lg:translate-x-14 xl:w-[460px] xl:translate-x-24">
                {stats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={premiumVariants}
                    transition={premiumTransition(index * 0.08, 0.72)}
                    className="border-b border-black/10 py-5 sm:py-6 md:py-7"
                  >
                    <p className="text-[clamp(2.2rem,12vw,3.4rem)] font-semibold leading-none tracking-[-0.03em] md:text-[54px]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[17px] tracking-tight text-black/56 sm:text-[19px] md:text-[24px]">
                      {item.label}
                    </p>
                  </motion.div>
                ))}

                <motion.div
                  variants={premiumVariants}
                  transition={premiumTransition(0.36, 0.72)}
                  className="flex justify-center pt-6 md:justify-start md:pt-8"
                >
                  <PremiumLinkButton
                    href="/hakkimizda"
                    fullWidth={false}
                    className="px-4 py-2.5 text-sm md:px-6 md:py-3 md:text-base"
                  >
                    Hakkımızda
                  </PremiumLinkButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
