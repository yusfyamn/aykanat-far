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

export default function AboutStory() {
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
    const onResize = () =>
      setIsMobile(window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-16 pt-12 text-white sm:pb-20 sm:pt-16 md:pb-24 md:pt-20"
    >
      <div className="w-full px-3 md:px-4">
        <div className="rounded-[20px] bg-surface px-4 py-12 sm:px-6 sm:py-14 md:rounded-[24px] md:px-10 md:py-[4.5rem] lg:px-16 lg:py-20 xl:px-20 2xl:px-24">
          <div className="mx-auto w-full max-w-[1480px]">
          <motion.div
            variants={premiumStagger(0.12, 0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid items-stretch gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1fr_1.04fr] lg:gap-x-12 xl:gap-x-14"
          >
            <motion.div
              variants={premiumVariants}
              transition={premiumTransition(0.14, 0.86)}
              className="relative order-1 h-full lg:order-2"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/10 bg-surface/70 lg:h-full lg:min-h-[520px] lg:aspect-auto">
                <motion.div className="relative h-full w-full" style={isMobile ? undefined : { y: imageY }}>
                  <Image
                    src="/sonra-mercedes.webp"
                    alt="Restore ekibinin far restorasyon çalışması"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            <div className="order-2 h-full space-y-6 sm:space-y-7 md:space-y-8 lg:order-1">
              <motion.div
                variants={premiumVariants}
                transition={premiumTransition(0, 0.82)}
                className="flex h-full flex-col space-y-5"
              >
                <p className="text-[12px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
                  Hikayemiz
                </p>
                <h2 className="max-w-[17ch] pb-[0.1em] text-2xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-3xl md:text-4xl lg:text-5xl">
                  Neden değişim yerine restorasyon?
                </h2>
                <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-white/76 sm:mt-7 sm:text-lg md:text-[1.24rem]">
                  AYKANAT FAR, gereksiz parça maliyetlerini azaltmak ve aracın orijinal
                  far karakterini korumak için kuruldu. Bugün bireysel kullanıcılar,
                  filo ekipleri ve sigorta paydaşları için aynı standartta, ölçülebilir
                  kalite sunuyoruz.
                </p>
                <p className="max-w-[62ch] text-base leading-relaxed text-white/76 sm:text-lg md:text-[1.24rem]">
                  Uygulama planını arızanın seviyesine göre oluşturuyor, far gövdesi,
                  lens yüzeyi ve aydınlatma performansını birlikte ele alıyoruz.
                  Teslim öncesi kalite kontrol adımlarıyla net görüş, dengeli ışık
                  dağılımı ve uzun ömürlü kullanım hedefliyoruz.
                </p>
                <p className="max-w-[62ch] text-base leading-relaxed text-white/76 sm:text-lg md:text-[1.24rem]">
                  Her uygulamada şeffaf bilgilendirme, doğru ekipman kullanımı ve
                  kalıcı sonuç odaklı işçilik anlayışını birlikte sunuyoruz. Böylece
                  araç sahipleri için hem estetik hem de sürüş güvenliği açısından
                  sürdürülebilir bir kalite standardı oluşturuyoruz.
                </p>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
