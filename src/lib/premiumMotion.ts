export const PREMIUM_EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const PREMIUM_SOFT_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const PREMIUM_VIEWPORT_MARGIN = "0px 0px -16% 0px";
export const PREMIUM_VIEWPORT_AMOUNT = 0.14;
export const PREMIUM_VIEWPORT_MARGIN_SOFT = "0px 0px -10% 0px";
export const PREMIUM_VIEWPORT_AMOUNT_SOFT = 0.08;

export const premiumReveal = {
  initial: {
    opacity: 0,
    filter: "blur(24px) saturate(138%) brightness(1.08) contrast(0.96)",
    clipPath: "inset(44% 34% 44% 34% round 20px)",
    scale: 0.972,
    rotateX: 6,
    transformPerspective: 1200,
    transformOrigin: "50% 50%",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px) saturate(100%) brightness(1) contrast(1)",
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    scale: 1,
    rotateX: 0,
    transformPerspective: 1200,
    transformOrigin: "50% 50%",
  },
};

export const premiumTransition = (delay = 0, duration = 1.32) => ({
  delay: delay + 0.12,
  opacity: {
    duration: duration * 0.64,
    ease: PREMIUM_SOFT_EASE,
  },
  filter: {
    duration: duration * 0.92,
    ease: PREMIUM_EASE,
  },
  clipPath: {
    duration: duration * 1.18,
    ease: PREMIUM_EASE,
  },
  scale: {
    duration: duration * 1.12,
    ease: PREMIUM_EASE,
  },
  rotateX: {
    duration: duration * 1.08,
    ease: PREMIUM_EASE,
  },
});

export const premiumStagger = (delayChildren = 0.14, staggerChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const premiumVariants = {
  hidden: premiumReveal.initial,
  visible: premiumReveal.animate,
};
