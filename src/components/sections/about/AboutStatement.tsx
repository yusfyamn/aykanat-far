"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paragraphOne =
  "AYKANAT FAR bünyesinde; far camı ve far kasası yenileme, far içi buğulanma ve nem giderme, kırık ve çatlak far onarımı, LED ve Xenon far arıza tespiti ile far ayar ve kalibrasyon işlemleri titizlikle gerçekleştirilmektedir. Gelişen araç teknolojilerine uyumlu ekipman altyapımız ve deneyimli teknik kadromuz sayesinde, yeni nesil adaptif ve elektronik kontrollü far sistemlerinde de güvenli ve doğru müdahaleler yapılmaktadır.";

const paragraphTwo =
  "Firmamız, yüksek maliyetli parça değişimi yerine mümkün olan her durumda onarım ve yenileme odaklı çözümler sunarak, sigorta şirketleri ve filo firmalarına ekonomik ve sürdürülebilir hizmet sağlamayı amaçlamaktadır. Tüm uygulamalarımızda orijinal far yapısının korunması, sızdırmazlığın sağlanması ve ışık performansının fabrika standartlarına yakın seviyede geri kazandırılması önceliğimizdir.";

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.46,
    margin: "0px 0px -18% 0px",
  });

  return (
    <section ref={sectionRef} className="bg-white pb-14 pt-24 text-[#111111] sm:pb-16 sm:pt-28 md:pb-20 md:pt-32">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        <div className="space-y-9 md:space-y-11">
          <motion.p
            className="text-[clamp(1.3rem,2.55vw,2.85rem)] font-medium leading-[1.22] tracking-[-0.02em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0.34, filter: "blur(14px)" }
            }
            transition={{ duration: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraphOne}
          </motion.p>

          <motion.p
            className="text-[clamp(1.3rem,2.55vw,2.85rem)] font-medium leading-[1.22] tracking-[-0.02em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0.34, filter: "blur(14px)" }
            }
            transition={{ duration: 1.95, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraphTwo}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
