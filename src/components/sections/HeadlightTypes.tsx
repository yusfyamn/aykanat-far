"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumReveal,
  premiumTransition
} from "@/lib/premiumMotion";

const headlightTypes = [
  {
    type: "Halogen",
    description: "Geleneksel far teknolojisi, en yaygın kullanılan tip",
    features: ["Uygun maliyet", "Kolay bakım", "Sarımsı ışık"],
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    type: "Xenon (HID)",
    description: "Yüksek yoğunluklu deşarj lambaları, güçlü aydınlatma",
    features: ["Parlak beyaz ışık", "Uzun ömür", "Düşük enerji"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    type: "LED",
    description: "Modern teknoloji, enerji verimliliği ve uzun ömür",
    features: ["Anında açılma", "Çok uzun ömür", "Minimum ısı"],
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export default function HeadlightTypes() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT
  });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={premiumReveal.initial}
          animate={isInView ? premiumReveal.animate : premiumReveal.initial}
          transition={premiumTransition(0.05, 0.86)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
            Tüm Far Tiplerine Hizmet
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Halogen, Xenon veya LED - her far teknolojisinde uzmanız
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {headlightTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={premiumReveal.initial}
              animate={isInView ? premiumReveal.animate : premiumReveal.initial}
              transition={premiumTransition(index * 0.12, 0.84)}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${item.color} border border-white/5 hover:border-accent/30 transition-all duration-500 group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{item.type}</h3>
                <p className="text-white/70 mb-6">{item.description}</p>
                
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
