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

const audiences = [
  {
    title: "Sigorta Şirketleri",
    description: "Hasar onarım süreçlerinde ekonomik ve sürdürülebilir restorasyon modeli.",
  },
  {
    title: "Filo Firmaları",
    description: "Toplu araçlarda standart kaliteyi koruyan hızlı bakım/restorasyon akışı.",
  },
  {
    title: "Bireysel Araç Sahipleri",
    description: "Orijinal farı koruyarak estetik ve görüş performansını iyileştiren uygulamalar.",
  },
];

export default function AboutExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section
      ref={sectionRef}
      className="relative -mt-px bg-white pb-14 pt-16 text-[#101010] sm:pb-16 sm:pt-20 md:pb-20 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid items-stretch gap-9 sm:gap-10 lg:grid-cols-[1.04fr_1fr] lg:gap-10"
        >
          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.08, 0.82)}
            className="relative h-full"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-black/12 bg-black/[0.04] lg:h-full lg:min-h-[520px] lg:aspect-auto">
              <motion.div className="relative h-full w-full">
                <Image
                  src="/hakkimizda.jpeg"
                  alt="AYKANAT FAR atölyesi"
                  fill
                  className="object-cover object-center md:object-[12%_50%]"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="h-full">
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.02, 0.82)}
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/42 sm:text-xs"
            >
              Yaklaşımımız
            </motion.p>
            <motion.h2
              variants={premiumVariants}
              transition={premiumTransition(0.06, 0.82)}
              className="mt-3 max-w-[17ch] pb-[0.1em] text-2xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Teknik doğruluk ve net kullanıcı deneyimi.
            </motion.h2>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.12, 0.76)}
              className="mt-6 max-w-[56ch] text-base leading-relaxed text-black/72 sm:mt-7 sm:text-lg md:text-[1.24rem]"
            >
              Uygulama öncesi ve sonrası belirsizlikleri azaltan bir sistemle çalışıyoruz:
              net teşhis, net kapsam, net teslim.
            </motion.p>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.18, 0.76)}
              className="mt-5 max-w-[56ch] text-base leading-relaxed text-black/72 sm:text-lg md:text-[1.24rem]"
            >
              Her araca aynı reçeteyi uygulamak yerine, farın fiziksel durumu,
              aydınlatma performansı ve kullanım geçmişine göre işlem planı çıkarıyoruz.
              Böylece gereksiz değişim maliyetlerini azaltırken, güvenli sürüş için
              ihtiyaç duyulan netlik seviyesini doğru işlem adımlarıyla geri kazandırıyoruz.
            </motion.p>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.24, 0.74)}
              className="mt-5 max-w-[56ch] text-base leading-relaxed text-black/72 sm:text-lg md:text-[1.24rem]"
            >
              Sürecin her aşamasında şeffaf iletişim kuruyor, uygulama kapsamı ve
              teslim çıktısını baştan netleştiriyoruz. Hedefimiz sadece görsel yenileme
              değil; kalıcılığı yüksek, ölçülebilir ve sürdürülebilir bir sonuç üretmek.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={premiumVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={premiumTransition(0.26, 0.78)}
          className="mt-10 border-t border-black/10 pt-7 sm:mt-12 sm:pt-8"
        >
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Kimlerle çalışıyoruz?
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3 md:gap-5">
            {audiences.map((item, index) => (
              <motion.div
                key={item.title}
                variants={premiumVariants}
                transition={premiumTransition(0.3 + index * 0.06, 0.7)}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)] sm:p-6"
              >
                <h4 className="text-lg font-semibold tracking-tight sm:text-xl">
                  {item.title}
                </h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-black/66 sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
