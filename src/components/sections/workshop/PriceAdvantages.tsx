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
import { PremiumAnchorButton, PremiumLinkButton } from "@/components/ui/PremiumCta";

const scenarios = [
  {
    title: "Yüzey aşınması / matlık",
    replacement: "Yeni far ile yüksek parça maliyeti",
    workshop: "Restorasyon ile düşük maliyetli iyileştirme",
    gain: "Ortalama %60-80 tasarruf potansiyeli",
  },
  {
    title: "Cam hasarı",
    replacement: "Komple far değişimi gerekebilir",
    workshop: "Cam/lens odaklı işlemle maliyet dengelenir",
    gain: "Ortalama %40-65 tasarruf potansiyeli",
  },
  {
    title: "İç optik hasar",
    replacement: "Tüm üniteyi yenileme senaryosu",
    workshop: "İç parça revizyonu + hedefli değişim",
    gain: "Ortalama %35-55 tasarruf potansiyeli",
  },
];

const notes = [
  "Fiyat aralıkları araç modeli ve hasar seviyesine göre değişir.",
  "Ön inceleme sonrası net teklif ve süre bilgisi paylaşılır.",
  "Onarıma uygun olmayan vakalarda en doğru değişim planı önerilir.",
];

export default function PriceAdvantages() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-dark pb-12 pt-16 text-white max-[430px]:pb-10 max-[430px]:pt-12 max-[393px]:pb-9 max-[393px]:pt-11 sm:pb-14 sm:pt-20 md:pb-16 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 max-[430px]:px-3 max-[393px]:px-2.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 max-[430px]:space-y-8 max-[393px]:space-y-7 sm:space-y-12 md:space-y-14"
        >
          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0, 0.82)}
            className="space-y-4"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              Maliyet Perspektifi
            </p>
            <h2 className="max-w-[15ch] text-[clamp(2.1rem,10vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] max-[430px]:max-w-[16ch] max-[430px]:text-[clamp(1.72rem,9vw,2.34rem)] max-[393px]:text-[clamp(1.58rem,8.9vw,2.16rem)] max-[375px]:text-[clamp(1.5rem,8.7vw,2.02rem)]">
              Doğru müdahale, toplam maliyeti ciddi şekilde düşürür.
            </h2>
            <p className="max-w-[58ch] text-sm leading-relaxed text-white/72 max-[430px]:text-[13px] max-[393px]:text-[12.5px] sm:text-base md:text-lg">
              Her far için farklı senaryo oluşur. Aşağıdaki örnek tablo, onarım odaklı
              yaklaşımın çoğu vakada nasıl bütçe avantajı sağladığını özetler.
            </p>
          </motion.div>

          <div className="grid gap-4 max-[430px]:gap-3 sm:gap-5 md:grid-cols-3">
            {scenarios.map((item, index) => (
              <motion.article
                key={item.title}
                variants={premiumVariants}
                transition={premiumTransition(0.08 + index * 0.06, 0.76)}
                className="rounded-[22px] border border-white/12 bg-white/[0.03] p-5 max-[430px]:rounded-[18px] max-[430px]:p-4 sm:p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{item.title}</h3>

                <div className="mt-4 space-y-2">
                  <div className="rounded-lg border border-white/12 bg-black/25 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/46">
                      Değişim Senaryosu
                    </p>
                    <p className="mt-1 text-sm text-white/74">{item.replacement}</p>
                  </div>

                  <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90">
                      Atölye Çözümü
                    </p>
                    <p className="mt-1 text-sm text-emerald-100">{item.workshop}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm font-semibold text-accent">{item.gain}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.24, 0.82)}
            className="grid gap-6 rounded-[22px] border border-white/12 bg-white/[0.03] p-5 max-[430px]:gap-4 max-[430px]:rounded-[18px] max-[430px]:p-4 sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:p-7"
          >
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ücretsiz Ön Değerlendirme
              </h3>
              <ul className="mt-3 space-y-2">
                {notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-sm text-white/70 sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-end gap-3 max-[430px]:gap-2.5">
              <PremiumLinkButton
                href="/iletisim"
                className="max-[430px]:px-5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
              >
                Ücretsiz Değerlendirme Al
              </PremiumLinkButton>
              <PremiumAnchorButton
                href="tel:+905551234567"
                className="max-[430px]:px-5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
              >
                Hemen Ara
              </PremiumAnchorButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
