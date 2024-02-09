import Hero from "./components/Hero";
import Services from "./components/Services";
import PropertiesSection from "./components/PropertiesSection";
import AgentsSection from "./components/AgentsSection";

export default function Home() {
  return (
    <>
      <Hero />

      <main id="main">
        <Services />
        <PropertiesSection />
        <AgentsSection />
      </main>
    </>
  );
}
