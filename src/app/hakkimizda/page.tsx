import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStatement from "@/components/sections/about/AboutStatement";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutExpertise from "@/components/sections/about/AboutExpertise";
import AboutCTA from "@/components/sections/about/AboutCTA";

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
        <div className="mt-12 max-md:-mt-px px-2 pb-2 sm:mt-14 md:mt-16 md:px-4 md:pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
