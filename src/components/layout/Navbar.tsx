"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PREMIUM_SOFT_EASE, premiumReveal, premiumTransition } from "@/lib/premiumMotion";
import { PremiumAnchorButton } from "@/components/ui/PremiumCta";

const menuLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Far Onarım Atölyesi", href: "/atolye" },
  { label: "İletişim", href: "/iletisim" },
];

const MotionLink = motion(Link);

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const isScrolled = true;
  const shouldShowSurface = isScrolled || isMenuOpen;
  const surfaceBorder = "rgba(255,255,255,0.08)";
  const baseText = "text-white/70";
  const baseTextHover = "hover:text-white";
  const burgerLine = "bg-white/70 group-hover:bg-white";
  const menuIndexText = "text-white/35";
  const navShape = "mt-4 rounded-2xl md:mt-5 max-[430px]:mt-5 max-[430px]:rounded-xl max-[393px]:mt-4 max-[375px]:mt-3.5";
  const navMaxWidth = isMobile
    ? "max-w-[92vw]"
    : "max-w-[860px] lg:max-w-[920px] xl:max-w-[980px] 2xl:max-w-[1160px]";

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.button
            key="menu-backdrop"
            type="button"
            aria-label="Menüyü kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/55 max-md:bg-black/75 md:backdrop-blur-[6px]"
          />
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-[clamp(10px,2.1vw,32px)] max-[430px]:px-4 max-[393px]:px-3.5"
        initial={premiumReveal.initial}
        animate={premiumReveal.animate}
        transition={premiumTransition(0, 0.9)}
      >
      <nav
        ref={containerRef}
        className={`relative w-full overflow-hidden ${navShape} ${navMaxWidth} max-[430px]:max-w-[92vw] max-[393px]:max-w-[90vw]`}
        style={{
          backgroundColor: shouldShowSurface ? "hsla(0, 0%, 8%, 0.94)" : "transparent",
          backdropFilter: shouldShowSurface && !isMobile ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: shouldShowSurface && !isMobile ? "blur(16px) saturate(180%)" : "none",
          border: shouldShowSurface ? `1px solid ${surfaceBorder}` : "none",
          paddingLeft: "clamp(14px, 2.4vw, 30px)",
          paddingRight: "clamp(14px, 2.4vw, 30px)",
        }}
      >
        <div className="relative flex items-center justify-between py-2.5 sm:py-3 md:py-3 lg:py-3.5">
          
          {/* Hamburger Menu (Mobile: Right, Desktop: Left) */}
          <motion.button
            className="group relative inline-flex h-7 w-7 items-center justify-center order-2 md:order-1 md:left-0"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMenuOpen}
            type="button"
            initial={false}
            animate={premiumReveal.animate}
            transition={premiumTransition(0.04, 0.78)}
          >
            <span
              className={`absolute left-1/2 top-[7px] block h-[2px] w-5 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-[13px] block h-[2px] w-5 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-[19px] block h-[2px] w-5 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </motion.button>

          {/* Logo (Mobile: Left, Desktop: Center Absolute) */}
          <MotionLink 
            href="/" 
            className={`z-10 flex items-center justify-start font-satoshi text-sm font-bold tracking-tight order-1 md:pointer-events-none md:absolute md:inset-0 md:justify-center ${
              isMobile ? "" : "sm:text-base md:text-[1.02rem] lg:text-lg"
            }`}
            initial={false}
            animate={premiumReveal.animate}
            transition={premiumTransition(0.02, 0.74)}
          >
            <Image
              src="/logo.png"
              alt="AYKANAT FAR"
              width={160}
              height={32}
              priority
              className="h-9 w-auto sm:h-8 md:h-7 lg:h-8 xl:h-9"
            />
          </MotionLink>

          {/* CTA Button (Hidden on Mobile, Desktop: Right) */}
          {!isMobile && (
            <motion.div
              className="hidden sm:block relative z-20 order-3"
              initial={false}
              animate={premiumReveal.animate}
              transition={premiumTransition(0.08, 0.8)}
            >
              <PremiumAnchorButton
                href="https://wa.me/905065166156"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth={false}
                className="px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm md:px-6 md:py-2"
                iconClassName="max-[430px]:w-[31%]"
              >
                <span>Bize Ulaşın</span>
              </PremiumAnchorButton>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="navbar-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.94, ease: PREMIUM_SOFT_EASE },
                opacity: { duration: 0.62, ease: PREMIUM_SOFT_EASE },
              }}
              className="overflow-hidden border-t"
              style={{ borderColor: surfaceBorder }}
            >
              <motion.div
                initial={premiumReveal.initial}
                animate={premiumReveal.animate}
                exit={isMobile ? { opacity: 0, clipPath: "inset(0 100% 100% 0)", scale: 1.01 } : { opacity: 0, filter: "blur(10px)", clipPath: "inset(0 100% 100% 0)", scale: 1.01 }}
                transition={premiumTransition(0.1, 1.12)}
              className="max-h-[calc(100dvh-88px)] overflow-y-auto px-4 pb-5 pt-3.5 max-[430px]:max-h-[calc(100dvh-78px)] max-[430px]:px-3 max-[430px]:pb-4.5 max-[430px]:pt-3 max-[393px]:px-2.5 sm:px-5 md:max-h-[68vh] md:px-6 md:pb-7 md:pt-4 lg:px-8 lg:pb-8 lg:pt-5"
              >
                <div className="space-y-1.5 md:space-y-2">
                  {menuLinks.map((link, index) => (
                    <MotionLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={premiumReveal.initial}
                      animate={premiumReveal.animate}
                      transition={premiumTransition(0.22 + index * 0.1, 1.02)}
                      className={`group relative block rounded-2xl px-3 py-1.5 pl-11 transition-colors max-[430px]:rounded-xl max-[430px]:px-2.5 max-[430px]:py-1.5 max-[430px]:pl-10 max-[393px]:pl-9 sm:pl-12 md:px-4 md:py-2.5 md:pl-14 ${baseText} ${baseTextHover}`}
                    >
                      <span
                        className={`absolute left-2.5 top-2 text-[11px] font-medium uppercase tracking-[0.16em] sm:left-3 sm:text-[11px] md:left-4 md:top-2.5 md:tracking-[0.18em] ${menuIndexText}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-2xl font-semibold tracking-tight max-[430px]:text-[1.6rem] max-[393px]:text-[1.45rem] max-[375px]:text-[1.35rem] sm:text-[1.9rem] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                        {link.label}
                      </span>
                    </MotionLink>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 md:hidden">
                  <PremiumAnchorButton
                    href="https://www.google.com/maps/dir/?api=1&destination=%C4%B0%C3%A7erenk%C3%B6y%2C%20Huzur%20Hoca%20Cd%2054B%2C%2034638%20Ata%C5%9Fehir%2F%C4%B0stanbul"
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    className="border border-white/20 bg-white/10 text-white/85 hover:bg-white/15 px-3 py-2 text-[0.82rem]"
                    iconClassName="bg-white/15 text-white/80"
                  >
                    Yol Tarifi
                  </PremiumAnchorButton>
                  <PremiumAnchorButton
                    href="https://wa.me/905065166156"
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    className="px-3 py-2 text-[0.82rem]"
                  >
                    Bize Ulaşın
                  </PremiumAnchorButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </motion.header>
    </>
  );
}
