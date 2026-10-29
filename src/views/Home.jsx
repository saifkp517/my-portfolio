'use client'

import { useEffect } from 'react'
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
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) el.scrollIntoView({ block: 'start' })
  }, [])

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
