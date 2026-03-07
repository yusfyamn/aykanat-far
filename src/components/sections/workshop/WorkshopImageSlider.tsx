"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/far-atolyesi.jpeg",
  "/far-atolyesi1.jpeg",
  "/far-atolyesi2.jpeg",
  "/far-atolyesi3.jpeg",
];

export default function WorkshopImageSlider() {
  const [index, setIndex] = useState(0);
  const safeIndex = useMemo(() => ((index % images.length) + images.length) % images.length, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white pb-14 pt-2 sm:pb-16 md:pb-20">
      <div className="w-full px-3 md:px-4">
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="relative overflow-hidden rounded-[24px] bg-dark">
            <div className="relative aspect-[16/8] min-h-[280px] w-full sm:min-h-[360px] md:min-h-[460px] lg:min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[safeIndex]}
                  src={images[safeIndex]}
                  alt="Far atölyesi görseli"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
                  transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
            </div>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-md">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Görsel ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === safeIndex ? "w-7 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
