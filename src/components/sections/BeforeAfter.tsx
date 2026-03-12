"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function BeforeAfter() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showClean, setShowClean] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = window.setInterval(() => {
      setShowClean((prev) => !prev);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.42,
  });
  const progress = isMobile ? scrollYProgress : smoothProgress;

  // Background transition: white → dark (delayed)
  const bgOpacity = useTransform(progress, [0.25, 0.4], [0, 1]);

  // Dirty → Clean crossfade (mobile: no blur, lighter transform work)
  const dirtyBlur = useTransform(progress, [0.28, 0.42], [0, isMobile ? 0 : 20]);
  const dirtyOpacity = useTransform(progress, [0.38, 0.55], [1, 0]);
  const cleanOpacity = useTransform(progress, [0.38, 0.55], [0, 1]);
  const cleanBlur = useTransform(progress, [0.45, 0.6], [isMobile ? 0 : 16, 0]);
  const imgScale = useTransform(progress, [0.35, 0.55], [1, isMobile ? 1.005 : 1.015]);

  // Corner titles - before state
  const beforeTopRightOpacity = useTransform(progress, [0, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  const beforeBottomLeftOpacity = useTransform(progress, [0, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  
  // Corner titles - after state (stays visible)
  const afterTopRightOpacity = useTransform(progress, [0.62, 0.7], [0, 1]);
  const afterBottomLeftOpacity = useTransform(progress, [0.62, 0.7], [0, 1]);

  const dirtyFilter = useTransform(dirtyBlur, (v: number) => `blur(${v}px)`);
  const cleanFilter = useTransform(cleanBlur, (v: number) => `blur(${v}px)`);

  const mobileInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -18% 0px",
  });

  if (isMobile) {
    return (
      <section ref={sectionRef} className="relative -mb-px -mt-px overflow-hidden bg-white py-12" data-dark-section="true">
        <div className="mx-auto w-full max-w-[1600px] px-4">
          <div className="relative overflow-hidden rounded-[22px] bg-dark">
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0, y: 8 }}
              animate={mobileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-full px-5 py-6">
                <div className="absolute right-5 top-8 max-w-[44vw] text-right">
                  <h3 className="font-satoshi text-[clamp(1.38rem,7vw,2.05rem)] font-bold leading-[0.95] tracking-tighter text-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={showClean ? "clean-top" : "dirty-top"}
                        className="block"
                        initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(8px)" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {showClean ? (
                          <>
                            Mükemmellik
                            <br />
                            Bizim Altın
                            <br />
                            Standardımız.
                          </>
                        ) : (
                          <>
                            Bu Kadar
                            <br />
                            Hasarlı Bile
                            <br />
                            Olsa.
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </h3>
                </div>
                <div className="absolute bottom-8 left-5 max-w-[44vw] text-left">
                  <h3 className="font-satoshi text-[clamp(1.38rem,7vw,2.05rem)] font-bold leading-[0.95] tracking-tighter text-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={showClean ? "clean-bottom" : "dirty-bottom"}
                        className="block"
                        initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(8px)" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {showClean ? (
                          <>
                            Sıfır Far
                            <br />
                            Maliyetinin
                            <br />
                            Çok Altında.
                          </>
                        ) : (
                          <>
                            Değişim Değil,
                            <br />
                            Onarım
                            <br />
                            Mümkün!
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </h3>
                </div>
              </div>
            </motion.div>

            <div className="relative h-[58vh] min-h-[380px] w-full">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: showClean ? 0 : 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src="/kırık-far-bmw.webp" alt="Kirli far" fill sizes="100vw" className="object-contain" priority />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: showClean ? 1 : 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src="/temiz-far-bmw.webp" alt="Temiz far" fill sizes="100vw" className="object-contain" priority />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[185vh] md:h-[300vh]" data-dark-section="true">
      <div className="sticky top-0 flex h-[100svh] md:h-[100dvh] items-center justify-center overflow-hidden bg-white">
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
                className="absolute right-4 top-[22%] max-w-[46vw] text-right sm:right-8 sm:max-w-[260px] md:right-6 md:top-[16%] md:max-w-[420px] lg:right-16 xl:right-20"
                style={{ opacity: beforeTopRightOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.45rem,6.6vw,2.2rem)] font-bold leading-[0.95] tracking-tighter text-black sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Bu Kadar<br />Hasarlı Bile<br />Olsa.
                </h3>
              </motion.div>

              <motion.div
                className="absolute bottom-[20%] left-4 max-w-[46vw] text-left sm:left-8 sm:max-w-[260px] md:bottom-[16%] md:left-6 md:max-w-[420px] lg:left-16 xl:left-20"
                style={{ opacity: beforeBottomLeftOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.45rem,6.6vw,2.2rem)] font-bold leading-[0.95] tracking-tighter text-black sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Değişim Değil,<br />Onarım<br />Mümkün!
                </h3>
              </motion.div>

              {/* Corner Titles - After State */}
              <motion.div
                className="absolute right-4 top-[22%] max-w-[46vw] text-right sm:right-8 sm:max-w-[260px] md:right-6 md:top-[16%] md:max-w-[420px] lg:right-16 xl:right-20"
                style={{ opacity: afterTopRightOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.45rem,6.6vw,2.2rem)] font-bold leading-[0.95] tracking-tighter text-white sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Mükemmellik<br />Bizim Altın<br />Standardımız.
                </h3>
              </motion.div>

              <motion.div
                className="absolute bottom-[20%] left-4 max-w-[46vw] text-left sm:left-8 sm:max-w-[260px] md:bottom-[16%] md:left-6 md:max-w-[420px] lg:left-16 xl:left-20"
                style={{ opacity: afterBottomLeftOpacity }}
              >
                <h3 className="font-satoshi text-[clamp(1.45rem,6.6vw,2.2rem)] font-bold leading-[0.95] tracking-tighter text-white sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
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
                <div className={`h-[24%] w-[66%] rounded-full bg-black/45 ${isMobile ? "blur-xl" : "blur-3xl"}`} />
              </div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ opacity: dirtyOpacity, filter: dirtyFilter }}
              >
                {/* Mobile image takes max width to be huge, desktop uses height to constrain */}
                <div className="relative h-[48vh] w-[108vw] max-w-none md:h-[56vh] md:w-[72vw] lg:h-[50vh] lg:w-[64vw] xl:h-[48vh] xl:w-[60vw]">
                  <Image
                    src="/kırık-far-bmw.webp"
                    alt="Kirli far"
                    fill
                    sizes="(max-width: 1024px) 108vw, (max-width: 1280px) 72vw, (max-width: 1535px) 64vw, 60vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    priority
                  />
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center z-10"
                style={{ opacity: cleanOpacity, filter: cleanFilter }}
              >
                <div className="relative h-[48vh] w-[108vw] max-w-none md:h-[56vh] md:w-[72vw] lg:h-[50vh] lg:w-[64vw] xl:h-[48vh] xl:w-[60vw]">
                  <Image
                    src="/temiz-far-bmw.webp"
                    alt="Temiz far"
                    fill
                    sizes="(max-width: 1024px) 108vw, (max-width: 1280px) 72vw, (max-width: 1535px) 64vw, 60vw"
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
