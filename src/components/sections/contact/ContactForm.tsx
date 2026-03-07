"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  PREMIUM_VIEWPORT_AMOUNT,
  PREMIUM_VIEWPORT_MARGIN,
  premiumStagger,
  premiumTransition,
  premiumVariants,
} from "@/lib/premiumMotion";
import { PremiumButton } from "@/components/ui/PremiumCta";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  carModel: string;
  serviceType: string;
  preferredTime: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  carModel: "",
  serviceType: "",
  preferredTime: "",
  message: "",
};

const processSteps = [
  {
    title: "Talep alinmasi",
    description: "Formu ilettiginizde teknik ekip on degerlendirme icin kayit olusturur.",
  },
  {
    title: "Hizli geri donus",
    description: "Maksimum 15 dakika icinde surec ve uygun randevu saati paylasilir.",
  },
  {
    title: "Atolye planlamasi",
    description: "Aracinizin durumuna gore onarim ya da degisim senaryosu netlestirilir.",
  },
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: PREMIUM_VIEWPORT_MARGIN,
    amount: PREMIUM_VIEWPORT_AMOUNT,
  });

  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact request submitted:", formData);
    setIsSubmitted(true);
    setFormData(initialForm);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isSubmitted) setIsSubmitted(false);
  };

  return (
    <section
      id="contact-form"
      ref={sectionRef}
      className="bg-white pb-14 pt-16 text-[#101010] max-[430px]:pb-12 max-[430px]:pt-13 max-[393px]:pb-11 max-[393px]:pt-12 sm:pb-16 sm:pt-20 md:pb-20 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 max-[430px]:px-3 max-[393px]:px-2.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          variants={premiumStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-9 max-[430px]:gap-7 max-[393px]:gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:gap-12"
        >
          <div>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.02, 0.82)}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/42 sm:text-xs"
            >
              Randevu Formu
            </motion.p>
            <motion.h2
              variants={premiumVariants}
              transition={premiumTransition(0.06, 0.82)}
              className="mt-3 max-w-[16ch] text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.03em] max-[430px]:text-[clamp(1.7rem,9.1vw,2.3rem)] max-[393px]:text-[clamp(1.56rem,8.9vw,2.08rem)] max-[375px]:text-[clamp(1.48rem,8.7vw,1.95rem)]"
            >
              Kisa form, hizli geri donus.
            </motion.h2>
            <motion.p
              variants={premiumVariants}
              transition={premiumTransition(0.12, 0.76)}
              className="mt-4 max-w-[54ch] text-sm leading-relaxed text-black/66 max-[430px]:text-[13px] max-[393px]:text-[12.5px] sm:text-base md:text-lg"
            >
              Aracinizla ilgili temel bilgileri paylasin, teknik ekip size en uygun
              islem plani ve zaman araligini hizla iletsin.
            </motion.p>

            <div className="mt-7 space-y-3 max-[430px]:mt-6 max-[430px]:space-y-2.5 sm:mt-8">
              {processSteps.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={premiumVariants}
                  transition={premiumTransition(0.16 + index * 0.06, 0.72)}
                  className="rounded-2xl border border-black/10 bg-[#f7f7f8] p-5 max-[430px]:rounded-xl max-[430px]:p-4 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 text-xs font-semibold text-black/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight max-[430px]:text-[15px] sm:text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-black/64 max-[430px]:text-[13px] sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            variants={premiumVariants}
            transition={premiumTransition(0.14, 0.82)}
            className="rounded-[22px] border border-black/12 bg-[#111214] p-5 text-white max-[430px]:rounded-[18px] max-[430px]:p-4 max-[393px]:p-3.5 sm:p-6 md:p-7"
          >
            <form onSubmit={handleSubmit} className="space-y-4 max-[430px]:space-y-3.5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/82">
                  Ad Soyad *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                  placeholder="Ornek: Ahmet Yilmaz"
                />
              </div>

              <div className="grid gap-4 max-[430px]:gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/82">
                    Telefon *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/82">
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 max-[430px]:gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="carModel" className="mb-1.5 block text-sm font-medium text-white/82">
                    Arac Modeli
                  </label>
                  <input
                    id="carModel"
                    name="carModel"
                    type="text"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                    placeholder="Marka / Model / Yil"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium text-white/82">
                    Talep Konusu
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                  >
                    <option value="" className="bg-[#111214] text-white/70">
                      Seciniz
                    </option>
                    <option value="onarim" className="bg-[#111214]">
                      Far onarimi
                    </option>
                    <option value="degisim" className="bg-[#111214]">
                      Far degisimi
                    </option>
                    <option value="kontrol" className="bg-[#111214]">
                      On degerlendirme
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium text-white/82">
                  Tercih Edilen Zaman
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                  placeholder="Ornek: Bugun 14:00-16:00 arasi"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/82">
                  Notunuz
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/38 outline-none transition-colors focus:border-accent max-[430px]:px-3.5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
                  placeholder="Far durumu, onceki islemler veya onceliginizi yazabilirsiniz."
                />
              </div>

              <PremiumButton
                type="submit"
                className="max-[430px]:px-5 max-[430px]:py-2.5 max-[430px]:text-[13px]"
              >
                Talebi Gonder
              </PremiumButton>

              {isSubmitted && (
                <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200 max-[430px]:text-[12.5px]">
                  Talebiniz alindi. Ekip en kisa surede sizinle iletisime gececek.
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
