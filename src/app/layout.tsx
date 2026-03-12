import type { Metadata } from "next";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "RESTORE THE LIGHT | Premium Headlight Restoration",
  description: "Master-level headlight restoration services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="bg-dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ("scrollRestoration" in history) history.scrollRestoration = "manual";
            const navEntry = performance.getEntriesByType("navigation")[0];
            if (navEntry && navEntry.type === "reload" && location.hash) {
              history.replaceState(null, "", location.pathname + location.search);
            }
          `
        }} />
      </head>
      <body className="antialiased bg-dark">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
