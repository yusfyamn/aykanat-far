import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WorkshopHero from "@/components/sections/workshop/WorkshopHero";
import WorkshopStatement from "@/components/sections/workshop/WorkshopStatement";
import WorkshopTextFlow from "@/components/sections/workshop/WorkshopTextFlow";
import WorkshopFuturePerspective from "@/components/sections/workshop/WorkshopFuturePerspective";
import Gallery from "@/components/sections/Gallery";
import AboutCTA from "@/components/sections/about/AboutCTA";

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
        <div className="mt-12 max-md:-mt-px px-2 pb-2 sm:mt-14 sm:px-4 md:mt-16 md:px-4 md:pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
