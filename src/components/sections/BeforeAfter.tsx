"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function BeforeAfter() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.42,
  });

  // Background transition: white → dark (delayed)
  const bgOpacity = useTransform(smoothProgress, [0.25, 0.4], [0, 1]);

  // Dirty → Clean crossfade with blur
  const dirtyBlur = useTransform(smoothProgress, [0.28, 0.42], [0, 20]);
  const dirtyOpacity = useTransform(smoothProgress, [0.38, 0.55], [1, 0]);
  const cleanOpacity = useTransform(smoothProgress, [0.38, 0.55], [0, 1]);
  const cleanBlur = useTransform(smoothProgress, [0.45, 0.6], [16, 0]);
  const imgScale = useTransform(smoothProgress, [0.35, 0.55], [1, 1.015]);

  // Corner titles - before state
  const beforeTopRightOpacity = useTransform(smoothProgress, [0, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  const beforeBottomLeftOpacity = useTransform(smoothProgress, [0, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  
  // Corner titles - after state (stays visible)
  const afterTopRightOpacity = useTransform(smoothProgress, [0.62, 0.7], [0, 1]);
  const afterBottomLeftOpacity = useTransform(smoothProgress, [0.62, 0.7], [0, 1]);

  const dirtyFilter = useTransform(dirtyBlur, (v: number) => `blur(${v}px)`);
  const cleanFilter = useTransform(cleanBlur, (v: number) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} className="relative h-[260vh] md:h-[300vh]" data-dark-section="true">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden bg-white">
        {/* Dark overlay that fades in */}
        <motion.div 
          className="absolute inset-0 z-0 bg-dark"
          style={{ 
            opacity: bgOpacity
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="mx-auto h-full w-full max-w-[1600px] px-1 md:px-2">
            <div className="relative h-full px-12 sm:px-14 md:px-16 lg:px-20 xl:px-28">
              {/* Corner Titles - Before State */}
              <motion.div
                className="absolute right-4 top-[22%] max-w-[46vw] text-right sm:right-8 sm:max-w-[260px] md:right-0 md:top-[16%] md:max-w-[420px]"
                style={{ opacity: beforeTopRightOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.65rem,7.6vw,2.4rem)] font-bold leading-[0.95] tracking-tighter text-black sm:text-3xl md:text-5xl lg:text-6xl">
                  Bu Kadar<br />Hasarlı Bile<br />Olsa.
                </h3>
              </motion.div>

              <motion.div
                className="absolute bottom-[20%] left-4 max-w-[46vw] text-left sm:left-8 sm:max-w-[260px] md:bottom-[16%] md:left-0 md:max-w-[420px]"
                style={{ opacity: beforeBottomLeftOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.65rem,7.6vw,2.4rem)] font-bold leading-[0.95] tracking-tighter text-black sm:text-3xl md:text-5xl lg:text-6xl">
                  Değişim Değil,<br />Onarım<br />Mümkün!
                </h3>
              </motion.div>

              {/* Corner Titles - After State */}
              <motion.div
                className="absolute right-4 top-[22%] max-w-[46vw] text-right sm:right-8 sm:max-w-[260px] md:right-0 md:top-[16%] md:max-w-[420px]"
                style={{ opacity: afterTopRightOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.65rem,7.6vw,2.4rem)] font-bold leading-[0.95] tracking-tighter text-white sm:text-3xl md:text-5xl lg:text-6xl">
                  Mükemmellik<br />Bizim Altın<br />Standardımız.
                </h3>
              </motion.div>

              <motion.div
                className="absolute bottom-[20%] left-4 max-w-[46vw] text-left sm:left-8 sm:max-w-[260px] md:bottom-[16%] md:left-0 md:max-w-[420px]"
                style={{ opacity: afterBottomLeftOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.65rem,7.6vw,2.4rem)] font-bold leading-[0.95] tracking-tighter text-white sm:text-3xl md:text-5xl lg:text-6xl">
                  Sıfır Far<br />Maliyetinin<br />Çok Altında.
                </h3>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-center px-1 md:px-2">
          <div className="flex w-full items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">

            {/* Center image */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ scale: imgScale }}
            >
              {/* Shadow behind the image - positioned at bottom */}
              <div className="absolute inset-0 flex items-end justify-center pb-[5%]">
                <div className="h-[28%] w-[70%] rounded-full bg-black/50 blur-3xl" />
              </div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ opacity: dirtyOpacity, filter: dirtyFilter }}
              >
                {/* Mobile image takes max width to be huge, desktop uses height to constrain */}
                <div className="relative h-[52vh] w-[120vw] max-w-none md:h-[58vh] md:w-[78vw]">
                  <Image
                    src="/kırık-far-bmw.webp"
                    alt="Kirli far"
                    fill
                    sizes="(max-width: 768px) 120vw, 78vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    priority
                  />
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center z-10"
                style={{ opacity: cleanOpacity, filter: cleanFilter }}
              >
                <div className="relative h-[52vh] w-[120vw] max-w-none md:h-[58vh] md:w-[78vw]">
                  <Image
                    src="/temiz-far-bmw.webp"
                    alt="Temiz far"
                    fill
                    sizes="(max-width: 768px) 120vw, 78vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
