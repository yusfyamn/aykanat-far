"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PREMIUM_VIEWPORT_AMOUNT, PREMIUM_VIEWPORT_MARGIN, premiumStagger, premiumTransition, premiumVariants } from "@/lib/premiumMotion";

export default function WorkshopFuturePerspective() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section ref={sectionRef} className="relative max-md:-mt-px bg-white pb-16 pt-20 text-[#111111] sm:pb-20 sm:pt-24 md:pb-24 md:pt-28">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid items-stretch gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1fr_1.04fr] lg:gap-x-12 xl:gap-x-14"
        >
            <motion.div variants={premiumVariants} transition={premiumTransition(0.14, 0.86)} className="relative order-1 h-full lg:order-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-black/10 bg-black/[0.02] lg:h-full lg:min-h-[520px] lg:aspect-auto">
                <div className="relative h-full w-full">
                  <Image
                    src="/sektorde-gelecek-perspektifi.webp"
                    alt="Sektörde gelecek perspektifi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                </div>
              </div>
            </motion.div>

            <div className="order-2 h-full space-y-6 sm:space-y-7 md:space-y-8 lg:order-1">
              <motion.div variants={premiumVariants} transition={premiumTransition(0.08, 0.84)} className="flex h-full flex-col space-y-5">
                <p className="text-[12px] uppercase tracking-[0.22em] text-black/42 sm:text-xs">Sektörel Vizyon</p>
                <h2 className="max-w-[18ch] pb-[0.1em] text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#111111] sm:text-3xl md:text-4xl lg:text-5xl">
                  Sektörde Gelecek Perspektifi
                </h2>
                <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-black/78 sm:mt-7 sm:text-lg md:text-[1.24rem]">
                  Elektrikli ve otonom araçların yaygınlaşmasıyla birlikte far teknolojileri de hızlı bir dönüşüm sürecine girmiştir.
                  Akıllı aydınlatma sistemleri, yol ve çevre koşullarına göre otomatik yön değiştiren farlar ile kamera ve sensör destekli
                  aydınlatma çözümleri, far onarım sektöründe teknik altyapının önemini daha da artırmaktadır.
                </p>
                <p className="max-w-[62ch] text-base leading-relaxed text-black/78 sm:text-lg md:text-[1.24rem]">
                  Bu doğrultuda far onarımı sektörü, klasik kaporta ve mekanik servis anlayışının ötesine geçerek elektronik ve yazılım odaklı
                  bir uzmanlık alanı olarak konumlanmaktadır. Önümüzdeki dönemde eğitimli teknik personel, ileri seviye cihaz yatırımları ve
                  marka bazlı teknik destek altyapısı, sektörde rekabet avantajı sağlayan temel unsurlar arasında yer alacaktır.
                </p>
              </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
