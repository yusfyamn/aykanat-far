"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-26, 26]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-px bg-white pb-14 pt-16 text-[#101010] sm:pb-16 sm:pt-20 md:pb-20 md:pt-24"
    >
      <div className="w-full px-3 md:px-4">
        <div className="mx-auto w-full max-w-[1480px]">
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
              <motion.div className="relative h-full w-full" style={isMobile ? undefined : { y: imageY }}>
                <Image
                  src="/hakkimizda.jpeg"
                  alt="AYKANAT FAR atölyesi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="h-full">
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.02, 0.82)}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/42 sm:text-xs"
            >
              Yaklaşımımız
            </motion.p>
            <motion.h2
              variants={premiumVariants}
              transition={premiumTransition(0.06, 0.82)}
              className="mt-3 max-w-[17ch] pb-[0.1em] text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.03em]"
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
                <p className="mt-2 text-sm leading-relaxed text-black/66 sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
