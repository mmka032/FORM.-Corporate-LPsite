// トップページ（各セクションを並べているだけ）

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Service from "@/components/sections/Service";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";


export default function Home() {

  return (
    <>
    <Header/>
    <main>
      <Hero />
      <About />
      <Service />
      <Contact />
    </main>
    <Footer />
    </>
    );
}
