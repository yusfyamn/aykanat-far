"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HomeMobileStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.46,
    margin: "0px 0px -18% 0px",
  });

  return (
    <section ref={sectionRef} className="bg-white md:hidden">
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-14 pt-24 sm:pb-16 sm:pt-28">
        <div className="space-y-6">
          <motion.p
            className="text-[clamp(1.12rem,4.8vw,1.5rem)] font-medium leading-[1.28] tracking-[-0.013em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0.34, filter: "blur(14px)" }
            }
            transition={{ duration: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Firmamız, yüksek maliyetli parça değişimi yerine mümkün olan her durumda onarım ve
            yenileme odaklı çözümler sunarak, sigorta şirketleri ve filo firmalarına ekonomik ve
            sürdürülebilir hizmet sağlamayı amaçlar.
          </motion.p>

          <motion.p
            className="text-[clamp(1.12rem,4.8vw,1.5rem)] font-medium leading-[1.28] tracking-[-0.013em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0.34, filter: "blur(14px)" }
            }
            transition={{ duration: 1.95, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Tüm uygulamalarımızda orijinal far yapısının korunması, sızdırmazlığın sağlanması ve
            ışık performansının fabrika standartlarına yakın seviyede geri kazandırılması
            önceliğimizdir.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
