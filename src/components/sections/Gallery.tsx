"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion";

const galleryItems = [
  {
    before: "/once-audi.webp",
    after: "/sonra-audi.webp",
    title: "Audi",
    description: "Far onarım uygulaması"
  },
  {
    before: "/once-mercedes.webp",
    after: "/sonra-mercedes.webp",
    title: "Mercedes",
    description: "Far restorasyon uygulaması"
  },
  {
    before: "/once-golf.webp",
    after: "/sonra-golf.webp",
    title: "Volkswagen Golf",
    description: "Far yenileme uygulaması"
  },
  {
    before: "/once-bmw.webp",
    after: "/sonra-bmw.webp",
    title: "BMW",
    description: "Far onarım uygulaması"
  }
];

export default function Gallery({
  plain = false,
  compact = false,
}: {
  plain?: boolean;
  compact?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasShownDemo, setHasShownDemo] = useState(false);
  const demoTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const sliderAreaRef = useRef<HTMLDivElement>(null);

  const activeItem = galleryItems[activeIndex];

  useEffect(() => {
    if (hasInteracted || hasShownDemo) return;

    demoTimeoutsRef.current = [
      setTimeout(() => setSliderPosition(64), 500),
      setTimeout(() => setSliderPosition(36), 1200),
      setTimeout(() => setSliderPosition(50), 1900),
      setTimeout(() => setHasShownDemo(true), 2200),
    ];

    return () => {
      demoTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      demoTimeoutsRef.current = [];
    };
  }, [hasInteracted, hasShownDemo]);

  const handleUserInteraction = () => {
    setHasInteracted(true);
    demoTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    demoTimeoutsRef.current = [];
  };

  const updateSliderFromClientX = (clientX: number) => {
    if (!sliderAreaRef.current) return;
    const rect = sliderAreaRef.current.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(100, Math.max(0, ratio));
    setSliderPosition(clamped);
  };

  return (
    <section id="gallery" ref={ref} className={`${plain ? "bg-white" : "bg-dark"} py-20 sm:py-24 md:py-32`}>
      <div className={`mx-auto w-full px-4 sm:px-5 md:px-8 ${compact ? "max-w-[1480px]" : "max-w-[1600px]"}`}>
        <motion.div
          variants={premiumVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={premiumTransition(0.05, 0.86)}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <h2 className={`mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl ${plain ? "text-[#111111]" : "text-white"}`}>
            Öncesi / Sonrası Çalışmalarımız
          </h2>
          <p className={`mx-auto max-w-2xl text-base sm:text-lg md:text-xl ${plain ? "text-black/60" : "text-white/60"}`}>
            Kaydırarak önce ve sonrayı karşılaştırın
          </p>
        </motion.div>

        <motion.div
          variants={premiumStagger(0.12, 0.12)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center gap-4 sm:gap-5 lg:flex-row lg:gap-4"
        >
          {/* iPad Mockup */}
          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.12, 0.9)}
            className="relative flex-1 w-full"
          >
            {/* iPad Frame */}
            <div className="relative rounded-2xl border border-[#60A5FA]/45 bg-[#0f1626] p-2 sm:p-3">
              {/* Screen */}
              <div
                ref={sliderAreaRef}
                className="relative overflow-hidden rounded-xl bg-black aspect-[1.22/1] sm:aspect-[16/9]"
              >
                {/* Content */}
                <div className="relative w-full h-full select-none">
                  {/* After image (background) */}
                  <img
                    src={activeItem.after}
                    alt={`${activeItem.title} - Sonra`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Before image (clipped) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={activeItem.before}
                      alt={`${activeItem.title} - Önce`}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Slider line */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div
                      role="slider"
                      aria-label="Önce/Sonra karşılaştırma"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(sliderPosition)}
                      tabIndex={0}
                      className="absolute left-1/2 top-1/2 z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-white sm:h-10 sm:w-10"
                      onPointerDown={(e) => {
                        handleUserInteraction();
                        setIsDragging(true);
                        e.currentTarget.setPointerCapture(e.pointerId);
                        updateSliderFromClientX(e.clientX);
                      }}
                      onPointerMove={(e) => {
                        if (!isDragging) return;
                        updateSliderFromClientX(e.clientX);
                      }}
                      onPointerUp={(e) => {
                        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                          e.currentTarget.releasePointerCapture(e.pointerId);
                        }
                        setIsDragging(false);
                      }}
                      onPointerCancel={(e) => {
                        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                          e.currentTarget.releasePointerCapture(e.pointerId);
                        }
                        setIsDragging(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") {
                          handleUserInteraction();
                          setSliderPosition((prev) => Math.max(0, prev - 3));
                        } else if (e.key === "ArrowRight") {
                          handleUserInteraction();
                          setSliderPosition((prev) => Math.min(100, prev + 3));
                        }
                      }}
                    >
                      <svg className="h-4 w-4 text-dark sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3m4-4l-4 4m0 0l4 4" />
                      </svg>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                    Önce
                  </div>
                  <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:right-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                    Sonra
                  </div>

                </div>

                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                  <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{activeItem.title}</h3>
                  <p className="text-sm text-white/75">{activeItem.description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.2, 0.78)}
            className="w-full overflow-x-auto pb-1 lg:ml-1 lg:w-auto lg:overflow-visible lg:pb-0"
          >
            <div className="flex w-max gap-2.5 px-1 lg:w-auto lg:flex-col lg:gap-3 lg:px-0">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleUserInteraction();
                    setActiveIndex(index);
                    setSliderPosition(50);
                  }}
                  className={`relative h-[74px] w-[74px] flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:h-20 sm:w-20 md:h-24 md:w-24 ${
                    activeIndex === index
                      ? "border-accent shadow-[0_0_0_1px_rgba(37,99,235,0.4)]"
                      : plain
                        ? "border-black/15 opacity-70 hover:border-black/35 hover:opacity-100"
                        : "border-white/15 opacity-55 hover:border-white/35 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.after}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-1.5 pt-3 sm:px-2.5 sm:pb-2 sm:pt-4">
                    <span className="block truncate text-[9px] font-medium leading-tight text-white/90 sm:text-[10px]">
                      {item.title}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="absolute inset-0 bg-accent/20" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
