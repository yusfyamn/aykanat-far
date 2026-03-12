import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HomeMobileStatement from "@/components/sections/HomeMobileStatement";
import BeforeAfter from "@/components/sections/BeforeAfter";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import AboutCTA from "@/components/sections/about/AboutCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <Hero />
        <HomeMobileStatement />
        <BeforeAfter />
        <ProcessTimeline />
        <div className="bg-white pt-0 md:pt-2">
          <div className="px-3 md:px-4">
            <div className="overflow-hidden rounded-[18px] md:rounded-[22px]">
              <Gallery />
              <Testimonials />
            </div>
          </div>
          <FAQ />
          <AboutCTA />
          <div className="pt-4 px-2.5 pb-2 sm:pt-5 sm:px-6 md:pt-16 md:px-4 md:pb-3">
            <Footer />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
