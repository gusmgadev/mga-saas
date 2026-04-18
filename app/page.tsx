import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ServicesBanner } from "@/components/services-banner";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { ZooLogic } from "@/components/zoologic";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { CurvedDivider } from "@/components/curved-divider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CurvedDivider />
        <section id="services" className="scroll-mt-20">
          <Services />
        </section>
        <CurvedDivider />
        <section id="zoologic" className="scroll-mt-20">
          <ZooLogic />
        </section>
        <CurvedDivider />
        <section id="process" className="scroll-mt-20">
          <Process />
        </section>
        <CurvedDivider />
        <WhyUs />
        <CurvedDivider />
        <Testimonials />
        <CurvedDivider />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}