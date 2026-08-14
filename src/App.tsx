import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Industries from './components/Industries'
import Products from './components/Products'
import Procurement from './components/Procurement'
import GlobalSourcing from './components/GlobalSourcing'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import ProjectSupport from './components/ProjectSupport'
import RFQ from './components/RFQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-copper-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Industries />
        <Products />
        <Procurement />
        <GlobalSourcing />
        <Services />
        <WhyUs />
        <ProjectSupport />
        <RFQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
