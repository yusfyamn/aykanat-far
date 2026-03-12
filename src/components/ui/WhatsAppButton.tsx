"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/905065166156?text=Merhaba%2C%20far%20restorasyonu%20icin%20bilgi%20almak%20istiyorum.";

export default function WhatsAppButton() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | null = null;
    let mutation: MutationObserver | null = null;

    const attachObserver = (element: HTMLElement) => {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.12 }
      );
      observer.observe(element);
    };

    const footer = document.getElementById("contact");
    if (footer) {
      attachObserver(footer);
    } else {
      mutation = new MutationObserver(() => {
        const nextFooter = document.getElementById("contact");
        if (nextFooter) {
          attachObserver(nextFooter);
          mutation?.disconnect();
        }
      });
      mutation.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      mutation?.disconnect();
    };
  }, []);

  return (
    <motion.div
      className="fixed right-6 z-[60] sm:right-8"
      initial={false}
      animate={
        isFooterVisible
          ? { opacity: 0, y: 18, scale: 0.92 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={isFooterVisible}
      style={{
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 0.5rem))",
        pointerEvents: isFooterVisible ? "none" : "auto",
      }}
    >
      <div className="relative h-[68px] w-[68px]">
        <span
          aria-hidden="true"
          className="absolute inset-[5px] rounded-full bg-[#25D366]/35 animate-ping"
          style={{ animationDuration: "2.6s" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-[5px] rounded-full bg-[#25D366]/20 animate-ping"
          style={{ animationDelay: "1.1s", animationDuration: "2.6s" }}
        />

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletisime gec"
          className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/35 bg-[#25D366] text-white shadow-[0_16px_34px_rgba(37,211,102,0.42)]"
          initial={{ opacity: 0, y: 10, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: [0, -2, 0] }}
          transition={{
            opacity: { duration: 0.35, delay: 0.1 },
            scale: { duration: 0.35, delay: 0.1 },
            y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 8.062.006C3.582.006-.077 3.665-.077 8.145c0 1.43.373 2.824 1.082 4.054L0 16l3.92-1.03a8.093 8.093 0 0 0 4.142 1.113h.003c4.48 0 8.14-3.66 8.14-8.14a8.1 8.1 0 0 0-2.604-5.617Zm-5.54 12.44h-.003a6.74 6.74 0 0 1-3.438-.947l-.247-.148-2.324.61.62-2.267-.161-.256a6.7 6.7 0 0 1-1.026-3.595c0-3.714 3.022-6.736 6.741-6.736a6.7 6.7 0 0 1 4.781 1.977 6.7 6.7 0 0 1 1.98 4.785c-.002 3.714-3.025 6.737-6.943 6.737Z" />
            <path d="M11.89 9.33c-.214-.107-1.267-.624-1.463-.695-.197-.072-.34-.107-.483.107-.143.214-.554.694-.68.837-.125.143-.25.16-.464.053-.214-.106-.903-.333-1.72-1.062-.636-.567-1.066-1.268-1.191-1.482-.125-.214-.013-.33.094-.437.097-.097.214-.25.321-.375.107-.125.143-.214.214-.357.071-.143.036-.268-.018-.375-.054-.107-.483-1.166-.662-1.598-.174-.419-.35-.362-.483-.368-.125-.006-.268-.007-.411-.007-.143 0-.375.054-.572.268-.197.214-.751.733-.751 1.786 0 1.053.768 2.07.875 2.214.107.143 1.515 2.313 3.67 3.243.513.221.913.353 1.225.452.514.163.982.14 1.352.085.412-.061 1.267-.517 1.446-1.017.179-.5.179-.929.125-1.018-.053-.089-.196-.143-.41-.25Z" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}
