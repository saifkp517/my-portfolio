import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Activity from '../components/Activity.jsx'
import About from '../components/About.jsx'
import Stack from '../components/Stack.jsx'
import Experience from '../components/Experience.jsx'
import Projects from '../components/Projects.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import RailColumn from '../components/frame/RailColumn.jsx'
import FullBleedRule from '../components/frame/FullBleedRule.jsx'
import SectionDivider from '../components/frame/SectionDivider.jsx'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <>
      <Nav />
      <main className="pt-[53px]">
        <RailColumn>
          <Hero />
          <SectionDivider />
          <Activity />
          <FullBleedRule />
          <About />
          <FullBleedRule />
          <Stack />
          <SectionDivider />
          <Experience />
          <FullBleedRule />
          <Projects />
          <SectionDivider />
          <Contact />
          <FullBleedRule />
          <Footer />
        </RailColumn>
      </main>
    </>
  )
}
