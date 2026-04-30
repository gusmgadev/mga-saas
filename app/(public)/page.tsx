import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ServicesBanner } from "@/components/landing/services-banner";
import { Services } from "@/components/landing/services";
import { WhyUs } from "@/components/landing/why-us";
import { ZooLogic } from "@/components/landing/zoologic";
import { Process } from "@/components/landing/process";
import { Testimonials } from "@/components/landing/testimonials";
import { ContactForm } from "@/components/landing/contact-form";
import { Footer } from "@/components/landing/footer";
import { CurvedDivider } from "@/components/landing/curved-divider";

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