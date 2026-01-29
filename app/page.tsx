import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MiniDemo from "@/components/MiniDemo";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <MiniDemo />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
