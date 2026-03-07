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

const equipment = [
  {
    title: "Termal kontrollü kaynak sistemi",
    detail: "Far gövdesi onarımlarında deformasyonu azaltan kontrollü uygulama.",
  },
  {
    title: "Optik yüzey işleme seti",
    detail: "Cam/lens yüzeyinde netlik ve homojen parlaklık sağlayan çok adımlı işlem.",
  },
  {
    title: "Sızdırmazlık test düzeneği",
    detail: "Nem ve su alma riskini teslim öncesi doğrulayan test altyapısı.",
  },
  {
    title: "Işık hizalama ölçümü",
    detail: "Işık dağılımı ve odak noktası kontrolü ile gece görüş dengesinin korunması.",
  },
];

const checklist = [
  "Yüzey bütünlüğü kontrolü",
  "Sızdırmazlık doğrulaması",
  "Işık performansı kontrolü",
  "Montaj uyumu kontrolü",
  "Teslim öncesi son inceleme",
];

export default function WorkshopEquipment() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-14 pt-16 text-[#101010] sm:pb-16 sm:pt-20 md:pb-20 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-9 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12"
        >
          <div>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.02, 0.82)}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/42 sm:text-xs"
            >
              Atölye Altyapısı
            </motion.p>
            <motion.h2
              variants={premiumVariants}
              transition={premiumTransition(0.06, 0.82)}
              className="mt-3 max-w-[16ch] text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[56px]"
            >
              Teknik ekipman kadar süreç disiplini de önemli.
            </motion.h2>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.12, 0.76)}
              className="mt-4 max-w-[54ch] text-sm leading-relaxed text-black/66 sm:text-base md:text-lg"
            >
              Ekipman yatırımı, doğru süreçle desteklenmediğinde tek başına yeterli olmaz.
              Bu yüzden her onarım ve değişimi aynı kalite standardında teslim ediyoruz.
            </motion.p>

            <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
              {equipment.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={premiumVariants}
                  transition={premiumTransition(0.14 + index * 0.06, 0.72)}
                  className="rounded-2xl border border-black/10 bg-[#f7f7f8] p-5 sm:p-6"
                >
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/64 sm:text-base">{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.aside
            variants={premiumVariants}
            transition={premiumTransition(0.2, 0.82)}
            className="rounded-[22px] border border-black/12 bg-[#f4f4f5] p-5 sm:p-6 md:p-7"
          >
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Kalite Kontrol Checklist</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/62 sm:text-base">
              İşlem bittiğinde değil, işlem boyunca kontrol ederek ilerliyoruz. Teslimde bu liste standart olarak uygulanır.
            </p>

            <ul className="mt-5 space-y-2">
              {checklist.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-3.5 py-3"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/15 text-[11px] font-semibold text-black/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-black/76 sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-800/80">
                Teslim Notu
              </p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-900">
                Uygulanan işlemler net şekilde raporlanır; sonraki bakım adımları müşteriye açık olarak iletilir.
              </p>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
