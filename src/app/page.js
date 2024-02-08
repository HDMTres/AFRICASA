import Hero from "./components/Hero";
import Services from "./components/Services";
import PropertiesSection from "./components/PropertiesSection";

export default function Home() {
  return (
    <>
      <Hero />

      <main id="main">
        <Services />
        <PropertiesSection />
      </main>
    </>
  );
}
