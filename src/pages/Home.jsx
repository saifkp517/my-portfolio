import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Zentra from '../components/Zentra.jsx'
import Erp from '../components/Erp.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

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
      <main>
        <Hero />
        <Zentra />
        <Erp />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
