"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants,
} from "@/lib/premiumMotion";

const repairServices = [
  {
    title: "Far camı onarımı",
    description: "Çatlak ve küçük kırıklarda gövdeyi koruyarak ekonomik restorasyon.",
    outputs: ["Çatlak stabilizasyonu", "Sızdırmazlık yenileme", "Yüzey düzeltme"],
  },
  {
    title: "Far gövdesi onarımı",
    description: "Plastik gövdedeki hasarları güçlendirme ve form koruma odaklı tamir.",
    outputs: ["Plastik kaynak", "Bağlantı noktası güçlendirme", "Mekanik kontrol"],
  },
  {
    title: "Reflektör ve iç parça onarımı",
    description: "Işık performansını düşüren iç hasarların teknik revizyonu.",
    outputs: ["Reflektör iyileştirme", "İç bileşen revizyonu", "Işık dengesi testi"],
  },
  {
    title: "Nem/su alma sorunu giderme",
    description: "Far içine su alma veya buğu sorunlarında kalıcı izolasyon yaklaşımı.",
    outputs: ["Conta yenileme", "Hava kanalı kontrolü", "Sızdırmazlık testi"],
  },
];

const replacementServices = [
  {
    title: "Komple far değişimi",
    description: "Onarıma uygun olmayan vakalarda orijinal ya da kaliteli alternatif parça montajı.",
  },
  {
    title: "Far camı / lens değişimi",
    description: "Tüm farı değiştirmeden yalnızca hasarlı optik parçanın yenilenmesi.",
  },
  {
    title: "Reflektör değişimi",
    description: "Yanık veya performansı düşmüş reflektörün doğru parça ile değiştirilmesi.",
  },
  {
    title: "Parça tedarik danışmanlığı",
    description: "Orijinal ve muadil seçeneklerin maliyet-performans karşılaştırması ile sunulması.",
  },
];

const decisionFlow = [
  {
    title: "1. Teknik Teşhis",
    description: "Hasarın seviyesi, ışık performansı ve gövde durumu ölçülür.",
  },
  {
    title: "2. Çözüm Senaryosu",
    description: "Onarım ve değişim seçenekleri süre/maliyet etkisiyle birlikte sunulur.",
  },
  {
    title: "3. Uygulama ve Kontrol",
    description: "Seçilen işlemin ardından kalite checklist'i ile teslim yapılır.",
  },
];

export default function RepairServices() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-dark pb-16 pt-12 text-white sm:pb-20 sm:pt-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto w-full max-w-[1600px] px-1 md:px-2">
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
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
                Hizmet Kapsamı
              </p>
              <h2 className="max-w-[15ch] text-[clamp(2.1rem,10vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[58px] lg:text-[66px]">
                Onarım ve değişimi tek karar modelinde yönetiyoruz.
              </h2>
              <p className="max-w-[58ch] text-sm leading-relaxed text-white/72 sm:text-base md:text-lg">
                Her vakaya aynı işlem uygulanmaz. Atölye sürecimiz, önce teknik olarak
                doğru çözümü belirleyip sonra en verimli uygulamaya geçecek şekilde tasarlandı.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
              <motion.article
                variants={premiumVariants}
                transition={premiumTransition(0.08, 0.78)}
                className="rounded-[22px] border border-white/12 bg-white/[0.03] p-5 sm:p-6 md:p-7"
              >
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Onarım Servisleri
                </h3>
                <div className="mt-5 space-y-3">
                  {repairServices.map((service, index) => (
                    <div
                      key={service.title}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold text-white/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-white/65 sm:text-base">
                            {service.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {service.outputs.map((output) => (
                              <li
                                key={output}
                                className="rounded-full border border-white/14 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
                              >
                                {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>

              <motion.article
                variants={premiumVariants}
                transition={premiumTransition(0.14, 0.78)}
                className="rounded-[22px] border border-white/12 bg-white/[0.03] p-5 sm:p-6 md:p-7"
              >
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Değişim Servisleri
                </h3>
                <div className="mt-5 space-y-3">
                  {replacementServices.map((service, index) => (
                    <div
                      key={service.title}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold text-white/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-white/65 sm:text-base">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>

            <motion.div
              variants={premiumVariants}
              transition={premiumTransition(0.22, 0.82)}
              className="rounded-[22px] border border-white/12 bg-white/[0.03] p-5 sm:p-6 md:p-7"
            >
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Atölye Karar Akışı
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
                {decisionFlow.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold tracking-tight text-white/90">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
