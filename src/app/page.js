import Hero from "./components/Hero";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Hero />

      <main id="main">
        <Services />
      </main>
    </>
  );
}
