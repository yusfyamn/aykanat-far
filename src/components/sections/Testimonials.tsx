"use client"

import { Card } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  premiumStagger,
  premiumTransition,
  premiumVariants
} from "@/lib/premiumMotion"

interface Testimonial {
  name: string
  text: string
  initial: string
}

const testimonials: Testimonial[] = [
  {
    name: "Ahmet Yılmaz",
    text: "İşçilik ve teslim süreci gerçekten profesyoneldi. Aracımı söz verdikleri saatte teslim ettiler.",
    initial: "AY"
  },
  {
    name: "Zeki Kaya",
    text: "Sigorta değişim yönlendirdi, burada önce onarım denendi ve başarılı oldu. Gereksiz değişimden kurtuldum.",
    initial: "ZK"
  },
  {
    name: "Mehmet Demir",
    text: "Profesyonel ekip, hızlı iletişim ve temiz işçilik. Süreç boyunca her adımı net anlattılar.",
    initial: "MD"
  },
  {
    name: "Alper Yıldız",
    text: "Randevu almak çok kolaydı, süreç de düşündüğümden hızlı ilerledi. Sonuçtan çok memnunum.",
    initial: "AY"
  },
  {
    name: "Can Öztürk",
    text: "Fiyat-performans açısından çok iyi bir hizmet aldım. Hem estetik hem sürüş tarafında fark etti.",
    initial: "CÖ"
  },
  {
    name: "Emre Arslan",
    text: "Atölye çok düzenli ve ekip çok ilgiliydi. Aracımı teslim aldığımda beklediğimden daha iyi görünüyordu.",
    initial: "EA"
  },
  {
    name: "Burak Şahin",
    text: "Yıllardır ihmal ettiğim farlar onarımla toparlandı. Aracın önü tamamen yenilenmiş gibi görünüyor.",
    initial: "BŞ"
  },
  {
    name: "Serkan Yurt",
    text: "Onarım mı değişim mi sorusunu teknik olarak açıkladılar. Doğru çözümle hem güvenlik hem görünüm düzeldi.",
    initial: "SY"
  }
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [firstName, lastName = ""] = testimonial.name.split(" ")
  const maskedName = lastName
    ? `${firstName} ${lastName.charAt(0)}***`
    : firstName

  return (
    <Card className="flex h-full w-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex-1">
        <p className="text-sm font-medium leading-relaxed text-white/70 sm:text-base">{testimonial.text}</p>
      </div>
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-medium text-accent sm:h-11 sm:w-11">
          {testimonial.initial}
        </div>
        <div className="flex items-center gap-2 pl-3">
          <span className="text-sm font-semibold text-white sm:text-base">{maskedName}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -6% 0px",
    amount: 0.02,
  })

  return (
    <section ref={sectionRef} id="testimonials" className="bg-dark py-20 text-white sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-5 md:px-8">
        <motion.div
          variants={premiumVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={premiumTransition(0.05, 0.84)}
          className="mb-10 flex flex-col items-center justify-center sm:mb-12 md:mb-16"
        >
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="max-w-2xl text-center text-base text-white/60 sm:text-lg md:text-xl">
            Binlerce memnun müşterimizden bazı yorumlar
          </p>
        </motion.div>

        <motion.div
          variants={premiumStagger(0.12, 0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={premiumVariants}
              transition={premiumTransition(index * 0.08, 0.68)}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
