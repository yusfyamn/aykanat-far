"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paragraphOne =
  "Günümüzde araç farları, LED, Xenon ve adaptif sistemlerle birlikte klasik aydınlatma parçası olmanın ötesine geçmiş, daha karmaşık bir yapıya dönüşmüştür. Bu dönüşüm, far onarım süreçlerinde teknik bilgi, doğru ekipman ve uzman uygulama ihtiyacını belirgin şekilde artırmıştır.";

const paragraphTwo =
  "Far onarımı yalnızca kozmetik bir uygulama değil; doğru teşhis, kalibrasyon, sızdırmazlık ve montaj standartlarını bir arada gerektiren teknik bir süreçtir. AYKANAT FAR olarak hedefimiz, her araçta güvenli görüş performansını koruyan, orijinal yapıyı mümkün olduğunca muhafaza eden ve sürdürülebilir sonuç üreten bir onarım standardı sunmaktır.";

export default function WorkshopStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.32,
    margin: "0px 0px -14% 0px",
  });

  return (
    <section ref={sectionRef} className="relative max-md:-mt-px bg-white pb-14 pt-24 text-[#111111] sm:pb-16 sm:pt-28 md:pb-20 md:pt-32">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="space-y-8 md:space-y-10">
          <motion.p
            className="text-[clamp(1.18rem,2.6vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.013em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0.34, filter: "blur(14px)" }}
            transition={{ duration: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraphOne}
          </motion.p>

          <motion.p
            className="text-[clamp(1.18rem,2.6vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.013em] text-[#111111]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
            initial={{ opacity: 0.34, filter: "blur(14px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0.34, filter: "blur(14px)" }}
            transition={{ duration: 1.95, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            {paragraphTwo}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
