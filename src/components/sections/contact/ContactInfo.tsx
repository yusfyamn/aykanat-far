"use client"

import type { COBEOptions } from "cobe"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const DarkContactMap = dynamic(() => import("@/components/ui/DarkContactMap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 h-full w-full bg-dark" />,
})

const Globe = dynamic(() => import("@/components/ui/Globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[520px] rounded-full bg-white/5" />,
})

const BLUE_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.18,
  diffuse: 0.9,
  mapSamples: 16000,
  mapBrightness: 1.16,
  baseColor: [0.48, 0.52, 0.6],
  markerColor: [96 / 255, 142 / 255, 224 / 255],
  glowColor: [0.3, 0.39, 0.57],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export default function ContactInfo() {
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false)

  useEffect(() => {
    const idleCallback = "requestIdleCallback" in window ? (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback : null
    const cancelIdle = "cancelIdleCallback" in window ? (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback : null
    let idleId: number | null = null
    let timeoutId: number | null = null

    if (idleCallback) {
      idleId = idleCallback(() => setShouldLoadMedia(true), { timeout: 1200 })
    } else {
      timeoutId = window.setTimeout(() => setShouldLoadMedia(true), 400)
    }

    return () => {
      if (idleId !== null && cancelIdle) cancelIdle(idleId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section className="relative isolate min-h-[100svh] overflow-y-auto bg-dark text-white md:h-[100dvh] md:overflow-hidden">
      <div className="relative h-[56svh] md:absolute md:inset-0 md:h-full">
        {shouldLoadMedia ? (
          <DarkContactMap className="absolute inset-0 z-0 h-full w-full" />
        ) : (
          <div className="absolute inset-0 z-0 h-full w-full bg-dark" />
        )}
        <div className="absolute inset-0 z-[1] bg-black/[0.04]" />
        <div className="absolute inset-x-0 top-0 z-[1] h-[34%] bg-gradient-to-b from-black/64 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[34%] bg-gradient-to-t from-black/68 via-black/32 to-transparent" />
      </div>

      <div className="relative z-40 mx-auto w-full max-w-[1600px] px-3 pb-8 pt-4 sm:px-6 md:flex md:h-full md:items-center md:px-8 lg:px-12 xl:px-14">
        <div className="w-full max-w-[980px] rounded-[20px] border border-white/[0.12] bg-white/[0.02] px-3 pb-0 pt-2 shadow-[0_20px_58px_rgba(0,0,0,0.28)] md:backdrop-blur-[10px] sm:px-5 sm:pt-3 md:rounded-[24px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.02fr_1fr] md:items-end md:gap-5">
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[320px] md:h-[360px]">
              <div className="absolute inset-x-0 -bottom-14 h-[272px] overflow-hidden sm:-bottom-8 md:bottom-0">
                {shouldLoadMedia ? (
                  <Globe config={BLUE_GLOBE_CONFIG} className="inset-0 w-full max-w-[520px] opacity-100" />
                ) : (
                  <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[520px] rounded-full bg-white/5" />
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-6 z-10 text-center sm:top-7">
                <h2 className="font-satoshi pb-2 text-[clamp(2.1rem,8.8vw,2.7rem)] font-black leading-[1.16] tracking-[0.01em] text-white sm:text-6xl">
                  Bize Ulaşın
                </h2>
              </div>
            </div>

            <div className="mb-4 max-w-[470px] p-1 sm:p-2">
              <div className="mb-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[0.85rem] text-white/70 sm:mb-5 sm:px-3.5 sm:text-[15px]">
                <span>Çalışma Saatleri</span>
                <span className="font-medium text-white/86">Pzt - Cmt 09.00 - 18.00</span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-base text-white/72 sm:text-lg lg:text-xl">
                <p className="font-medium leading-none">+90 0506 516 6156</p>
              </div>

              <p className="mt-4 max-w-[460px] text-[clamp(1.05rem,4.8vw,1.45rem)] leading-[1.14] text-white/78 sm:mt-5 sm:text-[1.45rem] lg:text-[2.1rem]">
                İçerenköy, Huzur Hoca Cd 54B, 34638 Ataşehir / İstanbul
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=%C4%B0%C3%A7erenk%C3%B6y%2C%20Huzur%20Hoca%20Cd%2054B%2C%2034638%20Ata%C5%9Fehir%2F%C4%B0stanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-4 text-base font-semibold tracking-[0.01em] text-white/92 transition-colors hover:bg-white/[0.08] sm:h-14 sm:px-5 sm:text-lg lg:text-xl"
                >
                  Yol Tarifi Alın
                </a>
                <a
                  href="https://wa.me/905065166156"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-4 text-base font-semibold tracking-[0.01em] text-white/92 transition-colors hover:bg-white/[0.08] sm:h-14 sm:px-5 sm:text-lg lg:text-xl"
                >
                  Bize Ulaşın
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 hidden px-4 sm:px-6 md:bottom-4 md:block md:px-8">
        <div className="pointer-events-auto mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-2 rounded-[14px] border border-white/[0.08] bg-white/[0.01] px-3.5 py-2.5 pr-14 text-white/62 md:backdrop-blur-[10px] sm:flex-row sm:items-center sm:px-4 sm:pr-16 md:pr-20">
          <p className="text-[12px] sm:text-xs">© 2026 Restore. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3 text-[12px] sm:gap-4 sm:text-xs">
            <a href="/gizlilik-politikasi" className="transition-colors hover:text-white">
              Gizlilik
            </a>
            <a href="/kullanim-kosullari" className="transition-colors hover:text-white">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
