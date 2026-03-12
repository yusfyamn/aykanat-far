import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStatement from "@/components/sections/about/AboutStatement";

const AboutStory = dynamic(() => import("@/components/sections/about/AboutStory"), { ssr: false });
const AboutExpertise = dynamic(() => import("@/components/sections/about/AboutExpertise"), { ssr: false });
const AboutCTA = dynamic(() => import("@/components/sections/about/AboutCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function About() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutStatement />
      <AboutStory />
      <div className="bg-white pt-0 md:pt-2">
        <AboutExpertise />
        <AboutCTA />
        <div className="pt-4 px-2.5 pb-2 sm:pt-5 sm:px-6 md:pt-16 md:px-4 md:pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
