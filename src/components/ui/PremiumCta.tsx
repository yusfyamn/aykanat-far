import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const premiumCtaBaseClass =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#60A5FA]/60 bg-[#2563EB] px-6 py-3 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99]";

const premiumCtaIconClass =
  "absolute bottom-1 right-1 top-1 z-10 grid w-1/4 place-items-center rounded-md bg-[#60A5FA]/35 text-white transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95";

const premiumCtaLabelClass =
  "mr-10 transition-opacity duration-500 group-hover:opacity-0";

type SharedPremiumCTAProps = {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  fullWidth?: boolean;
};

function PremiumCTAInner({
  children,
  iconClassName,
  labelClassName,
}: Pick<SharedPremiumCTAProps, "children" | "iconClassName" | "labelClassName">) {
  return (
    <>
      <span className={cn(premiumCtaLabelClass, labelClassName)}>{children}</span>
      <i className={cn(premiumCtaIconClass, iconClassName)} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      </i>
    </>
  );
}

type PremiumLinkButtonProps = SharedPremiumCTAProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

export function PremiumLinkButton({
  href,
  children,
  className,
  iconClassName,
  labelClassName,
  fullWidth = true,
  ...props
}: PremiumLinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(premiumCtaBaseClass, fullWidth ? "w-full sm:w-auto" : "w-auto", className)}
      {...props}
    >
      <PremiumCTAInner
        iconClassName={iconClassName}
        labelClassName={labelClassName}
      >
        {children}
      </PremiumCTAInner>
    </Link>
  );
}

type PremiumAnchorButtonProps = SharedPremiumCTAProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">;

export function PremiumAnchorButton({
  children,
  className,
  iconClassName,
  labelClassName,
  fullWidth = true,
  ...props
}: PremiumAnchorButtonProps) {
  return (
    <a
      className={cn(premiumCtaBaseClass, fullWidth ? "w-full sm:w-auto" : "w-auto", className)}
      {...props}
    >
      <PremiumCTAInner
        iconClassName={iconClassName}
        labelClassName={labelClassName}
      >
        {children}
      </PremiumCTAInner>
    </a>
  );
}

type PremiumButtonProps = SharedPremiumCTAProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function PremiumButton({
  children,
  type = "button",
  className,
  iconClassName,
  labelClassName,
  fullWidth = true,
  ...props
}: PremiumButtonProps) {
  return (
    <button
      type={type}
      className={cn(premiumCtaBaseClass, fullWidth ? "w-full sm:w-auto" : "w-auto", className)}
      {...props}
    >
      <PremiumCTAInner
        iconClassName={iconClassName}
        labelClassName={labelClassName}
      >
        {children}
      </PremiumCTAInner>
    </button>
  );
}
