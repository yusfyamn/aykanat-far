"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePreloader } from "@/context/PreloaderContext";

export default function Preloader() {
  const { isPreloaderDone, setIsPreloaderDone } = usePreloader();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsPreloaderDone(true);
      document.body.style.overflow = "";
      return;
    }

    if (isPreloaderDone) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    finishedRef.current = false;
    setProgress(0);
    let rafId = 0;
    let hasLoaded = document.readyState === "complete";
    let visualProgress = 0;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setProgress(100);
      setTimeout(() => {
        setIsPreloaderDone(true);
        document.body.style.overflow = "";
      }, 420);
    };

    const minDuration = 2100;
    const maxDuration = 5600;
    const start = performance.now();
    const onLoad = () => {
      hasLoaded = true;
    };
    window.addEventListener("load", onLoad, { once: true });

    const tick = (now: number) => {
      if (finishedRef.current) return;
      const elapsed = now - start;
      const normalized = Math.min(1, elapsed / minDuration);
      const eased = 1 - Math.pow(1 - normalized, 2.2);

      let target = 8 + eased * 84; // 8 -> 92
      if (hasLoaded && elapsed > minDuration * 0.74) {
        target = 100;
      }
      if (!hasLoaded && elapsed > maxDuration - 700) {
        target = 100;
      }

      // Enter a fast, deterministic finish phase once near the end.
      const nearEnd = target >= 100 || visualProgress >= 96;
      visualProgress += (target - visualProgress) * (nearEnd ? 0.34 : 0.12);
      const next = Math.min(100, Math.floor(visualProgress));
      setProgress(next);

      if (next >= 100 || (next >= 99 && nearEnd) || elapsed >= maxDuration || elapsed >= minDuration + 1400) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const hardStopTimer = window.setTimeout(finish, maxDuration);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(hardStopTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, [isHomePage, isPreloaderDone, setIsPreloaderDone]);

  return (
    <AnimatePresence>
      {!isPreloaderDone && isHomePage && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-dark p-6 sm:p-10 md:p-16 lg:p-20"
        >
          <div />
          <div className="flex w-full flex-col justify-end gap-4 md:gap-8">
            <div className="relative h-[1px] w-full overflow-hidden bg-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full origin-left bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <div className="flex w-full items-end justify-between">
              <div />
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="font-satoshi text-[22vw] font-medium leading-[0.8] tracking-tighter text-white md:text-[14vw]"
                >
                  {Math.min(progress, 100)}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
