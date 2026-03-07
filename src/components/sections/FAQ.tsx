"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  PREMIUM_EASE,
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion";

const faqs = [
  {
    question: "Far restorasyonu ne kadar sürer?",
    answer: "Standart bir far restorasyonu işlemi ortalama 1-2 saat sürmektedir. İşlem sırasında aracınızı bırakıp gidebilir veya bekleyebilirsiniz."
  },
  {
    question: "Restorasyon ne kadar dayanır?",
    answer: "Profesyonel UV koruyucu kaplama ile yapılan restorasyon 2-3 yıl dayanıklılık sağlar. Düzenli bakım ile bu süre uzatılabilir."
  },
  {
    question: "Hangi araç markalarına hizmet veriyorsunuz?",
    answer: "Tüm araç markalarına (BMW, Mercedes, Audi, Volkswagen, Ford, Renault vb.) ve tüm far tiplerine (Halogen, Xenon, LED) hizmet vermekteyiz."
  },
  {
    question: "Yeni far almak yerine restorasyon yaptırmak mantıklı mı?",
    answer: "Kesinlikle! Restorasyon, çoğu durumda çok daha ekonomik bir çözümdür ve doğru uygulandığında sonuç oldukça tatmin edicidir."
  },
  {
    question: "Garanti veriyor musunuz?",
    answer: "Evet, tüm işlemlerimizde işçilik garantisi vermekteyiz. Detaylı garanti koşulları için bizimle iletişime geçebilirsiniz."
  },
  {
    question: "Randevu almak zorunlu mu?",
    answer: "Randevu almanızı öneririz ancak zorunlu değildir. Randevulu müşterilerimize öncelik tanımaktayız ve bekleme sürenizi minimuma indiriyoruz."
  }
];

export default function FAQ() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const isInView = useInView(ref, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT
  });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="bg-white py-20 sm:py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-1 md:px-2">
        <div className="px-4 py-8 sm:px-5 sm:py-9 md:px-10 md:py-14 lg:px-10 xl:px-12">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <motion.div
              variants={premiumVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={premiumTransition(0.04, 0.82)}
              className="self-start lg:sticky lg:top-28"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-black">
                S.S.S
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:mt-4 sm:text-5xl md:text-5xl lg:text-6xl">
                Sıkça Sorulan Sorular
              </h2>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-black sm:mt-5 sm:text-base md:text-lg">
                Restorasyon süreci, süreler ve kalite standardı hakkında en sık aldığımız sorular.
              </p>
            </motion.div>

            <motion.div
              variants={premiumStagger(0.12, 0.1)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3 sm:space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={premiumVariants}
                  transition={premiumTransition(index * 0.07, 0.68)}
                  className="overflow-hidden rounded-2xl border border-black/12 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-start gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5 md:px-7 md:py-6"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/20 text-[10px] font-semibold tracking-[0.1em] text-black sm:h-7 sm:w-7 sm:text-[11px] sm:tracking-[0.12em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 pr-2 text-sm font-semibold leading-snug text-black sm:pr-4 sm:text-base md:text-lg">
                      {faq.question}
                    </span>
                    <motion.svg
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.44, ease: PREMIUM_EASE }}
                      className="mt-0.5 h-5 w-5 shrink-0 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: isMobile ? "blur(0px)" : "blur(8px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: isMobile ? "blur(0px)" : "blur(8px)" }}
                        transition={{
                          duration: 0.52,
                          ease: PREMIUM_EASE,
                          opacity: { duration: 0.34, ease: PREMIUM_EASE },
                          filter: { duration: 0.44, ease: PREMIUM_EASE },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-black/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-black sm:px-5 sm:pb-5 sm:pt-4 md:px-7 md:pb-6 md:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
