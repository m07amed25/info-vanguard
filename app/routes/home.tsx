import type { Route } from "./+types/home";
import {
  Header,
  Hero,
  About,
  Stats,
  Features,
  Pricing,
  Testimonials,
  Blog,
  FAQ,
  Contact,
  Footer,
  WhyUs,
} from "../components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vanguard — AI-Powered Antivirus" },
    {
      name: "description",
      content:
        "Next-gen antivirus built with AI — real-time threat detection, zero-day protection, and peace of mind for your devices.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <WhyUs />
        <Stats />
        <Features />
        {/* <Pricing /> */}
        <Testimonials />
        {/* <Blog /> */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
