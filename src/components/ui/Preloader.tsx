"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const { isPreloaderDone, setIsPreloaderDone } = usePreloader();
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isPreloaderDone) {
      document.body.style.overflow = "";
    }
  }, [isPreloaderDone]);

  useEffect(() => {
    if (isPreloaderDone) return;

    if (!isHomePage) {
      // Defer state update to avoid React 18 component render cycle clash
      setTimeout(() => {
        setIsPreloaderDone(true);
      }, 0);
      return;
    }

    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    let hasLoaded = document.readyState === "complete";
    if (!hasLoaded) {
      window.addEventListener("load", () => {
        hasLoaded = true;
      });
    }

    let currentProgress = 0;
    const duration = 2500; // Premium minimum loading time
    const startTime = Date.now();
    const hardStopTimer = setTimeout(() => {
      setIsPreloaderDone(true);
      document.body.style.overflow = "";
    }, 4500);

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      
      // Calculate target progress taking both time and actual load into account
      let targetProgress = (elapsed / duration) * 100;
      
      // Keep pushing forward even if load event missed, just slowly
      if (!hasLoaded && targetProgress > 95) {
        targetProgress = 95 + (elapsed % 1000) * 0.005; // Tiny fluctuations to seem active
        
        // Force completion after maximum 8 seconds
        if (elapsed > 8000) {
          hasLoaded = true;
        }
      }
      
      // Once duration passes and loaded, push to 100
      if (hasLoaded && elapsed > duration) {
        targetProgress = 100;
      }

      // Smooth easing towards target
      currentProgress += (targetProgress - currentProgress) * 0.12;

      // Ensure it finishes if stuck near the end
      if (currentProgress >= 98 && hasLoaded) {
        currentProgress = 100;
      }

      // Handle completion
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        
        // Wait at 100% for a brief moment before fading out
        setTimeout(() => {
          setIsPreloaderDone(true);
          document.body.style.overflow = "";
        }, 600);
        clearTimeout(hardStopTimer);
        return;
      }

      setProgress(Math.floor(currentProgress));
      requestAnimationFrame(updateProgress);
    };

    const animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardStopTimer);
      document.body.style.overflow = "";
    };
  }, [setIsPreloaderDone, isHomePage, isPreloaderDone]);

  return (
    <AnimatePresence>
      {!isPreloaderDone && isHomePage && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-dark flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden"
        >
          <div />

          {/* Bottom section with progress */}
          <div className="flex flex-col justify-end w-full gap-4 md:gap-8">
            {/* Minimal Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white origin-left"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            
            {/* Large Percentage Text */}
            <div className="flex justify-between items-end w-full">
              <div />
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  className="font-satoshi text-[22vw] md:text-[14vw] font-medium leading-[0.8] tracking-tighter text-white"
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
