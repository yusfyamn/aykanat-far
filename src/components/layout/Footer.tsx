"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "0px 0px -6% 0px",
    amount: 0.02,
  });

  return (
    <footer ref={footerRef} id="contact" className="text-white">
      <motion.div
        variants={premiumVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={premiumTransition(0.08, 0.86)}
        className="rounded-[20px] bg-surface px-5 py-10 sm:px-6 sm:py-11 md:rounded-[24px] md:px-10 md:py-14 lg:px-14 xl:px-16"
      >
        <div className="mx-auto w-full max-w-[1480px]">
        <div className="grid gap-8 border-b border-white/10 pb-8 sm:gap-9 sm:pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="hidden text-3xl font-bold tracking-tight sm:text-4xl md:block md:text-5xl lg:text-[3.5rem]">
              Hemen Başlayalım<span className="text-accent">.</span>
            </h2>
            <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/65 sm:mt-4 md:block md:text-lg">
              Farının güncel durumunu değerlendirip, aracına özel doğru restorasyon
              planını birlikte netleştirelim.
            </p>
            <h3 className="text-xl font-bold md:hidden">
              AYKANAT FAR<span className="text-accent">.</span>
            </h3>
            <p className="mt-2 max-w-[34ch] text-xs leading-relaxed text-white/62 md:hidden">
              Profesyonel far onarım ve yenileme hizmetleri.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 lg:ml-auto lg:w-full lg:max-w-[320px]">
            <h4 className="mb-3 text-left font-semibold">İletişim</h4>
            <ul className="space-y-2 text-left text-sm text-white/60">
              <li>
                <a href="tel:+905551234567" className="transition-colors hover:text-accent">
                  +90 555 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:info@restore.com" className="transition-colors hover:text-accent">
                  info@restore.com
                </a>
              </li>
              <li className="pt-1">Ataşehir, İstanbul</li>
            </ul>
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-8 border-b border-white/10 py-8 sm:py-10 md:grid lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h3 className="mb-4 text-xl font-bold">
              AYKANAT FAR<span className="text-accent">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Profesyonel far onarım ve yenileme hizmetleri.
            </p>
          </div>

          <div className="lg:text-right">
            <h4 className="mb-4 font-semibold">Hızlı Linkler</h4>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60 lg:justify-end">
              <li>
                <a href="/" className="transition-colors hover:text-accent">
                  Anasayfa
                </a>
              </li>
              <li>
                <a href="/hakkimizda" className="transition-colors hover:text-accent">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="/atolye" className="transition-colors hover:text-accent">
                  Far Onarım Atölyesi
                </a>
              </li>
              <li>
                <a href="/iletisim" className="transition-colors hover:text-accent">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 sm:pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] text-white/40 sm:text-xs">© 2026 AYKANAT FAR. Tüm hakları saklıdır.</p>
            <a
              href="https://yusufyaman.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/40 transition-colors hover:text-accent sm:text-xs"
            >
              by Yaman
            </a>
          </div>
          <div className="pt-2 text-center">
            <a href="/gizlilik-politikasi" className="text-[10px] text-white/35 transition-colors hover:text-accent sm:text-xs">
              Gizlilik Politikası
            </a>
            <span className="px-2 text-[10px] text-white/25 sm:text-xs">•</span>
            <a href="/kullanim-kosullari" className="text-[10px] text-white/35 transition-colors hover:text-accent sm:text-xs">
              Kullanım Koşulları
            </a>
          </div>
        </div>
        </div>
      </motion.div>
    </footer>
  );
}
