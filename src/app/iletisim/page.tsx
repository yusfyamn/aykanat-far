import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import ContactInfo from "@/components/sections/contact/ContactInfo";

export default function Contact() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <div className="bg-dark">
          <ContactInfo />
        </div>
      </main>
    </SmoothScroll>
  );
}
