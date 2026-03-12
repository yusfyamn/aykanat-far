import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import WorkshopHero from "@/components/sections/workshop/WorkshopHero";
import WorkshopStatement from "@/components/sections/workshop/WorkshopStatement";

const WorkshopTextFlow = dynamic(() => import("@/components/sections/workshop/WorkshopTextFlow"), { ssr: false });
const WorkshopFuturePerspective = dynamic(() => import("@/components/sections/workshop/WorkshopFuturePerspective"), { ssr: false });
const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: false });
const AboutCTA = dynamic(() => import("@/components/sections/about/AboutCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Workshop() {
  return (
    <main>
      <Navbar />
      <WorkshopHero />
      <WorkshopStatement />
      <WorkshopTextFlow />
      <div className="max-md:-mt-px">
        <Gallery plain compact />
      </div>
      <WorkshopFuturePerspective />
      <div className="max-md:-mt-px">
        <AboutCTA />
      </div>
      <div className="bg-white pt-0 md:pt-2 max-md:-mt-px">
        <div className="pt-4 px-2.5 pb-2 sm:pt-5 sm:px-6 md:pt-16 md:px-4 md:pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
