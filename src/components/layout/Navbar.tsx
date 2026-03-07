"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PREMIUM_SOFT_EASE, premiumReveal, premiumTransition } from "@/lib/premiumMotion";
import { PremiumLinkButton } from "@/components/ui/PremiumCta";

const menuLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Far Onarım Atölyesi", href: "/atolye" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const navShape = "mt-6 rounded-2xl max-[430px]:mt-4 max-[430px]:rounded-xl max-[393px]:mt-3 max-[375px]:mt-2";

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
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[6px]"
          />
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 max-[430px]:px-3 max-[393px]:px-2.5 sm:px-5 md:px-8"
        initial={premiumReveal.initial}
        animate={premiumReveal.animate}
        transition={premiumTransition(0, 0.9)}
      >
      <nav
        ref={containerRef}
        className={`relative w-full overflow-hidden ${navShape}`}
        style={{
          maxWidth: "1280px",
          backgroundColor: shouldShowSurface ? "hsla(0, 0%, 8%, 0.94)" : "transparent",
          backdropFilter: shouldShowSurface ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: shouldShowSurface ? "blur(16px) saturate(180%)" : "none",
          border: shouldShowSurface ? `1px solid ${surfaceBorder}` : "none",
          paddingLeft: "clamp(14px, 3.2vw, 32px)",
          paddingRight: "clamp(14px, 3.2vw, 32px)",
        }}
      >
        <div className="relative flex items-center justify-between py-2.5 sm:py-3 md:py-4">
          
          {/* Hamburger Menu (Mobile: Right, Desktop: Left) */}
          <motion.button
            className="group relative inline-flex h-8 w-8 items-center justify-center order-2 md:order-1 md:left-0"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMenuOpen}
            type="button"
            initial={false}
            animate={premiumReveal.animate}
            transition={premiumTransition(0.04, 0.78)}
          >
            <span
              className={`absolute left-1/2 top-[9px] block h-[2px] w-6 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-[15px] block h-[2px] w-6 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-[21px] block h-[2px] w-6 -translate-x-1/2 rounded-full transition-all duration-500 ${burgerLine} ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </motion.button>

          {/* Logo (Mobile: Left, Desktop: Center Absolute) */}
          <motion.a 
            href="/" 
            className="z-10 flex items-center justify-start font-satoshi text-sm font-bold tracking-tight order-1 md:pointer-events-none md:absolute md:inset-0 md:justify-center sm:text-base md:text-lg"
            initial={false}
            animate={premiumReveal.animate}
            transition={premiumTransition(0.02, 0.74)}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent transition-all duration-500">
              AYKANAT FAR
            </span>
            <span className="text-accent">.</span>
          </motion.a>

          {/* CTA Button (Hidden on Mobile, Desktop: Right) */}
          <motion.div
            className="hidden sm:block relative z-20 order-3"
            initial={false}
            animate={premiumReveal.animate}
            transition={premiumTransition(0.08, 0.8)}
          >
            <PremiumLinkButton
              href="/iletisim"
              fullWidth={false}
              className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-2.5"
              iconClassName="max-[430px]:w-[31%]"
            >
              <span>Bize Ulaşın</span>
            </PremiumLinkButton>
          </motion.div>
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
                exit={{ opacity: 0, filter: "blur(10px)", clipPath: "inset(0 100% 100% 0)", scale: 1.01 }}
                transition={premiumTransition(0.1, 1.12)}
                className="max-h-[calc(100dvh-88px)] overflow-y-auto px-4 pb-7 pt-4 max-[430px]:max-h-[calc(100dvh-78px)] max-[430px]:px-3 max-[430px]:pb-6 max-[430px]:pt-3.5 max-[393px]:px-2.5 sm:px-5 md:max-h-[68vh] md:px-8 md:pb-10 md:pt-6"
              >
                <div className="space-y-1.5 md:space-y-2">
                  {menuLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={premiumReveal.initial}
                      animate={premiumReveal.animate}
                      transition={premiumTransition(0.22 + index * 0.1, 1.02)}
                      className={`group relative block rounded-2xl px-3 py-2.5 pl-11 transition-colors max-[430px]:rounded-xl max-[430px]:px-2.5 max-[430px]:py-2 max-[430px]:pl-10 max-[393px]:pl-9 sm:pl-12 md:px-4 md:py-3 md:pl-14 ${baseText} ${baseTextHover}`}
                    >
                      <span
                        className={`absolute left-2.5 top-2 text-[10px] font-medium uppercase tracking-[0.16em] sm:left-3 sm:text-[11px] md:left-4 md:top-2.5 md:tracking-[0.18em] ${menuIndexText}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-2xl font-semibold tracking-tight max-[430px]:text-[1.35rem] max-[393px]:text-[1.22rem] max-[375px]:text-[1.12rem] sm:text-3xl md:text-5xl lg:text-6xl">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
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
