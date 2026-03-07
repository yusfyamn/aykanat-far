"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PREMIUM_VIEWPORT_AMOUNT, PREMIUM_VIEWPORT_MARGIN, premiumStagger, premiumTransition, premiumVariants } from "@/lib/premiumMotion";

export default function WorkshopTextFlow() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section ref={sectionRef} className="relative max-md:-mt-px bg-white pb-16 pt-12 text-white sm:pb-20 sm:pt-16 md:pb-24 md:pt-20">
      <div className="w-full px-3 md:px-4">
        <div className="space-y-8 md:space-y-10">
          <div className="rounded-[20px] bg-surface px-5 py-12 sm:px-6 sm:py-14 md:rounded-[24px] md:px-10 md:py-[4.5rem] lg:px-14 lg:py-20 xl:px-16">
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
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:h-full lg:min-h-[520px] lg:aspect-auto">
                    <div className="relative h-full w-full">
                      <Image
                        src="/Far-Değişimi-Yerine-Onarımın Avantajları.webp"
                        alt="Far onarım atölyesi çalışma alanı"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="order-2 h-full space-y-6 sm:space-y-7 md:space-y-8 lg:order-1">
                  <motion.div
                    variants={premiumVariants}
                    transition={premiumTransition(0, 0.82)}
                    className="flex h-full flex-col space-y-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">Atölye Yaklaşımı</p>
                    <h2 className="max-w-[17ch] pb-[0.1em] text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.03em] md:text-[56px]">
                      Far Değişimi Yerine Onarımın Avantajları
                    </h2>
                    <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-white/76 sm:mt-7 sm:text-lg md:text-[1.24rem]">
                      Son yıllarda sektörde öne çıkan en güçlü yaklaşım, far değişimi yerine onarım ve yenileme çözümlerinin tercih edilmesidir.
                      Özellikle yeni nesil ve üst segment araçlarda far ünitelerinin maliyetleri yüksek seviyelere ulaşırken, onarım yaklaşımı daha dengeli bir
                      maliyet ve daha hızlı teslim imkanı sunar.
                    </p>
                    <p className="max-w-[62ch] text-base leading-relaxed text-white/76 sm:text-lg md:text-[1.24rem]">
                      Orijinal farın korunması, aracın fabrika çıkış yapısının devam etmesi ve işlem süresinin daha kısa olması; hem araç sahipleri
                      hem de işletmeler için onarımı daha sürdürülebilir bir seçenek haline getirir. Bu sayede teknik kalite ve ekonomik denge birlikte korunur.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              <div className="mt-12 pt-12 sm:mt-14 sm:pt-14 md:mt-16 md:pt-16">
              <motion.div
                variants={premiumStagger(0.12, 0.1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid items-stretch gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1.04fr_1fr] lg:gap-x-12 xl:gap-x-14"
              >
                <motion.div
                  variants={premiumVariants}
                  transition={premiumTransition(0.04, 0.82)}
                  className="relative order-1 h-full"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:h-full lg:min-h-[520px] lg:aspect-auto">
                    <div className="relative h-full w-full">
                      <Image
                        src="/Uzmanlık-ve-Ekipman-Gereksinimi.webp"
                        alt="Uzmanlık ve ekipman gereksinimi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="order-2 h-full space-y-6 sm:space-y-7 md:space-y-8">
                  <motion.div
                    variants={premiumVariants}
                    transition={premiumTransition(0.1, 0.82)}
                    className="flex h-full flex-col space-y-5"
                  >
                    <h2 className="max-w-[17ch] pb-[0.1em] text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.03em] md:text-[56px]">
                      Uzmanlık ve Ekipman Gereksinimi
                    </h2>
                    <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-white/76 sm:mt-7 sm:text-lg md:text-[1.24rem]">
                      Far onarımı, yalnızca yüzeysel işlemlerden ibaret bir uygulama olarak değerlendirilmemelidir. Özellikle LED ve adaptif far sistemlerinde
                      elektronik kontrol üniteleri, sensörler ve yazılımlar aktif rol oynamaktadır. Bu nedenle sektörde faaliyet gösteren işletmelerin;
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-white/76 sm:text-lg md:text-[1.24rem]">
                      <li>Marka ve modele özel teknik bilgiye sahip olması,</li>
                      <li>Kalibrasyon ve ayar cihazlarını etkin şekilde kullanabilmesi,</li>
                      <li>Sızdırmazlık, montaj ve yeniden kapama işlemlerini profesyonel standartlarda gerçekleştirmesi</li>
                    </ul>
                    <p className="max-w-[62ch] text-base leading-relaxed text-white/76 sm:text-lg md:text-[1.24rem]">
                      gerekmektedir. Aksi takdirde yapılan bilinçsiz müdahaleler, far performansının düşmesine ve daha kapsamlı teknik arızaların oluşmasına neden olabilmektedir.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
